import React from 'react'
import { IoMdEye, IoMdEyeOff } from "react-icons/io";


const InputField = ({ label, type, name, value, onChange, showPasswordToggle,required }) => {
  return (
   
        <div className='grid mb-4'>
            <label className='mb-2'>{label} :</label>
            <div className={`bg-slate-100 p-2 ${showPasswordToggle ? 'flex' : ''}`}>
                <input
                    type={type}
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                    placeholder={`Enter the ${label.toLowerCase()}`}
                    className='w-full h-full outline-none bg-transparent'
                />
                {showPasswordToggle && (
                    <div
                        className='cursor-pointer text-xl'
                        onClick={showPasswordToggle}
                    >
                        {type === 'password' ? <IoMdEyeOff /> : <IoMdEye />}
                    </div>
                )}
            </div>
        </div>
    );
}

export default InputField
