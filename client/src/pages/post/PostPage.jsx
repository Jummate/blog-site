import Button from "../../components/button/Button";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import baseUrl from "../../config/baseUrl";
import axios from "axios";
import DOMPurify from "dompurify";
import { AuthContext } from "../../contexts/AuthProvider";
import useAxiosInterceptor from "../../hooks/useAxiosInterceptor";

const deletePost = async (id, axiosAuth) => {
  try {
    const response = await axiosAuth.delete(
      `${baseUrl.serverBaseUrl}/posts/${id}`
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
};

const PostPage = () => {
  const { token } = useContext(AuthContext);
  const axiosAuth = useAxiosInterceptor();
  const { id } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `${baseUrl.serverBaseUrl}/posts/${id}`
        );
        setPost(response.data[0]);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <section className="dark:bg-sky-900/90">
      <article>
        <header>
          {token && (
            <div className="flex items-center justify-center p-5 gap-3 text-sm">
              <Link to={`/edit/${id}`}>
                <Button extraStyles="bg-sky-400 text-white">Edit Post</Button>
              </Link>
              <Button
                extraStyles="bg-red-600 text-white"
                onClick={() => deletePost(id, axiosAuth)}
              >
                Delete Post
              </Button>
            </div>
          )}

          <img
            className="max-h-80 w-full"
            src={`${baseUrl.serverBaseUrl}/${post?.bannerImage}`}
            alt=""
          />
        </header>
        <article className="p-3 flex flex-col items-center justify-center">
          <div className="flex flex-col md:w-11/12 gap-16 sm:p-12 md:p-16 ">
            <div className="flex gap-2 mt-6 ">
              <img
                src={`${baseUrl.serverBaseUrl}/${post?.authorImage}`}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sky-900 font-bold text-md dark:text-sky-100">
                  {post?.author}
                </p>
                <p className="text-sm text-sky-600/80 dark:text-sky-300">
                  Posted on <time dateTime="2023-04-20">{post?.createdAt}</time>
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-3xl text-center leading-relaxed mb-5 font-bold text-sky-900 dark:text-sky-100">
                {post?.title}
              </h1>
              <div
                className="dark:text-sky-100 leading-7 flex flex-col p-2 gap-5 text-sm md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post?.content),
                }}
              />
            </div>
          </div>
        </article>
      </article>
    </section>
  );
};

export default PostPage;
