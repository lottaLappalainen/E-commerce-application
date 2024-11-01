import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, deleteUser } from '../actions/usersActions';

const UserDetails = () => {
  const { userId } = useParams();
  const navigateTo = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.users.user);
  const currentUserId = useSelector(state => state.auth.id);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      await dispatch(fetchUser(userId));
      setLoading(false);
    };
    fetchUserDetails();
  }, [dispatch, userId]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await dispatch(deleteUser(userId));
      navigateTo('/users');
    }
  };

  if (loading) return <p>Loading...</p>;

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
        onClick={handleDelete}
        disabled={user.id === currentUserId}
      >
        Delete
      </button>
    </div>
  );
};

export default UserDetails;
