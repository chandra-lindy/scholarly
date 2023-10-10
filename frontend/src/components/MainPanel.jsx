const MainPanel = () => {
  const paragraphs = data.map((p) => (
    <p key={p.key} className="pb-4">
      {p.text}
    </p>
  ));

  return (
    <div className="w-4/5 bg-brand-paper text-lg text-brand-main px-4 pb-4 mr-12 overflow-y-auto h-[calc(100vh-3.75rem)]">
      {paragraphs}
    </div>
  );
};

export default MainPanel;

// dummy display data
const data = [
  {
    key: 0,
    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Inventore, ducimus! Odit dolorum hic rerum maiores vel magni voluptatibus cupiditate sapiente modi totam soluta, quaerat nisi tempora eligendi saepe quod amet cumque sunt eaque. Quaerat quod incidunt optio, consectetur minus eligendi officia distinctio est nisi impedit ipsa nemo iste eius commodi!",
  },
  {
    key: 1,
    text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur sed sint qui provident quod nam odit delectus illum dolor quos laboriosam autem dolore maiores, eligendi iusto, ut repellat explicabo, unde blanditiis esse et. Vero, ad error alias quaerat quod necessitatibus deleniti unde ea debitis enim quas atque a voluptas nihil? Inventore reprehenderit voluptas iste mollitia rerum fugiat rem totam architecto suscipit, placeat possimus labore illo explicabo consequatur odit molestiae vitae, facilis eum culpa dolorum quis, porro nemo. Optio, quia maxime similique eum iste dolorem voluptatibus odio ad deserunt temporibus, eligendi accusamus amet ducimus ratione fugiat in quisquam nisi facilis recusandae, est aperiam nam velit alias nesciunt? Voluptatum porro iste asperiores officia dolore, laudantium provident dolor velit accusamus aut illum quis error odit iusto nulla, placeat ipsum consequatur eveniet. Eos asperiores eligendi minima ea voluptatem. Quibusdam dolor officiis at, sit quos quasi magni rerum. Nihil omnis dolor repellendus, illo molestias ex.",
  },
  {
    key: 2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam tempora, ullam ea dolores adipisci ab quod ipsum iure quibusdam autem aut voluptatibus, cumque nam saepe molestias aliquid harum ipsam. Officiis, inventore. Obcaecati iure ex sint. Consequuntur in optio aspernatur excepturi quisquam laboriosam dignissimos error ratione omnis unde accusantium corrupti asperiores quia non quidem, est earum consectetur deleniti ipsam sint officiis odio praesentium. Sunt quod sed, voluptatum eligendi voluptate vero pariatur reiciendis nobis omnis. Fuga repellendus sint minus fugit atque laborum corrupti, in aut amet! Vitae, ut cupiditate! Incidunt non dolorem asperiores quos ducimus, aperiam eos consequatur laudantium officiis commodi dolorum ipsa fugit minus provident ut alias, facere pariatur laborum dignissimos? Quas fugit repudiandae error facilis, quidem eius harum, praesentium commodi veniam, molestias non. Odio molestiae quia maiores omnis veniam porro nihil doloremque, voluptates dolorem odit totam eaque fuga repellendus nisi recusandae, accusantium esse? Amet, dolorum similique eaque cupiditate accusamus deserunt, aliquam architecto minus consequatur illo, ea sed quibusdam nulla tempore harum est quos vitae adipisci. Numquam qui amet eligendi cum est aliquid consectetur repudiandae ad a. Modi nam rem quas porro mollitia iusto voluptate commodi assumenda odit aliquam repellat dicta neque eos perspiciatis, animi totam maiores ut dolore eius optio veritatis. Iusto itaque doloribus labore debitis tempore ex fugit dolor maxime eaque nam, ducimus architecto illum sint distinctio! Harum repellat saepe tempore inventore reprehenderit eius odio asperiores ut, porro architecto cupiditate consequatur aut veniam. Expedita ea cum hic quaerat sit aperiam optio, delectus sunt alias consequuntur nesciunt porro voluptas facilis inventore incidunt pariatur quas minima quos neque quam. Quae vero eveniet nobis optio molestiae labore voluptatibus architecto fugiat consequuntur nostrum fugit in maxime laboriosam eius hic reiciendis earum fuga accusantium, perferendis cumque qui. Minus quidem dolorum ea fuga sequi ducimus vitae repudiandae, corrupti debitis, saepe laboriosam assumenda dolore, esse illo.",
  },
  {
    key: 3,
    text: "Similique dolore sapiente et ipsum optio eius quaerat ducimus dolores assumenda, cupiditate alias laboriosam delectus impedit aliquam officiis odit sint dolor dolorum repudiandae? Ea harum pariatur praesentium quia eum quas.",
  },
  {
    key: 4,
    text: "Corporis esse doloribus mollitia fugiat nam ullam quibusdam quos quasi, eaque ex amet, dignissimos vero nesciunt cumque quae est rerum. Minus assumenda vitae omnis exercitationem ea blanditiis expedita minima fugit!",
  },
  {
    key: 5,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque accusantium magnam temporibus magni repellat, omnis, consequuntur necessitatibus dolorum error molestiae perspiciatis, dolorem expedita voluptate fugit! Obcaecati maiores laudantium placeat vero dolor harum eius esse officiis minus provident voluptatem nemo, quos nam ad nesciunt rem. Ipsa dicta nihil voluptate omnis, quaerat perspiciatis consequatur unde veritatis deserunt laborum aperiam, ullam commodi iste dolor nostrum distinctio, ipsam suscipit sit dolore corrupti iusto numquam quia sint. Temporibus id voluptates eveniet delectus alias illum numquam ea nemo nam ex quas ipsa libero, ratione aperiam incidunt dicta aspernatur deserunt quae quam nulla? Inventore laudantium tenetur officiis dicta neque deserunt eligendi optio incidunt. Atque quas fugit sit, enim quod maiores ad illum commodi reiciendis sed a corrupti deleniti vero consequatur eligendi aut minus ducimus culpa ex autem eos, quidem cum eveniet impedit! Perferendis ratione nemo iusto, magnam vero quaerat pariatur ipsum reprehenderit excepturi quisquam libero impedit, aut amet necessitatibus explicabo error consequatur tenetur nulla deleniti, blanditiis sint rem! Maiores necessitatibus beatae, ullam officia rerum sint provident! Perferendis, nemo inventore nam quo voluptas praesentium nisi quasi quidem nulla, dolores sunt esse facere eos quibusdam explicabo. Cupiditate ducimus placeat deserunt accusantium nemo reiciendis eius veniam ad aperiam ipsum totam, blanditiis eum, facere earum ab? Aliquam, vel, expedita hic commodi ab iusto ipsum rerum omnis aspernatur labore dicta, architecto culpa doloremque accusamus. Ex sapiente quidem accusamus iste ab molestias dignissimos ad fuga accusantium nisi minus nostrum aliquam maiores, vel error ut aspernatur saepe ea eaque eum! Dicta earum fugiat quidem provident sit. Iste recusandae molestiae cum tempora iure dicta numquam illum, quo eos aspernatur rem nemo quaerat soluta ipsa explicabo nesciunt rerum, unde laborum ratione voluptate eveniet voluptatum! Illum nobis placeat incidunt iste laboriosam, magni aliquid obcaecati, ad quasi quos quisquam voluptates? Cum atque quam exercitationem. Qui dolorem similique non doloribus accusantium magnam! Veniam culpa suscipit quidem nesciunt aperiam temporibus officiis rem officia reprehenderit sint provident deleniti beatae, neque sit accusantium repellat iste nobis animi reiciendis ut autem dolorum omnis hic est! Saepe ea ut quod unde eius dolore incidunt obcaecati sunt deleniti eos, sequi ex consequatur autem corrupti impedit ratione nisi. Eligendi fugit ullam animi magni commodi sequi provident aspernatur, aliquid, quod nisi iste asperiores, similique veritatis exercitationem amet illo cumque! Perferendis aliquam non illum dolorem? Facere deleniti nobis ratione totam iste fugit, perferendis, libero suscipit voluptatem tempore praesentium veritatis tenetur rem perspiciatis? Nulla reprehenderit necessitatibus eius, illum incidunt eos sequi. Et amet similique, aperiam voluptas ipsam vero nostrum dicta eveniet illum mollitia enim harum nam atque. Ullam, odit. Eaque officia dolores aliquam, maiores modi qui quibusdam obcaecati, corporis non nostrum sed, eum provident dolore. Repellat mollitia qui cumque iste deserunt perferendis dolores ullam cupiditate, unde, molestias provident minus inventore corporis. Ipsum cupiditate esse, reprehenderit ducimus quam magnam molestiae mollitia in aut temporibus veniam possimus minima officia quod, nostrum aspernatur recusandae porro laborum neque.",
  },
  {
    key: 6,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea sunt odio explicabo officiis quas sed eligendi ad culpa facilis nihil? Libero doloremque distinctio rem quae? Veniam, saepe sunt. Assumenda inventore minus fugiat adipisci cumque dolorum odit sed architecto amet tenetur, recusandae et nisi iusto ab aspernatur voluptas vitae earum dignissimos.",
  },
  {
    key: 7,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis a nulla enim maiores amet explicabo quae molestias temporibus, eum provident quidem aut, nobis atque optio, doloribus ratione accusantium placeat. Quasi corporis in qui voluptatum architecto sint nesciunt expedita pariatur aperiam, dolores repellat veritatis eos omnis explicabo totam incidunt dolorum esse? Quos ducimus aliquid harum ipsam deserunt ex id excepturi, porro veritatis, voluptates illum quas. Quidem, mollitia porro eveniet ullam iste ipsa omnis natus dignissimos adipisci est et, culpa nihil magnam molestiae tempore non assumenda nesciunt!",
  },
];
