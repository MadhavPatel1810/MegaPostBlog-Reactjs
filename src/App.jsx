import "./App.css";
import Layout from "./components/Layout";
import UserContextProvider from "./components/context/UseContextprovider";
function App() {
  return (
    <UserContextProvider>
      <Layout />
    </UserContextProvider>
  );
}
export default App;
