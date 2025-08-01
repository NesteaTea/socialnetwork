
import AllPosts from "./AllPosts/page";
import CreatePost from "./CreatePost/page";

export default function Posts() {
  return (
    <div className="mainContainer">
        <CreatePost />
        <AllPosts />
    </div>
  );
}