import { BrowserRouter } from "react-router-dom";
import Router from "./pages/Router/Router";
import Header from "./components/Header/components/Header";
import Sidebar from "./components/SIdebar/components/Sidebar";
import LastUpdates from "./components/LastUpdates/LastUpdates";
import "./scss/main.scss";
import Message from "./components/Common/Message/Message";
// import Footer from "./components/Footer/components/Footer";

function App() {
  return (
    <div className="page">
      <Header />{" "}
      <div className="page__container _container">
        <Message />
        <main className="page__content grid-3-cols">
          <Sidebar />
          <BrowserRouter>
            <Router />
          </BrowserRouter>
          <LastUpdates />
        </main>{" "}
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
