import React from 'react';
import { FormRow, Alert, FormRowSelect } from '../../components';
import { useAppContext } from '../../context/AppContext';
import {
  ADD_POST,
  EDIT_POST,
  SUBMIT,
  MISSING_VALUES,
  IMPORTANCE,
  CLASSIFICATION,
  TYPE,
} from '../../common/constants/pages';
import DashboardFormPageWrapper from '../../assets/wrappers/DashboardFormPageWrapper';

const AddPost = () => {
  const {
    isEditing,
    showAlert,
    displayAlert,
    title,
    importance,
    classification,
    type,
    content,
    handleChange,
  } = useAppContext();

  const handleSubmit = e => {
    e.preventDefault();

    if (!title || !content) {
      displayAlert({ message: MISSING_VALUES });
    }
  };

  const handlePostInput = e => {
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  return (
    <DashboardFormPageWrapper>
      <form className="form">
        <h3>{isEditing ? EDIT_POST : ADD_POST}</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRowSelect
            labelText="importance"
            name="importance"
            value={importance}
            handleChange={handlePostInput}
            options={IMPORTANCE}
          />
          <FormRowSelect
            labelText="classification"
            name="classification"
            value={classification}
            handleChange={handlePostInput}
            options={CLASSIFICATION}
          />
          <FormRowSelect
            labelText="type"
            name="type"
            value={type}
            handleChange={handlePostInput}
            options={TYPE}
          />
          <FormRow
            type="text"
            name="title"
            value={title}
            handleChange={handlePostInput}
          />
          <FormRow
            type="text"
            name="content"
            value={content}
            handleChange={handlePostInput}
          />
          <div className="btn-container">
            <button type="submit" className="btn btn-block submit-btn" onClick={handleSubmit}>
              {SUBMIT}
            </button>
          </div>
        </div>
      </form>
    </DashboardFormPageWrapper>
  );
};

export default AddPost;
