import IMAGE_ONE from "../../assets/image1.jpg";
import Button from "../../components/button/Button";
import { useParams } from "react-router-dom";
import { postData } from "../../data";

const PostPage = () => {
  console.log(useParams());
  return (
    <section className="">
      <article>
        <header>
          <div className="flex items-center justify-center p-3 gap-3 text-sm">
            <Button
              text="Edit Post"
              extraStyles={"bg-sky-600 text-white"}
            />{" "}
            <Button
              text="Delete Post"
              extraStyles={"bg-red-600 text-white"}
            />
          </div>
          <img
            className="h-60 container"
            src={IMAGE_ONE}
            alt=""
          />
        </header>
        <article className="p-3 flex flex-col gap-5">
          <div className="mt-6 flex gap-2">
            <img
              src={IMAGE_ONE}
              alt=""
              className="h-10 w-10 rounded-full"
            />
            <div>
              <p className="text-sky-900 font-bold text-md">Olawale Jumat</p>
              <p className="text-sm text-sky-600/80">
                Posted on <time dateTime="2023-04-20">April 20, 2023</time>
              </p>
            </div>
          </div>
          <div className="">
            <h1 className="text-3xl text-center leading-relaxed font-bold text-sky-900">
              My First Foray Into Lazy Loading With JavaScript
            </h1>
            <div>
              <p>
                Lorem ipsum lorem ipsum lore ipsum lorem Most web applications
                always have one way or the other to display large data sets on
                their web page, and the most common one is using tables. Tables
                are extremely useful to displaying large sets of data, and you
                can add filtering functionality to it also, not like the
                filtering is tied to the tables anyways.
              </p>

              <p>
                So recently after joining klen, one of the things I had to do as
                a frontend developer was to create reusable components for most
                of the components on the application. This article is about
                creating reusable table components, so lets cut the chase.
              </p>
            </div>
          </div>
        </article>
      </article>
    </section>
  );
};

export default PostPage;