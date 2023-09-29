import Button from "./Button";
import { tagData } from "../data";
const Tag = () => {
  return (
    <section>
      <h1 className="mb-3 text-lg font-bold text-sky-900 dark:text-sky-100">
        Tags
      </h1>

      <div className="flex flex-wrap gap-2">
        {tagData.map((tag, index) => (
          <Button
            key={index}
            extraStyles="text-sky-900 text-sm bg-sky-100 hover:text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-500"
          >
            #{tag}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default Tag;
