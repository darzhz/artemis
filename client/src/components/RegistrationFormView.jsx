import React from 'react';
import Modal from './Modal';
const RegistrationFormView = ({ formData, handleChange, handleSubmit, status }) => {
  return (
    <div>
      <form onSubmit={handleSubmit} >
        {status=='ok' && <Modal mesg={"registration Successful"}/>}
      <div className="mb-4">
          {formData.profilePic && (
            <img
              src={URL.createObjectURL(formData.profilePic)}
              alt="Profile Preview"
              className="w-20 h-20 mb-4 object-cover rounded-full mx-auto"
            />
          )}
          <label className="text-sm font-bold mb-2" htmlFor="profilePic">
            <span className="label-text text-center">Profile Picture</span>
          </label>
          <input
            type="file"
            name="profilePic"
            id="profilePic"
            accept="image/*"
            onChange={handleChange}
            className="mb-2 text-xs"
          />
        </div>
        <div className="mb-2">
          <label className="label" htmlFor="username">
            <span className='label-text'>Name</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            id="username"
            type="text"
            name="username"
            placeholder="Type here"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="type" className="label"><span className="label-text">User Type</span></label>
            <select name="type" id="type" className='mx-auto input input-bordered w-full max-w-xs' value={formData.type} onChange={handleChange}>
            <option value="student" >Student</option>
            <option value="faculty">Faculty</option>
            <option value="HOD">Head of Department</option>
            <option value="Admin">Admin</option>
            </select>
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="email">
            <span className='label-text'>email</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            id="email"
            type="email"
            name="email"
            placeholder="Type here"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="label" htmlFor="password">
          <span className='label-text'>password</span>
          </label>
          <input
            className="input input-bordered w-full max-w-xs"
            id="password"
            type="password"
            name="password"
            placeholder="Type here"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationFormView;
