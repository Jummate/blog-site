import IMAGE_ONE from "../../assets/image1.jpg";
import Button from "../../components/button/Button";
import { Link, useParams } from "react-router-dom";
// import { postData } from "../../data";

const PostPage = () => {
  const { id } = useParams();
  return (
    <section className="dark:bg-sky-900/90">
      <article>
        <header>
          <div className="flex items-center justify-center p-5 gap-3 text-sm">
            <Link to={`/edit/${id}`}>
              <Button
                text="Edit Post"
                extraStyles="bg-sky-400 text-white"
              />
            </Link>
            <Button
              text="Delete Post"
              extraStyles="bg-red-600 text-white"
            />
          </div>
          <img
            className="max-h-80 w-full"
            src={IMAGE_ONE}
            alt=""
          />
        </header>
        <article className="p-3 flex flex-col items-center justify-center">
          <div className="flex flex-col md:w-11/12 gap-16 sm:p-12 md:p-16 ">
            <div className="flex gap-2 mt-6 ">
              <img
                src={IMAGE_ONE}
                alt=""
                className="h-10 w-10 rounded-full"
              />
              <div>
                <p className="text-sky-900 font-bold text-md dark:text-sky-100">
                  Olawale Jumat
                </p>
                <p className="text-sm text-sky-600/80 dark:text-sky-300">
                  Posted on <time dateTime="2023-04-20">April 20, 2023</time>
                </p>
              </div>
            </div>
            <div>
              <h1 className="text-3xl text-center leading-relaxed mb-5 font-bold text-sky-900 dark:text-sky-100">
                My First Foray Into Lazy Loading With JavaScript
              </h1>
              <div className="dark:text-sky-100 leading-7 flex flex-col p-2 gap-5 text-sm md:text-lg">
                <p>
                  Lorem ipsum lorem ipsum lore ipsum lorem Most web applications
                  always have one way or the other to display large data sets on
                  their web page, and the most common one is using tables.
                  Tables are extremely useful to displaying large sets of data,
                  and you can add filtering functionality to it also, not like
                  the filtering is tied to the tables anyways.
                </p>

                <p>
                  So recently after joining klen, one of the things I had to do
                  as a frontend developer was to create reusable components for
                  most of the components on the application. This article is
                  about creating reusable table components, so lets cut the
                  chase.
                </p>
              </div>
            </div>
          </div>
        </article>
      </article>
    </section>
  );
};

export default PostPage;
