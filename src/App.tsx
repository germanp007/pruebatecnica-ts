import { useEffect, useRef, useState } from "react";
import { type User } from "./types.d";
import { UserList } from "./components/UserList";
const MyApp = (): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [changeColor, setChangeColor] = useState(false);
  const [sortByCountry, setsortByCountry] = useState(false);
  const [filterByCountry, setFilterByCountry] = useState<string | null>(null);
  const originalState = useRef<User[]>([]);
  const toggleColor = () => {
    setChangeColor(!changeColor);
  };
  const sortedByCountry = () => {
    setsortByCountry((prev) => !prev);
  };
  const deleteUser = (email: string) => {
    const filteredUser = users.filter((user) => user.email !== email);
    setUsers(filteredUser);
  };
  const restartUsers = () => {
    setUsers(originalState.current);
  };
  const filtrarPorPais =
    typeof filterByCountry === "string" && filterByCountry.length > 0
      ? users.filter((user) =>
          user.location.country
            .toLocaleLowerCase()
            .includes(filterByCountry.toLocaleLowerCase())
        )
      : users;

  const sortedUsers = sortByCountry
    ? [...filtrarPorPais].sort((a, b) =>
        a.location.country.localeCompare(b.location.country)
      )
    : filtrarPorPais;
  useEffect(() => {
    fetch("https://randomuser.me/api?results=100")
      .then((res) => res.json())
      .then((res) => {
        setUsers(res.results);
        originalState.current = res.results;
      });
  }, []);

  return (
    <>
      <h1>Prueba Tecnica TS {users.length}</h1>
      <header>
        <button onClick={toggleColor}>Colorear Filas</button>
        <button onClick={sortedByCountry}>
          {sortByCountry ? "No Ordenar por Pais" : "Ordenar por Pais"}
        </button>
        <button onClick={restartUsers}>Resetear</button>
        <input
          type="text"
          placeholder="filter by country"
          onChange={(e) => setFilterByCountry(e.target.value)}
        />
      </header>
      <UserList
        users={sortedUsers}
        changeColor={changeColor}
        deleteUser={deleteUser}
      />
    </>
  );
};

export default MyApp;
