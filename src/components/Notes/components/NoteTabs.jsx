import React from "react";

const NoteTabs = function ({ changeHandler, activeTab }) {
  return (
    <div className="notes-page__tabs notes-tabs">
      <button
        type="button"
        onClick={() => changeHandler(2)}
        className={`notes-tabs__item notes-tabs__item--important ${activeTab === 2 ? "notes-tabs__item--active" : ""}`}
      >
        Important
      </button>
      <button
        type="button"
        onClick={() => changeHandler(1)}
        className={`notes-tabs__item notes-tabs__item--medium ${activeTab === 1 ? "notes-tabs__item--active" : ""}`}
      >
        Medium priority
      </button>
      <button
        type="button"
        onClick={() => changeHandler(0)}
        className={`notes-tabs__item notes-tabs__item--low ${activeTab === 0 ? "notes-tabs__item--active" : ""}`}
      >
        Low priority
      </button>
      <button
        type="button"
        onClick={() => changeHandler(3)}
        className={`notes-tabs__item ${activeTab === 3 ? "notes-tabs__item--active" : ""}`}
      >
        Show All
      </button>
    </div>
  );
};

export default NoteTabs;
