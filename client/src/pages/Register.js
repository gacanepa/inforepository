import React, { useState } from 'react';
import { Alert, Logo, FormRow } from '../components';
import RegisterPageWrapper from '../assets/wrappers/RegisterPageWrapper';
import {
  ALREADY_A_MEMBER,
  LOGIN,
  NOT_A_MEMBER_YET,
  REGISTER,
  SUBMIT,
} from '../common/constants/pages';

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
  showAlert: false,
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const handleChange = event => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
  };

  const toggleMember = () => {
    setFormData(prevFormData => ({
      ...prevFormData,
      isMember: !prevFormData.isMember,
    }));
  };

  return (
    <RegisterPageWrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{formData.isMember ? LOGIN : REGISTER}</h3>
        {formData.showAlert && <Alert />}
        {!formData.isMember
          && (
            <FormRow
              type="text"
              name="name"
              value={formData.name}
              handleChange={handleChange}
            />
          )}
        <FormRow
          type="email"
          name="email"
          value={formData.email}
          handleChange={handleChange}
        />
        <FormRow
          type="password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          {SUBMIT}
        </button>
        <p>
          {formData.isMember ? NOT_A_MEMBER_YET : ALREADY_A_MEMBER}
          <button type="submit" onClick={toggleMember} className="member-btn">
            {!formData.isMember ? LOGIN : REGISTER}
          </button>
        </p>
      </form>
    </RegisterPageWrapper>
  );
};

export default Register;
