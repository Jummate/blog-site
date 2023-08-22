import Topics from "../topics/Topics";
import Tag from "../tag/Tag";

const Aside = () => {
  return (
    <aside className="bg-sky-100/70 p-5 pb-10 dark:bg-sky-800">
      <Topics />
      <Tag />
    </aside>
  );
};

export default Aside;
