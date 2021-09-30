import React, { useEffect, useState } from "react";

const Pagination = ({ list, updateList }) => {
  const [current, setCurrent] = useState(1);
  const pageSize = 4;
  const lastPage = Math.ceil(list.length / pageSize);

  useEffect(() => {
    const start = pageSize * (current - 1);
    const last = current * pageSize;

    const updatedData = list.slice(start, last);
    updateList(updatedData);
  }, [current, list]);

  const loadPrev = () => {
    if (current > 1) setCurrent(current - 1);
  };

  const loadNext = () => {
    if (current < lastPage) setCurrent(current + 1);
  };
  return (
    <div>
      <button
        className={current === 1 ? "disabled page prev" : "page prev"}
        disabled={current === 1}
        onClick={loadPrev}
      >
        {"<"}
      </button>

      <button
        className={current === 1 ? "page active" : "page"}
        disabled={current === 1}
        onClick={() => setCurrent(1)}
      >
        1
      </button>

      {current === 1 && lastPage >= 2 && (
        <button
          className="page"
          disabled={current === 2}
          onClick={() => setCurrent(2)}
        >
          2
        </button>
      )}
      {current > 2 && (
        <button className="page disabled" disabled={true}>
          ...
        </button>
      )}
      {current > 1 && current < lastPage && (
        <button className="page active" disabled={true}>
          {current}
        </button>
      )}
      {current < lastPage - 1 && (
        <button className="page disabled" disabled={true}>
          ...
        </button>
      )}
      {current === lastPage && lastPage > 2 && (
        <button
          className="page"
          disabled={current === lastPage - 1}
          onClick={() => setCurrent(lastPage - 1)}
        >
          {lastPage - 1}
        </button>
      )}
      {current !== 1 && (
        <button
          className={current === lastPage ? "page active" : "page"}
          disabled={current === lastPage}
          onClick={() => setCurrent(lastPage)}
        >
          {lastPage}
        </button>
      )}
      <button
        className={current === lastPage ? "page disabled next" : "page next"}
        disabled={current === lastPage}
        onClick={loadNext}
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
