import Header from "./news/ui/header/page";

import './globals.css';
import MainPage from "./news/pages/mainPage";

export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <MainPage />
    </div>
  );
}
