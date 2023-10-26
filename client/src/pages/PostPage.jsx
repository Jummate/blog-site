import Button from "../components/Button";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import baseUrl from "../config/baseUrl";
import DOMPurify from "dompurify";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";
import { alertDelete } from "../utils/alert";
import { notify } from "../utils/notify";
import jwt_decode from "jwt-decode";
import { hasPermission } from "../utils/permission";
import { accessLevel } from "../config/accessLevel";
import { formatDate } from "../utils/dateFormatter";
import transformImage from "../utils/transformImage";
import { transformConfig } from "../config/imgTransform";
import SERVER_ERR_MSG from "../config/errorMsg";

const deletePost = async (id, axiosAuth, navigate) => {
  try {
    const response = await axiosAuth.delete(
      `${baseUrl.serverBaseUrl}/posts/${id}`
    );
    notify({ msg: response.data.message });
    navigate("/");
  } catch (err) {
    notify({
      msg:
        err.response.status >= 500
          ? SERVER_ERR_MSG
          : err?.response?.data?.message,
      type: "error",
      autoClose: false,
    });
    console.log(err);
  }
};

const PostPage = () => {
  const { token } = useContext(AuthContext);
  const decoded = token && jwt_decode(token);
  const axiosAuth = useAxiosInterceptor();
  const { id } = useParams();
  const navigate = useNavigate();

  const location = useLocation();
  const data = location.state;
  // console.log(data);

  return (
    <section className="dark:bg-sky-900/90">
      <article>
        <header className="flex flex-col justify-center items-center">
          {token && (
            <div className="flex items-center justify-center p-5 gap-3 text-sm">
              {hasPermission(accessLevel.EDIT_POST, decoded?.roles) && (
                <Link
                  to={`/edit/${id}`}
                  state={data}
                >
                  <Button extraStyles="bg-sky-400 text-white">Edit Post</Button>
                </Link>
              )}
              {hasPermission(accessLevel.DELETE_POST, decoded?.roles) && (
                <Button
                  extraStyles="bg-red-600 text-white"
                  onClick={() =>
                    alertDelete(id, axiosAuth, navigate, deletePost)
                  }
                >
                  Delete Post
                </Button>
              )}
            </div>
          )}

          <img
            className="h-80 max-h-80 md:max-h-none md:h-96 w-full md:w-4/5"
            src={transformImage(data?.bannerImage, transformConfig.HOME_BANNER)}
            alt=""
          />
        </header>
        <article className="p-3 flex flex-col items-center justify-center">
          <div className="flex flex-col md:w-11/12 gap-16 sm:p-12 md:p-16 ">
            <div className="flex gap-2 mt-6 ">
              <img
                src={transformImage(
                  data?.author?.avatar,
                  transformConfig.AUTHOR_AVATAR
                )}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sky-900 font-bold text-md dark:text-sky-100">
                  {data?.author?.fullName}
                </p>
                <p className="text-sm text-sky-600/80 dark:text-sky-300">
                  Posted on <time>{formatDate(data?.createdAt)}</time>
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-3xl text-center leading-relaxed mb-5 font-bold text-sky-900 dark:text-sky-100">
                {data?.title}
              </h1>
              <div
                className="dark:text-sky-100 leading-7 flex flex-col p-2 gap-5 text-sm md:text-lg"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(data?.content),
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
