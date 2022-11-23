import React from 'react';
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import { useTranslationContext } from '../context/TranslationContext';
import { useAppContext } from '../context/AppContext';
import PageButtonContainerWrapper from '../assets/wrappers/PageButtonContainerWrapper';

const PageButtonContainer = () => {
  const { PREV, NEXT } = useTranslationContext();
  const { numOfPages, page, changePage } = useAppContext();

  // An array of page numbers to display
  const pageNumbers = Array.from({ length: numOfPages }, (_, i) => i + 1);

  const prevPage = () => {
    let newPage = page - 1;
    if (newPage < 1) newPage = numOfPages;
    changePage(newPage);
  };

  const nextPage = () => {
    let newPage = page + 1;
    if (newPage > numOfPages) newPage = 1;
    changePage(newPage);
  };

  return (
    <PageButtonContainerWrapper>
      <button
        className="prev-btn"
        type="button"
        onClick={prevPage}
      >
        <HiChevronDoubleLeft />
        {PREV}
      </button>
      <div className="btn-container">
        {pageNumbers.map(pageNumber => (
          <button
            className={`page-btn ${pageNumber === page ? 'pageBtn active' : 'pageBtn'}`}
            type="button"
            key={pageNumber}
            onClick={() => changePage(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
      </div>
      <button
        className="next-btn"
        type="button"
        onClick={nextPage}
      >
        {NEXT}
        <HiChevronDoubleRight />
      </button>
    </PageButtonContainerWrapper>
  );
};

export default PageButtonContainer;
