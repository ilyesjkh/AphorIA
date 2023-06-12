// AphorismCard.js

import React from 'react';

const AphorismCard = ({ title, text, image }) => {
  return (
    <div className="max-w-md w-full p-6 bg-white rounded-xl shadow-md">
      {image && (
        <img
          src={`data:image/png;base64,${image}`}
          alt="Generated Image"
          className="mb-4 mx-auto max-h-96"
        />
      )}
      <h2 className="text-center text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-700">{text}</p>
    </div>
  );
};

export default AphorismCard;
