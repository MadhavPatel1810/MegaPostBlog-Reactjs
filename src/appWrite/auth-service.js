import { ID } from "appwrite";
import { useContext } from "react";
import UserContext from "../components/context/UserContext";

const useAuthService = () => {
  const { account } = useContext(UserContext);

  //create Account
  const createAccount = async ({ email, password, name }) => {
    try {
      const userAccount = await account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        //Call login method
        return login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //handle Login
  const login = async ({ email, password }) => {
    try {
      return await account.createEmailSession(email, password);
    } catch (error) {
      console.error(error);
    }
  };

  //get current user
  const getCurrentUser = async () => {
    try {
      return account && (await account.get());
    } catch (error) {
      console.log("AppWrite service :: getCurrentUser :: error", error);
    }
    return null;
  };

  //handle logout
  const logout = async () => {
    try {
      return await account.deleteSessions();
    } catch (error) {
      console.log("AppWrite service :: logout :: error", error);
    }
  };
  return {
    createAccount,
    login,
    logout,
    getCurrentUser,
  };
};
export default useAuthService;
