import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const [data, setData] = useState(null);
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [errorUsers, setErrorUsers] = useState(null);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseUrl); // Replace with your API URL
        setData(response.data.slice(0, 10)); // Limit to first 10 items for brevity
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    const fetchDataUsers = async () => {
      try {
        const responseUsers = await axios.get(`${baseUrl}/users`); // Replace with your API URL
        setUsers(responseUsers.data.slice(0, 10)); // Limit to first 10 items for brevity
      } catch (err) {
        setErrorUsers(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchDataUsers();
  }, []); // Empty dependency array ensures it runs only once on mount

  return (
    <>
      <div>
        <h2>App1</h2>
        {data ? (
          <ul>
            {data.map((item) => (
              <li key={item.id}>{item.title}</li>
            ))}
          </ul>
        ) : loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : null}

        <h2>Liste des utilisateurs</h2>
        <h5>{`${baseUrl}/users`}</h5>
        {users ? (
          <>
            <p>Total : {users?.length}</p>
            {users.map((item) => (
              <p key={item.id}>{item.name}</p>
            ))}
          </>
        ) : loading ? (
          <p>Loading...</p>
        ) : errorUsers ? (
          <p>Error: {errorUsers.message}</p>
        ) : null}
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <h3>GHALASS WEB DEV</h3>
    </>
  );
}

export default App;
