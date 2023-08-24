import RecentPost from "./recent/Recent";
import Aside from "./aside/Aside";

const Main = () => {
  return (
    <main className="flex flex-col md:flex-row">
      <RecentPost />
      <Aside />
    </main>
  );
};

export default Main;
