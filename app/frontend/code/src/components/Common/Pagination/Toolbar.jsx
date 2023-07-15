import React from "react";
import { Link } from "react-router-dom";

function Toolbar({ pagination, callbackPrev, callbackNext }) {
  const { page, total, prevPage, nextPage, limit } = pagination;
  const isLast = page === total;
  const isFirst = page === 1;
  
  if (total < 2) {
    return false;
  }

  return (
    <div className="pagination">
      {/* prev */}
      {!isFirst && prevPage && (
        <div style={{ display: "contents" }}>
          <Link
            className="pagination-item pagination-item--next"
            onClick={callbackPrev}
            to={`?page=${prevPage}&limit=${limit}`}
          >
            {"<"}
          </Link>
          <Link className="pagination-item" onClick={callbackPrev} to={`?page=${prevPage}&limit=${limit}`}>
            {prevPage}
          </Link>
        </div>
      )}

      {/* current */}
      <div className="pagination-item pagination-item--current">{page}</div>

      {/* next */}
      {!isLast && nextPage && (
        <div style={{ display: "contents" }}>
          <Link
            className="pagination-item pagination-item--next"
            onClick={callbackNext}
            to={`?page=${nextPage}&limit=${limit}`}
          >
            {nextPage}
          </Link>
          <Link
            className="pagination-item pagination-item--next"
            onClick={callbackNext}
            to={`?page=${nextPage}&limit=${limit}`}
          >
            {">"}
          </Link>
        </div>
      )}
    </div>
  );
}

export default Toolbar;
