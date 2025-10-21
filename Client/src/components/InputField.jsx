import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { far } from "@fortawesome/free-regular-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";

library.add(fas, far, fab);

const InputField = ({
  placeholder,
  name,
  rules,
  type = "text",
  register,
  errors,
}) => {
  const [showpass, setpass] = useState(false);
  const inputType = type === "password" && showpass ? "text" : type;

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="w-full text-sm flex justify-between">
          <span className="font-medium">{placeholder}</span>
          <span className="text-red-500 text-xs">{errors[name]?.message}</span>
        </div>
        <div className="flex items-center relative w-full">
          <input
            className="w-full p-2 pr-10 rounded-md border-2 border-gray-300 hover:border-blue-300 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
            type={inputType}
            placeholder={placeholder}
            {...register(name, rules)}
          />
          {type === "password" && (
            <button
              type="button"
              className="absolute right-3 p-1 text-gray-600 hover:text-gray-800 transition-colors"
              onClick={() => setpass(!showpass)}
            >
              <FontAwesomeIcon
                icon={showpass ? ["fas", "eye-slash"] : ["fas", "eye"]}
                className="w-4 h-4"
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputField;
