import React from 'react';
import { useTranslationContext } from '../../context/TranslationContext';
import { FormRow, Alert, FormRowSelect, TextArea } from '../../components';
import { useAppContext } from '../../context/AppContext';
import DashboardFormPageWrapper from '../../assets/wrappers/DashboardFormPageWrapper';
import { getLocalizedValue } from '../../utilities';

const AddPost = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    importance,
    classification,
    type,
    content,
    handleChange,
    clearValues,
    createPost,
    editPost,
  } = useAppContext();

  const {
    ADD_POST,
    EDIT_POST,
    CLEAR,
    SUBMIT,
    MISSING_VALUES,
    IMPORTANCE,
    CLASSIFICATION,
    TYPE,
    ALERT_POST,
    CREATED,
    UPDATED,
    TITLE,
    CONTENT,
    IMPORTANCE_LABEL,
    CLASSIFICATION_LABEL,
    TYPE_LABEL,
  } = useTranslationContext();

  const optionObjectsToStrings = ({ options = [] }) => options.map(opt => Object.values(opt)[0]);

  const handleSubmit = e => {
    e.preventDefault();

    if (!title || !content) {
      displayAlert({ message: MISSING_VALUES });
    }

    if (isEditing) {
      editPost({
        alertText: ALERT_POST(UPDATED)
      });
      return;
    }

    createPost({
      alertText: ALERT_POST(CREATED),
    });
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
            labelText={IMPORTANCE_LABEL}
            name="importance"
            value={getLocalizedValue(IMPORTANCE, importance)}
            handleChange={handlePostInput}
            options={optionObjectsToStrings({ options: IMPORTANCE })}
          />
          <FormRowSelect
            labelText={CLASSIFICATION_LABEL}
            name="classification"
            value={getLocalizedValue(CLASSIFICATION, classification)}
            handleChange={handlePostInput}
            options={optionObjectsToStrings({ options: CLASSIFICATION })}
          />
          <FormRowSelect
            labelText={TYPE_LABEL}
            name="type"
            value={getLocalizedValue(TYPE, type)}
            handleChange={handlePostInput}
            options={optionObjectsToStrings({ options: TYPE })}
          />
          <FormRow
            type="text"
            labelText={TITLE}
            name="title"
            value={title}
            handleChange={handlePostInput}
          />
          <TextArea
            name="content"
            labelText={CONTENT}
            value={content}
            handleChange={handlePostInput}
          />
          <div className="btn-container">
            <button
              type="submit"
              className="btn btn-block submit-btn"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {SUBMIT}
            </button>
            <button
              type="button"
              className="btn btn-block clear-btn"
              onClick={event => {
                // Do not submit the form when clicking the button
                event.preventDefault();
                clearValues();
              }}
            >
              {CLEAR}
            </button>
          </div>
        </div>
      </form>
    </DashboardFormPageWrapper>
  );
};

export default AddPost;
