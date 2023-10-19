const Aside = ({ Tag, Topics }) => {
  return (
    <aside className="bg-sky-100/70 p-10 md:p-5 sm:pt-16 md:pt-20 dark:bg-sky-800 md:w-1/4 flex flex-col gap-10 relative">
      <div className="sticky top-0 max-w-sm">
        {Topics}
        {Tag}
      </div>
    </aside>
  );
};

export default Aside;
