import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';

const UserDetails = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const currentUserId = useSelector(state => state.auth.id); 

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(userId)); 
      navigateTo('/users');
    }
  };

  return (
    <div data-testid="inspect-container">
      <h3 data-testid="name-value">{user.name}</h3>
      <p data-testid="role-value">{user.role}</p>
      <p data-testid="email-value">{user.email}</p>
      <button 
        data-testid="modify" 
        onClick={() => navigateTo(`/users/${user.id}/modify`)} 
        disabled={user.id === currentUserId} 
      >
        Modify
      </button>
      <button 
        data-testid="delete" 
        onClick={() => handleDelete(user.id)} 
        disabled={user.id === currentUserId} 
      >
        Delete
      </button>
    </div>
  );
};

export default UserDetails;
