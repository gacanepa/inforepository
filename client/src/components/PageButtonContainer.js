import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useTranslationContext } from '../context/TranslationContext';
import { useAppContext } from '../context/AppContext';
import PageButtonContainerWrapper from '../assets/wrappers/PageButtonContainerWrapper';

const PageButtonContainer = () => {
  const { PREV, NEXT } = useTranslationContext();
  const { numOfPages, page } = useAppContext();

  // An array of page numbers to display
  const pageNumbers = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const prevPage = () => {
    console.log('prevPage');
  };

  const nextPage = () => {
    console.log('nextPage');
  };

  return (
    <PageButtonContainerWrapper>
      <button className="prev-btn" type="button" onClick={prevPage}>
        <HiChevronDoubleLeft />
        {PREV}
      </button>
      <div className="btn-container">
        {pageNumbers.map(pageNumber => (
          <button
            className={`page-btn ${pageNumber === page ? 'pageBtn active' : 'pageBtn'}`}
            type="button"
            key={pageNumber}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button className="next-btn" type="button" onClick={nextPage}>
        {NEXT}
        <HiChevronDoubleRight />
      </button>
    </PageButtonContainerWrapper>
  );
};

export default PageButtonContainer;
