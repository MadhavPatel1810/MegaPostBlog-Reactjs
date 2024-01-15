import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import { Account, Client, Databases, Storage } from "appwrite";
import conf from "../../conf/conf";

const UserContextProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [databases, setDatabases] = useState(null);
  const [bucket, setBucket] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    setClient(() => new Client());
  }, []);

  useEffect(() => {
    if (client) {
      client.setEndpoint(conf.appWriteUrl).setProject(conf.appWriteProjectId);
      setDatabases(new Databases(client));
      setBucket(new Storage(client));
      setAccount(() => new Account(client));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client]);

  return (
    <UserContext.Provider
      value={{
        client,
        setClient,
        databases,
        setDatabases,
        bucket,
        setBucket,
        account,
        setAccount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
