import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import loginlogo from '../../assets/login-logo.gif';
import InputField from './InputField';
import ImageToBase64 from '../../utils/ImageToBase64';
import SummarApi from '../../common';
import { toast } from 'react-toastify';

const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        Confirmpassword: "",
        profilePicture: ""
    });

    const navigate = useNavigate()

    const handleOnChange = (e) =>{
        const { name , value } = e.target
  
        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (data.password === data.Confirmpassword) {
            const dataBackendApi = await fetch(SummarApi.signUp.url, {
                method: SummarApi.signUp.method,
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataBackendApi.json()


            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }
            if (dataApi.error) {
                toast.error(dataApi.message)
            }
        } else {
            toast.error("Please check password and confirm password")
        }
    }



    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]
        
        const imagePic = await ImageToBase64(file)
        
        setData((preve)=>{
          return{
            ...preve,
            profilePicture : imagePic
          }
        })
    
      }

    return (
        <section id='signup' className='flex justify-center items-center   bg-gray-100'>
            <div className="bg-white p-6 w-full mx-5 max-w-sm rounded shadow-md my-11">
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                    <div >
                        <img src={data.profilePicture || loginlogo} alt="login-logo" />
                    </div>
                    <form>
                        <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                Upload Photo
                            </div>
                            <input type="file" className='hidden' onChange={handleUploadPic} />
                        </label>

                    </form>
                </div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Name"
                        type="text"
                        name="name"
                        required
                        value={data.name}
                        onChange={handleOnChange}
                    />
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        required
                        value={data.email}
                        onChange={handleOnChange}
                    />
                    <InputField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        required
                        value={data.password}
                        onChange={handleOnChange}
                        showPasswordToggle={() => setShowPassword(!showPassword)}
                    />
                    <InputField
                        label="Confirm Password"
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="Confirmpassword"
                        required
                        value={data.Confirmpassword}
                        onChange={handleOnChange}
                        showPasswordToggle={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                    <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full hover:scale-105 transition-transform'>Sign up</button>
                </form>
                <p className='mt-4'>Already have an account? <Link to="/login" className='text-red-500 hover:text-red-700 hover:underline'>Login</Link></p>
            </div>
        </section>
    ) 
}

export default SignUp
