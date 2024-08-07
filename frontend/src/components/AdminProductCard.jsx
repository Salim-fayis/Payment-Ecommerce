import React, { useState } from 'react'
import { MdEdit } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../utils/DisplayCurrency';

const AdminProductCard = ({ data, fetchAllProduct }) => {

    const [editProduct, setEditProduct] = useState(false)

    return (
        <div className='bg-white p-4 rounded '>
            <div className='w-40 '>
                <div className='w-32 h-32 flex justify-center items-center'>
                    <img src={data?.productImage[0]} className='mx-auto object-fill h-full' />
                </div >
                <div >
                <h1 className='trunicate text-ellipsis line-clamp-1'>{data.productName}</h1>
                </div>
                
                <div>
                    <p className='font-semibold'>
                        {
                            displayINRCurrency(data.sellingPrice)
                        }

                    </p>
                    <div className='w-fit ml-auto bg-green-100 p-2 hover:bg-green-600 rounded-full hover:text-white cursor-pointer ' onClick={() => setEditProduct(true)} >
                        <MdEdit />
                    </div>
                </div>

            </div>
            {
                editProduct && (
                    <AdminEditProduct productData={data} onClose={() => setEditProduct(false)} fetchAllProduct={fetchAllProduct} />
                )
            }



        </div>
    )
}

export default AdminProductCard
