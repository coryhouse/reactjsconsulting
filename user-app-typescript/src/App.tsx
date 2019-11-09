import React, { useState, useEffect } from 'react';
import Home from './Home';
import Nav from './Nav';
import Users from './Users';
import ManageUser from './ManageUser';
import { Route } from 'react-router-dom';
import { User, getUsers, deleteUser, addUser, editUser } from './api/users';
import {
  InternationalizationContext,
  Language
} from './InternationalizationContext';

function App(): JSX.Element {
  const [users, setUsers] = useState<User[]>([]);
  const [language, setLanguage] = useState<Language>('English');

  useEffect(() => {
    getUsers().then(_users => setUsers(_users));
  }, []);

  async function handleDelete(id: number): Promise<void> {
    await deleteUser(id);
    const newUsers = users.filter(user => user.id !== id);
    setUsers(newUsers);
  }

  async function handleAddUser(user: Omit<User, 'id'>): Promise<void> {
    const newUser = await addUser(user);
    setUsers([...users, newUser]);
  }

  async function handleEditUser(changedUser: User): Promise<void> {
    await editUser(changedUser);
    const newUsers = users.map(user =>
      user.id === changedUser.id ? changedUser : user
    );
    setUsers(newUsers);
  }

  return (
    <InternationalizationContext.Provider value={{ language, setLanguage }}>
      <Nav />
      <Route path="/" component={Home} exact />
      <Route
        path="/users"
        render={props => <Users users={users} deleteUser={handleDelete} />}
      />
      <Route
        path="/user/:userId?"
        render={props => (
          <ManageUser
            users={users}
            onAddUser={handleAddUser}
            onEditUser={handleEditUser}
          />
        )}
      />
    </InternationalizationContext.Provider>
  );
}

export default App;
