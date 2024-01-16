import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { login, logout } from "../../store/authSlice";
import useAuthService from "../../appWrite/auth-service";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const dispatch = useDispatch();
  const authService = useAuthService();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400 blog_card">
      <div className="w-full block">
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null;
};
export default Layout;
