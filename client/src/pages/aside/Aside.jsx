import Topics from "../topics/Topics";
import Tag from "../tag/Tag";

const Aside = () => {
  return (
    <aside className="bg-slate-100/70 p-5 mb-10">
      <Topics />
      <Tag />
    </aside>
  );
};

export default Aside;
