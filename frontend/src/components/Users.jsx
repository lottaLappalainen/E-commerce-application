import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, deleteUser, fetchUser } from '../actions/usersActions'; 
import { Link, useNavigate } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector(state => state.users);
  const navigateTo = useNavigate();

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId)); 
    }
  };

  const handleInspect = (userId) => {
    dispatch(fetchUser(userId)); 
    navigateTo(`/users/${userId}`); 
  };

  const handleModify = (userId) => {
    dispatch(fetchUser(userId)); 
    navigateTo(`/users/${userId}/modify`); 
  };

  return (
    <div data-testid="main-container">
      {users.length === 0 ? (
        <div data-testid="empty-container">No users exist</div>
      ) : (
        <ul>
          {users.users.map(user => (
            <li key={user.id} data-testid={`list-item-${user.id}-container`}>
              <h3 data-testid="name-value">{user.name}</h3>
              <p data-testid="role-value">{user.role}</p>
              <button data-testid="inspect" onClick={() => handleInspect(user.id)}>Inspect</button>
              <button data-testid="modify" onClick={() => handleModify(user.id)}>Modify</button>
              <button data-testid="delete" onClick={() => handleDelete(user.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Users;
