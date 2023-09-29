import { topicData } from "../data";
const Topics = () => {
  return (
    <section className="mb-10">
      <h1 className="mb-3 text-lg font-bold text-sky-900 dark:text-sky-100">
        Popular Topics
      </h1>

      {Object.keys(topicData).map((topic, index) => (
        <div
          key={index}
          className="flex gap-2 border-2 rounded-xl mb-4 w-full text-sm"
        >
          <img
            src={topicData[`${topic}`]}
            className="w-12 h-auto rounded-s-lg"
            alt=""
          />
          <span className="p-3 text-sky-900 dark:text-sky-100">{topic}</span>
        </div>
      ))}
    </section>
  );
};

export default Topics;