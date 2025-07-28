import Header from "./ui/header/page";

import './globals.css';
import MainPage from "./pages/mainPage";

export default function Home() {
  return (
    <div className="app-container">
      <Header />
      <MainPage />
    </div>
  );
}
