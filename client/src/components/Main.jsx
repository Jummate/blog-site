import RecentPost from "./Recent";
import Aside from "./Aside";

const Main = () => {
  return (
    <main className="flex flex-col md:flex-row">
      <RecentPost />
      <Aside />
    </main>
  );
};

export default Main;
