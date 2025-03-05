import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastname, setLastname] = useState("");
  const [firstname, setFirstname] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");

  const fetchApi = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/users`);
      setUsers(response.data);
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleNewUsers = async (e) => {
    e.preventDefault();
    const newUser = await axios.post(`http://localhost:8000/api/users`, {
      lastname,
      firstname,
      telephone,
      address,
    });
    fetchApi();
  };

  useEffect(() => {
    fetchApi();
  }, []);

  if (loading) return <h1>Chargement...</h1>;
  if (error) return <h1>{error}</h1>;

  return (
    <>
      <h1 className="myH1">Hello world</h1>
      {users &&
        !loading &&
        users.map((user) => {
          return (
            <div key={user.id}>
              <p>Lastname : {user.lastName}</p>
              <p>Firstname: {user.firstName}</p>
              <p>Telephone : {user.telephone}</p>
              <p>Addresse : {user.address}</p>
            </div>
          );
        })}
      <form onSubmit={handleNewUsers}>
        <label htmlFor="">Nom:</label>
        <input type="text" onChange={(e) => setLastname(e.target.value)} />
        <label htmlFor="">Prénom:</label>
        <input type="text" onChange={(e) => setFirstname(e.target.value)} />
        <label htmlFor="">Téléphone:</label>
        <input type="text" onChange={(e) => setTelephone(e.target.value)} />
        <label htmlFor="">Adresse:</label>
        <input type="text" onChange={(e) => setAddress(e.target.value)} />
        <input type="submit" />
      </form>
    </>
  );
};
export default App;
