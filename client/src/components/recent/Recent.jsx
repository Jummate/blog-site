import { IoTimeOutline } from "react-icons/io5";
import Button from "../button/Button";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import baseUrl from "../../config/baseUrl";
import { AuthContext } from "../../contexts/AuthProvider";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";
import { notify } from "../../utils/notify";
import { alertDelete } from "../../utils/alert";

const deletePost = async (id, axiosAuth) => {
  try {
    const response = await axiosAuth.delete(
      `${baseUrl.serverBaseUrl}/posts/${id}`
    );
    notify({ msg: response.data.message });
  } catch (err) {
    console.log(err);
  }
};

const RecentPost = () => {
  const { token } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const axiosAuth = useAxiosInterceptor();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${baseUrl.serverBaseUrl}/posts/`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);
  return (
    <section className="p-5 py-10 sm:p-16 md:p-20 dark:bg-sky-900/90 md:w-3/4 h-92">
      <h1 className="text-sky-900 dark:text-sky-100 font-bold text-xl mb-4">
        Recent Posts
      </h1>
      <div className="flex flex-col justify-center items-center">
        {posts.map((post, index) => (
          <article
            key={index}
            className="w-full shadow-pref dark:bg-sky-900 cursor-pointer rounded-2xl p-5 flex flex-col gap-4 lg:flex-row mb-7"
          >
            <div className="w-full lg:w-1/2">
              <img
                src={`${baseUrl.serverBaseUrl}/${post.bannerImage}`}
                alt=""
                className="rounded-2xl h-auto md:h-4/5 w-full hover:opacity-80"
              />
            </div>
            <div className="p-2">
              <div className="flex justify-between">
                <button className="text-sky-600 mb-3 py-1 px-5 bg-sky-100 dark:bg-sky-600 dark:text-sky-100 rounded-lg text-sm hover:bg-sky-900 hover:text-sky-200 hover:dark:text-sky-900 hover:dark:bg-sky-100">
                  {post.tag}
                </button>
                <span>
                  <IoTimeOutline className="inline mr-1 dark:text-sky-500" />
                  <time
                    dateTime="PT4M"
                    className="text-sm text-sky-600/70 hover:text-sky-900 dark:text-sky-200/90 dark:hover:text-sky-100"
                  >
                    {post.readTime} read
                  </time>
                </span>
              </div>

              <Link to={`post/${post.id}`}>
                <h1 className="font-bold text-sky-800 text-sm leading-5 mb-3 hover:underline dark:text-sky-100">
                  {post.title}
                </h1>
              </Link>

              <p className="text-slate-600 text-sm dark:text-slate-200/90">
                {post.summary}
              </p>

              <div className="mt-6 flex gap-2">
                <img
                  src={`${baseUrl.serverBaseUrl}/${post.authorImage}`}
                  alt=""
                  className="h-10 w-10 rounded-full"
                />
                <div>
                  <p className="text-sky-900 font-bold text-md dark:text-sky-100">
                    {post.author}
                  </p>
                  <p className="text-sm text-sky-600/80 dark:text-sky-300">
                    <time dateTime="2023-04-20">{post.createdAt}</time>
                  </p>
                </div>
              </div>

              {token && (
                <div className="flex items-center p-2 mt-3 gap-3 text-xs">
                  <Link to={`edit/${post.id}`}>
                    <Button extraStyles={"bg-sky-400 text-white"}>
                      Edit Post
                    </Button>
                  </Link>
                  <Button
                    extraStyles={"bg-red-500 text-white"}
                    onClick={() => alertDelete(post.id, axiosAuth, deletePost)}
                  >
                    Delete Post
                  </Button>
                </div>
              )}
            </div>
          </article>
        ))}

        <div className="flex justify-center">
          <Button
            extraStyles={
              "bg-sky-900 dark:bg-sky-500 dark:text-sky-100 dark:hover:bg-sky-200 dark:hover:text-sky-800"
            }
          >
            Load More
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentPost;
