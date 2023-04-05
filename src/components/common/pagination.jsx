import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({totalItems, pageSize, currentPage, onPageChange}) => { 
    
    const pagesCount = Math.ceil(totalItems/pageSize);
    const pages = _.range(1, pagesCount+1);

    if (pagesCount === 1) return null;
    // if (page === currentPage) classes += ' active';
    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {pages.map(
                    page => 
                        <li key={page} className="page-item">
                            <a 
                                className={
                                page === currentPage? 
                                'page-link active':
                                'page-link'}
                                onClick={() => onPageChange(page)}
                                style={{cursor: 'pointer'}}
                            >
                                {page}
                            </a>
                        </li>
                        
                )}
            </ul>
        </nav>
    );
}
 
Pagination.propTypes = {
    totalItems: PropTypes.number.isRequired, 
    pageSize: PropTypes.number.isRequired, 
    currentPage: PropTypes.number.isRequired, 
    onPageChange: PropTypes.func.isRequired
}

export default Pagination;