import {FC, useState, useEffect} from "react";
import {useParams} from "react-router-dom";

import css from './Pagination.module.css'

interface PaginationProps {
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

const Pagination: FC<PaginationProps> = ({currentPage, onPageChange}) => {
    const [totalPages, setTotalPages] = useState(1);
    const {page} = useParams();
    const handlePageClick = (pageNumber: number) => {
        onPageChange(pageNumber);
    };

    useEffect(() => {
        setTotalPages(currentPage + 10);
        if (page) {
            const pageNumber = parseInt(page, 10) || 1;
            if (pageNumber !== currentPage) {
                onPageChange(pageNumber);
            }
        }
    }, [currentPage, page, onPageChange, setTotalPages]);

    useEffect(() => {
        setTotalPages(currentPage + 10);
        if (page) {
            const pageNumber = parseInt(page, 10) || 1;
            if (pageNumber !== currentPage) {
                onPageChange(pageNumber);
            }
        }
    }, [page, currentPage, onPageChange, setTotalPages]);

    const handlePrevClick = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    return (
        <div className={css.Pagination}>
            <button onClick={handlePrevClick} disabled={currentPage === 1}>&#10094;</button>
            {Array.from({length: totalPages}, (_, index) => index + 1).map((pageNumber) => {
                const isActive = pageNumber === currentPage;
                if (pageNumber === 1 || pageNumber === totalPages || pageNumber === currentPage || Math.abs(pageNumber - currentPage) <= 2) {
                    return (
                        <button key={pageNumber} onClick={() => handlePageClick(pageNumber)}
                                style={{backgroundColor: isActive ? "#1e8300" : "", color: isActive ? "#000000" : ""}}>
                            {pageNumber}
                        </button>
                    );
                } else if ((pageNumber === 2 && currentPage >= 5) || (pageNumber === totalPages - 1 && currentPage <= totalPages - 4)) {
                    return <button key={pageNumber}>...</button>;
                }
                return null;
            })}
            <button onClick={handleNextClick} disabled={currentPage === totalPages}>&#10095;</button>
        </div>
    );
};

export {
    Pagination
};
