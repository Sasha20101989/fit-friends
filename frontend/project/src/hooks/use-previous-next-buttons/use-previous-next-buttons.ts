import { useState } from 'react';

export function usePreviousNextButtons(initialPage: number, setPage: (value: React.SetStateAction<number>) => void) {
  const [currentPage, setCurrentPage] = useState(initialPage);

  const updatePage = (updateFunction: (prevPage: number) => number) => {
    setPage((prevPage) => {
      const updatedPage = updateFunction(prevPage);
      setCurrentPage(updatedPage);
      return updatedPage;
    });
  };

  const handlePreviousClick = () => {
    updatePage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    updatePage((prevPage) => prevPage + 1);
  };

  return {
    currentPage,
    handlePreviousClick,
    handleNextClick,
  };
}
