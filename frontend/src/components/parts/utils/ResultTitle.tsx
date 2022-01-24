import React from 'react';

const ResultTitle = ({ text, resultText, amt }: { text: string, resultText: string, amt: number }) => {
  return(
    <h1 className="results__title"> {text} |  
        <span className="txt--muted txt--small"> { amt } { resultText }(s)</span>
    </h1>
  )
};

export default ResultTitle;
