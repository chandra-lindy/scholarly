from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.schema import StrOutputParser
from chatbot.retriever import Retriever
from chatbot.messages import Messages
from config import settings

class MessagesRetrievalChain:
  def __init__(self, document_path=""):
    self.initial_system_message = """
    Act as Professor Jordan. Your job is to support the user in accomplishing their learning goals by aligning with their goals and preferences, then assuming the role of an expert agent perfectly suited to the task by stating:

    "I am an expert in [role]. I know [context]. I will do my best to reason with and guide you step-by-step to determine the best course of action to achieve [goal].

    I will help you accomplish your [goal] by following these steps:
    [reasoned step]

    My task ends when [completion],

    [first step, question]."

    , only when confirmed.

    Follow these steps:
    1. Start each interaction by gathering context, relevant information and clarifying the user's goals by asking them questions
    2. Once user has confirmed, assume the role by making the above instructed statement as formatted above
    3. Support the user until the goal is accomplished

    Rules:
    - Always begin by introducing yourself as Professor Jordan
    - Subtly redirect user to guide them towards the first step in completing a task rather than doing it for them
    - End every output with a question only if clarification is needed
    - End every output with a recommended next step only if the path forward is clear
    - Always make the above mentioned formatted statement when assuming a new role"""
    self.context_intro = """
    [document context] The user is reviewing a document. The following is the beginning portion of the document as an overview:

    """
    self.context_template = """
    [document context] only if it is relevant to the current conversation should you consider from the following context, a partial excerpt, from the document:

    """
    self.messages = Messages(self.initial_system_message)
    self.model = ChatOpenAI(
      openai_api_key=settings.OPENAI_API_KEY,
      model_name=settings.OPENAI_MODEL_NAME,
      temperature=settings.OPENAI_TEMPERATURE
    )
    if document_path:
      self.retriever = Retriever(document_path, settings)
      self.messages.insert_context(
        self.context_intro + self.retriever.get_intro()
      )
    else:
      self.retriever = None

  def invoke(self, human_message):
    self.messages.append(("user", human_message))

    if self.retriever:
      document_context = self.retriever.get_context(human_message)
      self.messages.insert_context(self.context_template + document_context)

    prompt = ChatPromptTemplate.from_messages(self.messages.get_list())
    chat = prompt | self.model | StrOutputParser()
    ai_message = chat.invoke(self.messages.get_list())
    self.messages.append(("ai", ai_message))

    return ai_message

  def stream(self, human_message):
    self.messages.append(("user", human_message))

    if self.retriever:
      document_context = self.retriever.get_context(human_message)
      self.messages.insert_context(self.context_template + document_context)

    prompt = ChatPromptTemplate.from_messages(self.messages.get_list())
    chat = prompt | self.model | StrOutputParser()
    ai_message = ""
    for s in chat.stream(self.messages.get_list()):
      ai_message = ai_message + s
      yield s

    self.messages.append(("ai", ai_message))
