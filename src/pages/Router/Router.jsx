import { Route, Routes, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import pagesData from "../pagesData";
import useAppContext from "../../hook/useAppContext";

const Router = () => {
  const { isLoggedIn, customerData, setCustomerDataFromToken } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else if (!customerData?.email) {
      setCustomerDataFromToken();
    }
  }, [navigate, isLoggedIn]);

  const pageRoutes = pagesData.map(({ path, title, element }) => {
    return <Route key={title} path={`/${path}`} element={element} />;
  });

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
