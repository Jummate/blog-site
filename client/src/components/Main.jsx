import RecentPost from "./Recent";
import Aside from "./Aside";
import axios from "axios";
import { useState, useEffect } from "react";
import Topics from "./Topics";
import Tag from "./Tag";
import baseUrl from "../config/baseUrl";
import { notify } from "../utils/notify";
import SERVER_ERR_MSG from "../config/errorMsg";

const collectTags = (allPosts) => {
  if (allPosts.length > 0) {
    return [...new Set(allPosts.map(({ tag }) => tag))];
  }
};

const Main = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  // I'm using this state to cause Main to re-render to fetch updated items
  //I did this because it seems impossible to navigate to current page (in this case, /home) after deleting an item
  //as that is where the deletion happens
  const [IsPostDeleted, setIsPostDeleted] = useState(false);

  useEffect(() => {
    const source = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios.get(`${baseUrl.serverBaseUrl}/posts/`, {
          cancelToken: source.token,
        });
        if (response.data.length > 0) {
          setPosts(response.data);
        }
        setIsLoading(false);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log("Axios request aborted");
        } else {
          //error without "response" object is from axios request cancellation, so do not log it
          err.response && console.log(err);
          notify({
            msg:
              !err.response || err?.response?.status >= 500
                ? SERVER_ERR_MSG
                : err?.response?.data?.message,
            type: "error",
            autoClose: false,
          });
        }
      }
    })();

    return () => {
      source.cancel();
    };
  }, [IsPostDeleted]);
  return (
    <main className="flex flex-col md:flex-row">
      <RecentPost
        posts={posts}
        isLoading={isLoading}
        setIsPostDeleted={() => setIsPostDeleted(!IsPostDeleted)}
      />
      <Aside
        Tag={<Tag tags={collectTags(posts)} />}
        Topics={<Topics tags={collectTags(posts)} />}
      />
    </main>
  );
};

export default Main;
