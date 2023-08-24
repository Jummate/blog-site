import { tagData } from "../../data";
const Tag = () => {
  return (
    <section>
      <h1 className="mb-3 text-lg font-bold text-sky-900 dark:text-sky-100">
        Tags
      </h1>

      <div className="flex flex-wrap gap-2">
        {tagData.map((tag, index) => (
          <button
            key={index}
            className="text-sky-900 text-sm p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-500"
          >
            #{tag}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Tag;
