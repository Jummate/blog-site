import { IoTimeOutline } from "react-icons/io5";
import Button from "../../components/button/Button";
import { postData } from "../../data";
import { Link } from "react-router-dom";

const RecentPost = () => {
  return (
    <section className="p-5">
      <h1 className="text-sky-900 font-bold text-xl mb-4">Recent Posts</h1>

      {postData.map((post, index) => (
        <article
          key={index}
          className="w-full h-100 shadow-pref cursor-pointer rounded-2xl p-2 flex flex-col gap-4 md:flex-row mb-7"
        >
          <div className="w-full h-1/2">
            <img
              src={post.bannerImage}
              alt=""
              className="rounded-2xl h-auto w-full hover:opacity-80"
            />
          </div>
          <div className="p-2">
            <div className="flex justify-between">
              <button className="text-sky-600 mb-3 py-1 px-5 bg-sky-100 rounded-lg text-sm hover:bg-sky-900 hover:text-sky-200">
                {post.tag}
              </button>
              <span>
                <IoTimeOutline className="inline mr-1" />
                <time
                  dateTime="PT4M"
                  className="text-sm text-sky-600/70 hover:text-sky-900"
                >
                  {post.readTime} read
                </time>
              </span>
            </div>

            <Link to={`post/${post.id}`}>
              <h1 className="font-bold text-sky-800 text-sm leading-5 mb-3 hover:underline">
                {post.title}
              </h1>
            </Link>

            <p className="text-slate-600 text-sm">{post.summary}</p>

            <div className="mt-6 flex gap-2">
              <img
                src={post.authorImage}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sky-900 font-bold text-md">Olawale Jumat</p>
                <p className="text-sm text-sky-600/80">
                  <time dateTime="2023-04-20">{post.createdAt}</time>
                </p>
              </div>
            </div>

            <div className="flex items-center p-2 mt-3 gap-3 text-xs">
              <Button
                text="Edit Post"
                extraStyles={"bg-sky-600 text-white"}
              />{" "}
              <Button
                text="Delete Post"
                extraStyles={"bg-red-600 text-white"}
              />
            </div>
          </div>
        </article>
      ))}

      <div className="flex justify-center">
        <Button text="Load More" />
      </div>
    </section>
  );
};

export default RecentPost;
