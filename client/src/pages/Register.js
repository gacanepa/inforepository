import React, { useState } from 'react';
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
} from '../common/constants/pages';
import areInputsEmpty from '../utilities/areInputsEmpty';

const initialState = {
  name: '',
  email: '',
  password: '',
  repassword: '',
  isMember: false,
};

const Register = () => {
  const [formData, setFormData] = useState(initialState);

  const { showAlert, displayAlert } = useAppContext();

  const handleChange = event => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const onSubmit = event => {
    event.preventDefault();
    const { name, email, password, repassword, isMember } = formData;
    if (
      (!isMember && areInputsEmpty([name, email, password, repassword]))
      || (isMember && areInputsEmpty([email, password]))
    ) {
      displayAlert({ message: MISSING_VALUES });
    }

    if (!isMember && password !== repassword) {
      displayAlert({ message: PASSWORD_MISMATCH });
    }
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
        {showAlert && <Alert />}
        {!formData.isMember && (
          <FormRow type="text" name="name" value={formData.name} handleChange={handleChange} />
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
