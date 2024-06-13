import React from "react";

const Filter = ({ title, options }) => (
  <div className="mb-4">
    <h3 className="font-bold mb-2">{title}</h3>
    {options.map((option) => (
      <label key={option} className="block mb-2">
        <input type="checkbox" className="mr-2" />
        {option}
      </label>
    ))}
  </div>
);

export default Filter;
