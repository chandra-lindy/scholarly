from langchain.vectorstores import Chroma
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings

class Retriever:
  def __init__(self, document_path, settings):
    self.loader = PyPDFLoader(document_path)
    self.splitter = RecursiveCharacterTextSplitter(
      chunk_size=2000,
      chunk_overlap=100
    )
    self.docs = self.loader.load_and_split(text_splitter=self.splitter)
    self.db = Chroma.from_documents(
      documents=self.docs,
      embedding=OpenAIEmbeddings(openai_api_key=settings.OPENAI_API_KEY),
    )
    self.retriever = self.db.as_retriever(search_type="mmr", k=3)

  def search(self, query):
    return self.retriever.get_relevant_documents(query)

  def get_intro(self):
    document = self.db.get(where={})
    intro = document['documents'][0]
    return intro.replace('\n', ' ')

  def get_context(self, query):
    chunks = self.search(query)
    return '\n\n'.join(
      [chunk.page_content.replace('\n', ' ') for chunk in chunks]
    )

  def reset(self):
    self.db.delete_collection()
