import React from "react";

const NoteTabs = function ({ changeHandler, activeTab }) {
  return (
    <div className="notes-page__tabs _tabs">
      <button
        type="button"
        onClick={() => changeHandler(2)}
        className={`_tabs__item _tabs__item--important ${activeTab === 2 ? "_tabs__item--active" : ""}`}
      >
        Important
      </button>
      <button
        type="button"
        onClick={() => changeHandler(1)}
        className={`_tabs__item _tabs__item--medium ${activeTab === 1 ? "_tabs__item--active" : ""}`}
      >
        Medium priority
      </button>
      <button
        type="button"
        onClick={() => changeHandler(0)}
        className={`_tabs__item _tabs__item--low ${activeTab === 0 ? "_tabs__item--active" : ""}`}
      >
        Low priority
      </button>
      <button
        type="button"
        onClick={() => changeHandler(3)}
        className={`_tabs__item ${activeTab === 3 ? "_tabs__item--active" : ""}`}
      >
        Show All
      </button>
    </div>
  );
};

export default NoteTabs;
