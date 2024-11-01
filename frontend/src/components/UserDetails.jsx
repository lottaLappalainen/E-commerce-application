import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate, useParams } from 'react-router-dom';
import { deleteUser } from '../actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';

const UserDetails = () => {
  const {userId} = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState(null); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`); //
        setUser(response.data); 
      } catch (error) {
        setError(error.response.data.message); 
      }
    };

    fetchUser(); 
  }, [userId]);

  if (error) {
    return <div>{error}</div>; 
  }

  if (!user) {
    return <div>Loading...</div>; 
  }

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
      <button data-testid="modify" onClick={() => navigateTo(`/users/${user.id}/modify`)}>Modify</button>
      <button data-testid="delete" onClick={() => handleDelete(user.id)}>Delete</button>
    </div>
  );
};

export default UserDetails;
