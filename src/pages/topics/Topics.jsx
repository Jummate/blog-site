import IMAGE_TWO from "../../assets/image2.jpg";
const Topics = () => {
  return (
    <section className="bg-slate-100/70 h-40 rounded-lg m-5">
      <h1 className="mb-3 text-lg font-bold text-sky-900">Popular Topics</h1>

      <div className="flex gap-2 border-2 rounded-xl mb-4">
        <img
          src={IMAGE_TWO}
          className="w-12 h-auto rounded-s-lg"
          alt="Image Two"
        />
        <span className="p-3 text-sky-900">Science</span>
      </div>

      <div className="flex gap-2 border-2 rounded-xl mb-4">
        <img
          src={IMAGE_TWO}
          className="w-12 h-auto rounded-s-lg"
          alt="Image Two"
        />
        <span className="p-3 text-sky-900">Nature</span>
      </div>

      <div className="flex gap-2 border-2 rounded-xl mb-4">
        <img
          src={IMAGE_TWO}
          className="w-12 h-auto rounded-s-lg"
          alt="Image Two"
        />
        <span className="p-3 text-sky-900">Technology</span>
      </div>
    </section>
  );
};

export default Topics;
