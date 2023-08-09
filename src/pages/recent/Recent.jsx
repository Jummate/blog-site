import IMAGE_ONE from "../../assets/image1.jpg";
import { IoTimeOutline } from "react-icons/io5";
import Button from "../../components/button/Button";

const RecentPost = () => {
  return (
    <section className="p-5">
      <h1 className="text-sky-900 font-bold text-xl mb-4">Recent Posts</h1>

      <article className="w-full h-100 shadow-pref cursor-pointer rounded-2xl p-2 flex flex-col gap-4 md:flex-row mb-7 hover:opacity-80">
        <div className="w-full h-1/2">
          <img
            src={IMAGE_ONE}
            alt="Image One"
            className="rounded-2xl h-auto w-full"
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <button className="text-sky-600 mb-3 py-1 px-5 bg-sky-100 rounded-lg text-sm hover:bg-sky-900 hover:text-sky-200">
              Science
            </button>
            <span>
              <IoTimeOutline className="inline mr-1" />
              <time
                dateTime="PT4M"
                className="text-sm text-sky-600/70 hover:text-sky-900"
              >
                4 min read
              </time>
            </span>
          </div>

          <h1 className="font-bold text-sky-800 text-sm leading-5 mb-3">
            My First Foray Into Lazy Loading With JavaScript
          </h1>

          <p className="text-slate-600 text-sm">
            Lazy Loading is a performance-improvement technique which seeks to
            lorem ipsum when the lorem ipsum is the lorem ipsum within the lorem
            ipsum...
          </p>

          <div className="mt-6 flex gap-2">
            <img
              src={IMAGE_ONE}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sky-900 font-bold text-md">Olawale Jumat</p>
              <p className="text-sm text-sky-600/80">
                <time dateTime="2023-04-20">April 20, 2023</time>
              </p>
            </div>
          </div>
        </div>
      </article>

      <article className="w-full h-100 shadow-pref cursor-pointer rounded-2xl p-2 flex flex-col gap-4 md:flex-row mb-7 hover:opacity-80">
        <div className="w-full h-1/2">
          <img
            src={IMAGE_ONE}
            alt="Image One"
            className="rounded-2xl h-auto w-full"
          />
        </div>
        <div className="p-2">
          <div className="flex justify-between">
            <button className="text-sky-600 mb-3 py-1 px-5 bg-sky-100 rounded-lg text-sm hover:bg-sky-900 hover:text-sky-200">
              Science
            </button>
            <span>
              <IoTimeOutline className="inline mr-1" />
              <time
                dateTime="PT4M"
                className="text-sm text-sky-600/70 hover:text-sky-900"
              >
                4 min read
              </time>
            </span>
          </div>

          <h1 className="font-bold text-sky-800 text-sm leading-5 mb-3">
            My First Foray Into Lazy Loading With JavaScript
          </h1>

          <p className="text-slate-600 text-sm">
            Lazy Loading is a performance-improvement technique which seeks to
            lorem ipsum when the lorem ipsum is the lorem ipsum within the lorem
            ipsum...
          </p>

          <div className="mt-6 flex gap-2">
            <img
              src={IMAGE_ONE}
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sky-900 font-bold text-md">Olawale Jumat</p>
              <p className="text-sm text-sky-600/80">
                <time dateTime="2023-04-20">April 20, 2023</time>
              </p>
            </div>
          </div>
        </div>
      </article>

      <div className="flex justify-center">
        <Button text="Load More" />
      </div>
    </section>
  );
};

export default RecentPost;
