import Button from "./Button";
const Tag = ({ tags, isLoading }) => {
  return (
    <section>
      <h1 className="mb-3 text-lg font-bold text-sky-900 dark:text-sky-100">
        Tags
      </h1>

      <div className="flex flex-wrap gap-2 max-h-60 max-w-sm overflow-auto">
        {isLoading ? (
          <p className="text-sky-900 dark:text-sky-100">Loading...</p>
        ) : tags.length < 1 ? (
          <p className="text-sky-900 dark:text-sky-100">No tags to display</p>
        ) : (
          tags.map((tag, index) => (
            <Button
              key={index}
              extraStyles="text-sky-900 text-sm bg-sky-100 hover:text-sky-100 hover:bg-sky-900 dark:hover:bg-sky-500 p-1"
            >
              #{tag.toLowerCase()}
            </Button>
          ))
        )}
      </div>
    </section>
  );
};

export default Tag;
