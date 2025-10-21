import React, { useState } from 'react';

const Radio = ({ register, name = "userType", errors }) => {
  const [selectedValue, setSelectedValue] = useState("owner");

  return (
    <div className="flex">
      <div className="relative flex bg-white shadow-lg p-1 rounded-xl">
        {/* Owner Radio */}
        <input
          id="radio-owner"
          type="radio"
          value="owner"
          className="hidden"
          {...register(name, { required: "Please select user type" })}
          onChange={(e) => setSelectedValue(e.target.value)}
          defaultChecked
        />
        <label
          htmlFor="radio-owner"
          className={`flex items-center justify-center h-6 w-20 text-sm font-medium rounded-lg cursor-pointer transition-all duration-150 z-10 ${
            selectedValue === "owner" 
              ? "text-blue-600 bg-blue-100" 
              : "text-black hover:text-blue-600"
          }`}
        >
          Owner
        </label>

        {/* Tenant Radio */}
        <input
          id="radio-tenant"
          type="radio"
          value="tenant"
          className="hidden"
          {...register(name)}
          onChange={(e) => setSelectedValue(e.target.value)}
        />
        <label
          htmlFor="radio-tenant"
          className={`flex items-center justify-center h-6 w-20 text-sm font-medium rounded-lg cursor-pointer transition-all duration-150 z-10 ${
            selectedValue === "tenant" 
              ? "text-blue-600 bg-blue-100" 
              : "text-black hover:text-blue-600"
          }`}
        >
          Tenant
        </label>

        {/* Glider */}
        <div
          className={`absolute top-1 h-6 w-20 bg-blue-100 rounded-lg transition-transform duration-150 ease-out z-0 ${
            selectedValue === "tenant" ? "translate-x-full" : "translate-x-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Radio;