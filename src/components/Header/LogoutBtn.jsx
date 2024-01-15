import { useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import useAuthService from "../../appWrite/auth-service";

function LogoutBtn() {
  const dispatch = useDispatch();
  const authService = useAuthService();

  //handle logout user
  const handleLogout = () => {
    authService.logout().then(() => {
      dispatch(logout());
    });
  };
  return (
    <button
      className="inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
      onClick={handleLogout}
    >
      Logout
    </button>
  );
}
export default LogoutBtn;
