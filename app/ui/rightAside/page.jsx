import OnlineFriends from './onlineFriends/page';
import style from './rightAside.module.css';
import Suggestions from './suggestions/page';

export default function RightAside() {
  return (
    <aside className={style.rightSidebar}>
      <Suggestions />
      <OnlineFriends />
    </aside>
  );
}