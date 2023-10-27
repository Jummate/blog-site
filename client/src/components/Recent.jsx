import { IoTimeOutline } from "react-icons/io5";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ReactPaginate from "react-paginate";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { alertDelete } from "../utils/alert";
import { calculateReadingSpeed } from "../utils/getReadingSpeed";
import jwt_decode from "jwt-decode";
import { hasPermission } from "../utils/permission";
import { accessLevel } from "../config/accessLevel";
import { formatDate } from "../utils/dateFormatter";
import { appConfig } from "../config/appClientConfig";
import transformImage from "../utils/transformImage";
import { transformConfig } from "../config/imgTransform";
import truncate from "../utils/truncate";

const RecentPost = ({ posts, isLoading, setIsPostDeleted }) => {
  const { token } = useContext(AuthContext);
  const decoded = token && jwt_decode(token);

  const axiosAuth = useAxiosInterceptor();
  const [itemOffset, setItemOffset] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const itemsPerPage = appConfig.ITEMS_PER_PAGE;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(posts?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(posts?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, posts]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % posts.length;
    setItemOffset(newOffset);
  };
  return (
    <section className="p-5 py-10 sm:p-16 md:p-20 dark:bg-sky-900/90 md:w-3/4 h-92">
      <h1 className="text-sky-900 dark:text-sky-100 font-bold text-xl mb-4">
        Recent Posts
      </h1>
      <div className="flex flex-col justify-center items-center">
        {isLoading ? (
          <p className="text-sky-900 dark:text-sky-100">Loading...</p>
        ) : posts.length < 1 ? (
          <p className="text-sky-900 dark:text-sky-100">
            No articles to display
          </p>
        ) : (
          currentItems.map((post, index) => (
            <article
              key={index}
              className="w-full shadow-pref dark:bg-sky-900 cursor-pointer rounded-2xl p-5 flex flex-col gap-4 lg:flex-row mb-7"
            >
              <div className="w-full lg:w-1/2">
                <img
                  src={transformImage(
                    post.bannerImage,
                    transformConfig.HOME_BANNER
                  )}
                  alt=""
                  className="rounded-2xl h-auto max-h-60 md:h-4/5 w-full hover:opacity-80"
                />
              </div>
              <div className="p-2 lg:w-1/2 max-w-md">
                <div className="flex justify-between">
                  <button className="text-sky-600 mb-3 py-1 px-3 bg-sky-100 dark:bg-sky-600 dark:text-sky-100 rounded-lg text-sm hover:bg-sky-900 hover:text-sky-200 hover:dark:text-sky-900 hover:dark:bg-sky-100">
                    {post.tag}
                  </button>
                  <span>
                    <IoTimeOutline className="inline mr-1 dark:text-sky-500" />
                    <time
                      dateTime="PT4M"
                      className="text-sm text-sky-600/70 hover:text-sky-900 dark:text-sky-200/90 dark:hover:text-sky-100"
                    >
                      {calculateReadingSpeed(post.content)} min read
                    </time>
                  </span>
                </div>

                <Link
                  to={`post/${post._id}`}
                  state={post}
                >
                  <h1 className="font-bold text-sky-800 text-sm leading-5 mb-3 hover:underline dark:text-sky-100">
                    {post.title}
                  </h1>
                </Link>

                <div>
                  <span className="text-slate-600 text-sm dark:text-slate-200/90">
                    {truncate(post.summary)}
                  </span>
                  <Link
                    to={`post/${post._id}`}
                    state={post}
                  >
                    <small className="font-bold text-sky-900 dark:text-sky-200 hover:underline">
                      Read more
                    </small>
                  </Link>
                </div>

                <div className="mt-6 flex gap-2">
                  <img
                    src={transformImage(
                      post.author.avatar,
                      transformConfig.AUTHOR_AVATAR
                    )}
                    alt=""
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-sky-900 font-bold text-md dark:text-sky-100">
                      {post.author.fullName}
                    </p>
                    <p className="text-sm text-sky-600/80 dark:text-sky-300">
                      <time>{formatDate(post.createdAt)}</time>
                    </p>
                  </div>
                </div>

                {token && (
                  <div className="flex items-center p-2 mt-3 gap-3 text-xs">
                    {hasPermission(accessLevel.EDIT_POST, decoded?.roles) && (
                      <Link
                        to={`edit/${post._id}`}
                        state={post}
                      >
                        <Button extraStyles={"bg-sky-400 text-white"}>
                          Edit Post
                        </Button>
                      </Link>
                    )}
                    {hasPermission(accessLevel.DELETE_POST, decoded?.roles) && (
                      <Button
                        extraStyles={"bg-red-500 text-white"}
                        onClick={() =>
                          alertDelete({
                            id: post._id,
                            type: "posts",
                            axiosAuth,
                            callback: setIsPostDeleted,
                          })
                        }
                      >
                        Delete Post
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))
        )}

        {posts.length > 0 ? (
          <ReactPaginate
            breakLabel="..."
            nextLabel="Next>"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            pageCount={pageCount}
            previousLabel="<Prev"
            renderOnZeroPageCount={null}
            containerClassName="flex gap-5 font-bold "
            activeClassName="rounded-full bg-sky-900 text-sky-50 dark:bg-sky-200 dark:text-sky-900 h-6 w-6 text-center"
            previousClassName="text-sky-950 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300"
            nextClassName="text-sky-950 dark:text-sky-400 hover:text-sky-500 dark:hover:text-sky-300"
            pageClassName="text-sky-600 dark:text-sky-100 hover:text-sky-400 dark:hover:text-sky-500"
          />
        ) : null}
      </div>
    </section>
  );
};

export default RecentPost;
