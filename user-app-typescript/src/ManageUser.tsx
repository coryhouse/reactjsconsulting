import React, { useState, useEffect } from 'react';
import { User } from './api/users';
import { Redirect, useRouteMatch } from 'react-router-dom';
import Input from './Input';

// Our input here could be a new user with no ID, so let's copypasta some stackoverflow
//stackoverflow.com/questions/43159887/make-a-single-property-optional-in-typescript
type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
type InputUser = PartialBy<User, 'id'>;

// And a function to distinguish add from edit users
function isEditableUser(user: InputUser | User): user is User {
  return typeof user.id === 'number';
}

interface ManageUserProps {
  users: User[];
  onAddUser: (user: Omit<User, 'id'>) => Promise<void>;
  onEditUser: (user: User) => Promise<void>;
}
const ManageUser: React.FC<ManageUserProps> = ({
  users,
  onAddUser,
  onEditUser
}) => {
  const match = useRouteMatch<{ userId: string }>(); // info about the matching URL
  const userId = match ? match.params.userId : undefined;

  const [user, setUser] = useState<InputUser>({ name: '', email: '' });
  const [saveCompleted, setSaveCompleted] = useState(false);

  useEffect(() => {
    if (userId) {
      const userToEdit = users.find(user => user.id === parseInt(userId, 10));
      if (userToEdit) {
        setUser(userToEdit);
      } else {
        // TODO show 404 if the userId doesn't exist
      }
    }
  }, [users, userId]);

  async function handleSubmit(event: React.FormEvent): Promise<void> {
    event.preventDefault(); // Stop browser from posting
    // Make sure we have email/name set
    if (!user.email || !user.name) {
      return;
    }
    isEditableUser(user) ? await onEditUser(user) : await onAddUser(user);
    setSaveCompleted(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setUser({ ...user, [event.target.id]: event.target.value });
  }

  const actionLabel = userId ? 'Edit' : 'Add';
  return (
    <>
      {saveCompleted && <Redirect to="/users" />}
      <h1>{actionLabel} User</h1>
      <form onSubmit={handleSubmit}>
        <Input
          id="name"
          label="Name"
          value={user.name}
          onChange={handleChange}
        />
        <Input
          id="email"
          label="Email"
          type="email"
          value={user.email}
          onChange={handleChange}
        />
        <input type="submit" value={`${actionLabel} User`} />
      </form>
    </>
  );
};

export default ManageUser;
