import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "../container/Container";
import Logo from "../common/Logo";
import LogoutBtn from "./LogoutBtn";

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authStatus } = useSelector((state) => state.auth);
  console.log("pathname", pathname);
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 bg-gray-500 rounded border border-sky-500 shadow-rose-950">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo width="50px" />
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name} className="mx-1 flex content-center">
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full ${
                      item?.slug === pathname
                        ? "bg-blue-100 border border-sky-500"
                        : ""
                    }`}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li className="mx-1 flex content-center">
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
};
export default Header;
