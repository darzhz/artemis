import React, { useState } from 'react';
import RegistrationFormView from '../components/RegistrationFormView';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    type: 'Student',
    profilePic: null, 
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
    formDataToSend.append('type',formData.type)

    try {
      const response = await fetch('/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        // Reg success
      } else {
        // Reg failed,
      }
    } catch (error) {
      console.error('Error:', error)
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
