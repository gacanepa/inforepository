import React from 'react';
import FormRow from './FormRow';
import FormRowSelect from './FormRowSelect';
import { useAppContext } from '../context/AppContext';
import SearchContainerWrapper from '../assets/wrappers/SearchContainerWrapper';
import { useTranslationContext } from '../context/TranslationContext';

const SearchContainer = () => {
  const {
    isLoading,
    search,
    searchClassification,
    classificationOptions,
    searchImportance,
    importanceOptions,
    searchType,
    sortOptions,
    typeOptions,
    handleChange,
    clearFilters,
    sort,
  } = useAppContext();

  const {
    IMPORTANCE_LABEL,
    CLASSIFICATION_LABEL,
    TYPE_LABEL,
    SEARCH_FORM,
    SEARCH_LABEL,
    SORT_LABEL,
    CLEAR_FILTERS,
  } = useTranslationContext();

  const handleSearch = e => {
    if (isLoading) return;
    const { name, value } = e.target;
    handleChange({ name, value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    clearFilters();
  };

  return (
    <SearchContainerWrapper>
      <h4>{SEARCH_FORM}</h4>
      <form className="form-center">
        <FormRow
          type="text"
          labelText={SEARCH_LABEL}
          name="search"
          value={search}
          handleChange={handleSearch}
        />
        <FormRowSelect
          labelText={IMPORTANCE_LABEL}
          name="searchImportance"
          value={searchImportance}
          options={importanceOptions}
          handleChange={handleSearch}
        />
        <FormRowSelect
          labelText={CLASSIFICATION_LABEL}
          name="searchClassification"
          value={searchClassification}
          options={classificationOptions}
          handleChange={handleSearch}
        />
        <FormRowSelect
          labelText={TYPE_LABEL}
          name="searchType"
          value={searchType}
          options={typeOptions}
          handleChange={handleSearch}
        />
        <FormRowSelect
          labelText={SORT_LABEL}
          name="sort"
          value={sort}
          options={sortOptions}
          handleChange={handleSearch}
        />
        <button
          type="button"
          className="btn btn-block clear-btn"
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {CLEAR_FILTERS}
        </button>
      </form>
    </SearchContainerWrapper>
  );
};

export default SearchContainer;
