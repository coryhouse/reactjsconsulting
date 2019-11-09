import React from 'react';
import { User } from './api/users';
import { Link } from 'react-router-dom';

interface UsersProps {
  users: User[];
  deleteUser: (id: number) => Promise<void>;
}
const Users: React.FC<UsersProps> = ({ users, deleteUser }) => {
  const h1Style: React.CSSProperties = {
    color: 'red',
    marginBottom: 20
  };

  return (
    <>
      <h1 className="header" style={h1Style}>
        Users
      </h1>
      <Link to="/user">Add User</Link>
      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <button
                  aria-label={`Delete user ${user.name}`}
                  onClick={() => deleteUser(user.id)}
                >
                  Delete
                </button>
                <Link to={`/user/${user.id}`}>
                  <button>
                    Edit{' '}
                    <span aria-label="athena pencil" role="img">
                      ✏️
                    </span>
                  </button>
                </Link>
              </td>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Users;
