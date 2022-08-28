import React, { useState } from 'react';
import {
  PROFILE,
  FIRST_NAME,
  LAST_NAME,
  SAVE_CHANGES,
  PLEASE_WAIT,
  MISSING_VALUES,
} from '../../common/constants/pages';
import { areInputsEmpty } from '../../utilities';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/AppContext';
import DashboardFormPageWrapper from '../../assets/wrappers/DashboardFormPageWrapper';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();

  // Setting up the form data as separate state variables because they are part of the user object
  // firstName, lastName, and email are required fields
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  // Location is optional, hence the need for the optional chaining
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = e => {
    e.preventDefault();
    if (areInputsEmpty([firstName, lastName, email])) {
      displayAlert({ message: MISSING_VALUES });
      return;
    }
    updateUser({
      firstName,
      lastName,
      email,
      location,
    });
  };

  return (
    <DashboardFormPageWrapper>
      <form className="form" onSubmit={handleSubmit}>
        <h3>{PROFILE}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            labelText={FIRST_NAME}
            value={firstName}
            handleChange={e => setFirstName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText={LAST_NAME}
            value={lastName}
            handleChange={e => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={e => setEmail(e.target.value)}
          />
          <FormRow
            type="text"
            name="location"
            value={location}
            handleChange={e => setLocation(e.target.value)}
          />
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            { isLoading ? PLEASE_WAIT : SAVE_CHANGES }
          </button>
        </div>
      </form>
    </DashboardFormPageWrapper>
  );
};

export default Profile;
