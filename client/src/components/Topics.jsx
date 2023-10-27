import IMAGE_TWO from "../assets/image2.jpg";

const Topics = ({ topics, isLoading }) => {
  return (
    <section className="mb-10">
      <h1 className="mb-3 text-lg font-bold text-sky-900 dark:text-sky-100">
        Popular Topics
      </h1>

      <div className="flex flex-wrap gap-2 max-h-60 max-w-sm overflow-auto">
        {isLoading ? (
          <p className="text-sky-900 dark:text-sky-100">Loading...</p>
        ) : topics.length < 1 ? (
          <p className="text-sky-900 dark:text-sky-100">No topics to display</p>
        ) : (
          topics.map((tag, index) => (
            <div
              key={index}
              className="flex gap-1 border-2 rounded-xl mb-2 text-sm h-8"
            >
              <img
                src={IMAGE_TWO}
                className="w-10 h-auto rounded-s-lg"
                alt=""
              />
              <span className="p-1 text-sky-900 dark:text-sky-100">{tag}</span>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Topics;
