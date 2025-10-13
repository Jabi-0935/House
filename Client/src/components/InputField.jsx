import React from "react";

const InputField = ({ head, message,type }) => {
  return (
    <>
      <div className="flex flex-col bg-amber-200">
        <div className="headers flex justify-between">
          <span>{head}</span>
          <span>{message}</span>
        </div>
        <input
          className="rounded-md border-2 "
          type={type}
          placeholder={head}
          
        />
      </div>
    </>
  );
};

export default InputField;
