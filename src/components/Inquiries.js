import React from 'react';
import { useSelector } from 'react-redux';

// shows an array of inquiries
const Inquiries = () => {
  const inquiries = useSelector(state => state.inquiryReducer.inquiries); // accesses the inquiries array from reducer

  return (
    <div>
      {/* Loops through received object inquiries priting out the inquiries */}
      {Object.keys(inquiries).map((keyName, i) => (
        <div className="inquiry" key={i}>{inquiries[keyName].message}</div>
      ))}
    </div>
  );
};

export default Inquiries;
