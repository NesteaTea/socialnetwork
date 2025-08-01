import Aside from "../ui/aside/page";
import Posts from "../ui/posts/page";
import RightAside from "../ui/rightAside/page";
import style from './news.module.css'
import ProtectedRoute from "../ProtectedRoute";

export default function MainPage() {
  return (
    <ProtectedRoute>
      <div className={style.mainContainer}>
          <Aside />
          <Posts />
          <RightAside />
      </div>
    </ProtectedRoute>
  );
}