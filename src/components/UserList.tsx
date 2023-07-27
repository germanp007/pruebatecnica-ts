import { User } from "../types";

interface Props {
  deleteUser: (email: string) => void;
  changeColor: boolean;
  users: User[];
}

export const UserList = ({
  changeColor,
  users,
  deleteUser,
}: Props): JSX.Element => {
  return (
    <div className="container">
      <table>
        <thead>
          <tr>
            <th>Foto</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Pais</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((ele, index) => {
            const style = index % 2 === 0 ? "#333" : "#555";
            const background = changeColor ? style : "transparent";
            return (
              <tr key={ele.email} style={{ backgroundColor: background }}>
                <td>
                  <img src={ele.picture.thumbnail} alt="user-photo" />
                </td>
                <td>{ele.name.first}</td>
                <td>{ele.name.last}</td>
                <td>{ele.location.country}</td>

                <td>
                  <button onClick={() => deleteUser(ele.email)}>Borrar</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
