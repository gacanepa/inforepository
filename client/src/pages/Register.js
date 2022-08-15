import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Logo, FormRow } from '../components';
import RegisterPageWrapper from '../assets/wrappers/RegisterPageWrapper';
import { useAppContext } from '../context/AppContext';
import {
  ALREADY_A_MEMBER,
  LOGIN,
  NOT_A_MEMBER_YET,
  REENTER_PASSWORD,
  REGISTER,
  SUBMIT,
  MISSING_VALUES,
  PASSWORD_MISMATCH,
  CLEAR_ALERT_DELAY,
  FIRST_NAME,
  LAST_NAME,
} from '../common/constants/pages';
import { areInputsEmpty } from '../utilities';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  repassword: '',
  location: '',
  isMember: false,
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const navigate = useNavigate();

  const { user, showAlert, displayAlert, registerUser, isLoading } = useAppContext();

  const handleChange = event => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    const {
      firstName,
      lastName,
      email,
      location,
      password,
      repassword,
      isMember
    } = formData;
    if (
      (!isMember && areInputsEmpty([firstName, lastName, email, password, repassword]))
      || (isMember && areInputsEmpty([email, password]))
    ) {
      displayAlert({ message: MISSING_VALUES });
    }

    if (!isMember && password !== repassword) {
      displayAlert({ message: PASSWORD_MISMATCH });
    }

    const currentUser = { firstName, lastName, location, email, password };

    if (!isMember) {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      // Wait until clearing the alert to redirect to the dashboard
      setTimeout(() => {
        navigate('/');
      }, CLEAR_ALERT_DELAY);
    }
  }, [user, navigate]);

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
        {showAlert && <Alert />}
        {!formData.isMember && (
          <>
            <FormRow
              type="text"
              name="firstName"
              value={formData.firstName}
              handleChange={handleChange}
              labelText={FIRST_NAME}
            />
            <FormRow
              type="text"
              name="lastName"
              value={formData.lastName}
              handleChange={handleChange}
              labelText={LAST_NAME}
            />
            <FormRow
              type="text"
              name="location"
              value={formData.location}
              handleChange={handleChange}
            />
          </>
        )}
        <FormRow type="email" name="email" value={formData.email} handleChange={handleChange} />
        <FormRow
          type="password"
          name="password"
          value={formData.password}
          handleChange={handleChange}
        />
        {!formData.isMember && (
          <FormRow
            type="password"
            name="repassword"
            value={formData.repassword}
            handleChange={handleChange}
            labelText={REENTER_PASSWORD}
          />
        )}
        <button type="submit" className="btn btn-block" disabled={isLoading}>
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
