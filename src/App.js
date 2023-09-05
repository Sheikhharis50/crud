import React from "react";
import "./App.css";
import "h8k-components";
import UserList from "./components/UserList";
import AddEditUser from "./components/AddEditUser";

const title = "User Management";

const App = () => {
  const initialState = { firstName: "", lastName: "", phone: "" };

  const [users, setUsers] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(initialState);

  const deleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  const editUser = (userId) => {
    setSelectedUser(users.find((user) => user.id === userId));
  };

  const addAndUpdateUser = (user) => {
    if (user?.id)
      setUsers(
        users.map((u) => {
          if (u.id === user?.id) return user;
          return u;
        })
      );
    else {
      const id = getId();
      setUsers([...users, { ...user, id }]);
    }
    onCancel();
  };

  const getId = () => {
    if (users.length) return users[users.length - 1].id + 1;
    return 1;
  };

  const onCancel = () => setSelectedUser(initialState);

  return (
    <div className="App">
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-row justify-content-center mt-100">
        <div className="w-60 mr-75">
          <UserList users={users} editUser={editUser} deleteUser={deleteUser} />
        </div>
        <div className="layout-column w-40">
          <AddEditUser
            user={selectedUser}
            addAndUpdateUser={addAndUpdateUser}
            onCancel={onCancel}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
