import React from 'react';

const Loader: React.FC = () => {
  return (
    <div id="loading-screen" className="loading-screen">
      <div className="loading-content">
        <i className="fa-solid fa-laptop-code fa-5x main-icon" aria-hidden="true" />
        <h1 id="loading-text">MY PROFILE</h1>
        <div className="sub-icons">
          <i className="fa-brands fa-github fa-2x" aria-hidden="true" />
          <i className="fa-solid fa-code fa-2x" aria-hidden="true" />
          <i className="fa-solid fa-user fa-2x" aria-hidden="true" />
        </div>
        <h2 id="designer-text">Designed by OM</h2>
      </div>
    </div>
  );
};

export default Loader;