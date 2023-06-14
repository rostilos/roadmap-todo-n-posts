import { BrowserRouter } from "react-router-dom";
import Router from "./pages/Router/Router";
import Header from "./components/Header/components/Header";
import Footer from "./components/Footer/components/Footer";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
