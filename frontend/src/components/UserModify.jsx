import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modifyUser } from '../actions/usersActions'; 
import { useNavigate, useParams } from 'react-router-dom';

const UserModify = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.users.user);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        role: user.role,
      });
    }
  }, [user]); 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(modifyUser(formData, userId)); 
    navigate(-1); 
  };

  return (
    <div data-testid="form-container">
      <h3 data-testid="name-value">{formData.name}</h3> 
      <form onSubmit={handleSubmit}>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          data-testid="role-select"
        >
          <option value="customer">Customer</option>
          <option value="admin">Admin</option>
        </select>
        <button 
          type="submit" 
          data-testid="submit"
          disabled={formData.role === user.role} 
        >
          Submit
        </button>
        <button 
          type="button" 
          onClick={() => navigate(-1)} 
          data-testid="cancel"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default UserModify;
