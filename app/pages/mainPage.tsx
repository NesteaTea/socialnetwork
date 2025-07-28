import Aside from "../ui/aside/page";
import Posts from "../ui/posts/page";
import RightAside from "../ui/rightAside/page";
import style from './mainPage.module.css'

export default function MainPage() {
  return (
    <div className={style.mainContainer}>
        <Aside />
        <Posts />
        <RightAside />
    </div>
  );
}