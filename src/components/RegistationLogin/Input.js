import React from "react";
const Input = ({ type, name, value, onChange, placeholder, Icon }) => {
  return (
    <div className="relative flex items-center">
      <input
        type={type}
        autoComplete="off"
        value={value}
        onChange={onChange}
        name={name}
        className="peer px-4 py-3 w-full border border-gray-300 text-gray-900 
  placeholder-transparent focus:outline-none focus:border-primaryColor rounded-lg 
   placeholder:text-3xl"
        placeholder={placeholder}
      />
      <label
        htmlFor={name}
        className="absolute left-3 -top-4 text-gray-600 text-sm transition-all 
  peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 
  peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-gray-600 
  peer-focus:text-base bg-white"
      >
        {placeholder}
        <span className=" text-red-700 ml-1 text-xl">*</span>
      </label>

      <Icon className="absolute right-4 text-gray-500 text-[1.2rem] cursor-pointer" />
    </div>
  );
};

export default Input;
