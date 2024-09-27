import React from 'react';

const ResultDisplay = ({ result }) => {
  if (!result) return null;

  return (
    <div>
      <h3>Recognition Result:</h3>
      <p>{result}</p>
    </div>
  );
};

export default ResultDisplay;
