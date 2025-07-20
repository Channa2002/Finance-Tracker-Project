import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-900 text-white z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-lime-400"></div>
    </div>
  );
};

export default Loader;