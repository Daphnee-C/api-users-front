import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [count, setCount] = useState(29);
  const [users, setUsers] = useState(null);

  const myName = "Daphnée";

  const [displayError, setDisplayError] = useState(false);

  const fetchApi = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users`);
      setUsers(response.data);
    } catch (error) {
      setDisplayError(true);
    }
  };

  useEffect(() => {
    fetchApi();
    console.log(users);
  }, [count]);

  return (
    <>
      <h1 className="myH1">Hello world</h1>
      <p>
        Hello my name is {myName} and i am {count}
      </p>
      <button onClick={() => setCount(count + 1)}>+1</button>
      {!users ? (
        <p>chargement</p>
      ) : displayError ? (
        <p>une erreur est survenue</p>
      ) : (
        users.map((user, index) => {
          return (
            <div key={index}>
              <h3>Lastname : {user.lastName}</h3>
              <h4>Firstname: {user.firstName}</h4>
            </div>
          );
        })
      )}
    </>
  );
};
export default App;
