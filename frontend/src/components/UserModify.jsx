import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { modifyUser } from '../actions/usersActions';
import { useNavigate, useParams } from 'react-router-dom';

const UserModify = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({
    name: '',
    role: '',
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/users/${userId}`); 
        setUser(response.data); 
        setFormData({
          name: response.data.name,
          role: response.data.role,
        }); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData)
    dispatch(modifyUser(formData));
    navigate(-1); 
  };

  if (!user) {
    return <div>Loading...</div>; 
  }

  return (
    <div data-testid="form-container">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <select
        name="role"
        value={formData.role}
        onChange={handleChange}
      >
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" onClick={handleSubmit}>Submit</button>
      <button onClick={() => navigate(-1)}>Cancel</button>
    </div>
  );
};

export default UserModify;
