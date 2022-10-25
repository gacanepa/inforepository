import React, { useState } from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import { areInputsEmpty } from '../../utilities';
import { FormRow, Alert } from '../../components';
import { useAppContext } from '../../context/AppContext';
import DashboardFormPageWrapper from '../../assets/wrappers/DashboardFormPageWrapper';

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext();
  const {
    PROFILE,
    FIRST_NAME,
    LAST_NAME,
    SAVE_CHANGES,
    PLEASE_WAIT,
    MISSING_VALUES,
    UPDATE_USER_SUCCESS,
  } = useTranslationContext();

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
      currentUser: {
        firstName,
        lastName,
        email,
        location
      },
      alertText: UPDATE_USER_SUCCESS,
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
          <div className="btn-container">
            <button className="btn btn-block" type="submit" disabled={isLoading}>
              {isLoading ? PLEASE_WAIT : SAVE_CHANGES}
            </button>
          </div>
        </div>
      </form>
    </DashboardFormPageWrapper>
  );
};

export default Profile;
