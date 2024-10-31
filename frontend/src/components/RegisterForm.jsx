import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "../axiosConfig.js";
import { stateTypes, validEmailRegex } from "../tests/constants/components.js";
import { useDispatch } from 'react-redux';
import { setNotification } from '../actions/notificationActions.jsx';
import { registerUser } from '../actions/authActions.jsx';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
  });

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name.length < 3) {
      dispatch(setNotification({ message: 'Name must be at least 3 characters long', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }
    else if (!validEmailRegex.test(formData.email)) {
      dispatch(setNotification({ message: 'Invalid email address', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }
    else if (formData.password.length < 10) {
      dispatch(setNotification({ message: 'Password must be at least 10 characters long', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }
    else if (formData.password !== formData.passwordConfirmation) {
      dispatch(setNotification({ message: 'Passwords do not match', stateType: 'auth', requestStatus: 'error' }));
      return; 
    }

    try {
      dispatch(setNotification({ message: 'Registering...', stateType: 'auth', requestStatus: 'loading' }));
      const { passwordConfirmation, ...requestData } = formData;
      await dispatch(registerUser(requestData));
  
      dispatch(setNotification({ message: 'Registration successful', stateType: 'auth', requestStatus: 'success' }));
  
      navigateTo('/login');
    }catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        dispatch(setNotification({ message: error.response.data.error, stateType: 'auth', requestStatus: 'error' }));
      } else {
        dispatch(setNotification({ message: 'An error occurred while registering. Please try again later.', stateType: 'auth', requestStatus: 'error' }));
      }
    }
  };

  return (
    <div data-testid="form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            data-testid="name-input"
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            data-testid="email-input"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            data-testid="password-input"
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Password Confirmation:</label>
          <input
            type="password"
            id="passwordConfirmation"
            name="passwordConfirmation"
            value={formData.passwordConfirmation}
            onChange={handleChange}
            data-testid="passwordConfirmation-input"
            required
          />
        </div>

        <button type="submit" data-testid="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
