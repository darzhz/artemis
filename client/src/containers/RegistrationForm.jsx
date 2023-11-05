import React, { useState } from 'react';
import RegistrationFormView from '../components/RegistrationFormView';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: null, // To store the selected profile picture
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'file') {
      const file = e.target.files[0];
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (async (e) => {
    e.preventDefault();
    console.log(formData)
    const formDataToSend = new FormData();
    formDataToSend.append('username', formData.username);
    formDataToSend.append('email', formData.email);
    formDataToSend.append('password', formData.password);
    formDataToSend.append('profilePic', formData.profilePic);

    try {
      const response = await fetch('/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Registration was successful
        // You can redirect or show a success message
      } else {
        // Registration failed, handle errors
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle network errors
    }
  });

  return (
    <RegistrationFormView
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default RegistrationForm;
