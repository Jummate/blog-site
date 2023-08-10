const Tag = () => {
  return (
    <section>
      <h1 className="mb-3 text-lg font-bold text-sky-900">Tags</h1>

      <div className="flex flex-wrap gap-2">
        <button className="text-sky-900 p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900">
          #science
        </button>
        <button className="text-sky-900 p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900">
          #nature
        </button>
        <button className="text-sky-900 p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900">
          #technology
        </button>
        <button className="text-sky-900 p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900">
          #wildlife
        </button>
        <button className="text-sky-900 p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900">
          #politics
        </button>
        <button className="text-sky-900 p-2 bg-sky-100 rounded-2xl hover:text-sky-100 hover:bg-sky-900">
          #travel
        </button>
      </div>
    </section>
  );
};

export default Tag;
