import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5";
import SummarApi from '../common';
import { toast } from 'react-toastify';

const changeUserRole = ({
    name,
    email,
    role,
    userId,
    onClose,
    fetchAllUsers
    }) => {
    const [userRole,setUserRole]= useState(role)

    const handleOnChangeSelect = (e) =>{
        setUserRole(e.target.value)

    }

    const updateUserRole = async() =>{
        const fetchResponse = await fetch(SummarApi.updateUser.url,({
            method:SummarApi.updateUser.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body : JSON.stringify({
                userId : userId,
                role:userRole
            })
        }))

        const responseData = await fetchResponse.json()

        if(responseData.success){
            toast.success(responseData.message)
            onClose()
            fetchAllUsers()
        }
    }

    return (
        <div className='fixed w-full h-full right-0 left-0 top-0 bottom-0 z-10 flex items-center justify-center bg-slate-200 bg-opacity-50 '>
            <div className=' bg-white shadow-md p-4 w-full max-w-sm'>
                <button className='block ml-auto' onClick={onClose}>
                    <IoClose/>
                </button>
                <h1 className='pb-4 text-lg font-medium'>Change User Role</h1>
                <p>Name:{name} </p>
                <p>Email:{email} </p>
                <div className='flex justify-between items-center my-4 '>
                <p>Role</p>
                <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
                    {
                        Object.values(ROLE).map(el => {
                            return (
                                <option value={el} key={el}>{el}</option>
                            )

                        })
                    }

                </select>
                </div>
                <button className='w-fit mx-auto block  py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700 ' onClick={updateUserRole}>Change Role</button>
            </div>
        </div>
    )
}

export default changeUserRole
