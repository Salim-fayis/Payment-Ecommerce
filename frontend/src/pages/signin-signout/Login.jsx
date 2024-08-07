import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginlogo from '../../assets/login-logo.gif';
import InputField from './InputField';
import SummarApi from '../../common';
import { toast } from 'react-toastify';
import { useContext } from 'react';
import Context from '../../context';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [data, setData] = useState({
         email: "", 
         password: "" 
        });

        const navigate = useNavigate()
        const {fetchUserDetails , fetchUserAddToCart} = useContext(Context)


        const handleOnChange = (e) =>{
            const { name , value } = e.target
    
            setData((preve)=>{
                return{
                    ...preve,
                    [name] : value
                }
            })
        }

        const handleSubmit = async(e) =>{
            e.preventDefault()
    
            const dataResponse = await fetch(SummarApi.signIn.url,{
                method : SummarApi.signIn.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify(data)
            })
    
            const dataApi = await dataResponse.json()
    
            if(dataApi.success){
                toast.success(dataApi.message)
                navigate('/')
                fetchUserDetails()
                fetchUserAddToCart()
              
            }
    
            if(dataApi.error){
                toast.error(dataApi.message)
            }
    
        }
    
        console.log("data login",data)

    return (
        <section id='login' className='flex justify-center items-center   bg-gray-100'>
            <div className="bg-white p-6 w-full mx-5 max-w-sm rounded shadow-md my-11">
                <div className='w-20 h-20 mx-auto '>
                    <img src={loginlogo} alt="login-logo" />
                </div>
                <form onSubmit={handleSubmit}>
                    <InputField
                        label="Email"
                        type="email"
                        name="email"
                        value={data.email}
                        onChange={handleOnChange}
                    />
                    <InputField
                        label="Password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={data.password}
                        onChange={handleOnChange}
                        showPasswordToggle={() => setShowPassword(!showPassword)}
                    />
                    <Link to='/forgot-password' className='block text-black w-fit ml-auto hover:underline hover:text-red-500 mb-4'>Forgot password?</Link>
                    <button  className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 w-full rounded-full hover:scale-105 transition-transform'>Login</button>
                </form>
                <p className='mt-4'>Don't have an account? <Link to="/sign-up" className='text-red-500 hover:text-red-700 hover:underline'>Sign up</Link></p>
            </div>
        </section>
    );
};

export default Login;
