import React, { useEffect, useState } from 'react';
import SummarApi from '../common';
import moment from 'moment';
import displayINRCurrency from '../utils/DisplayCurrency';

const OrderPage = () => {
  const [data, setData] = useState([]);
  const [totalQty, setTotalQty] = useState(0);

  const fetchOrderDetails = async () => {
    const response = await fetch(SummarApi.getOrder.url, {
      method: SummarApi.getOrder.method,
      credentials: 'include'
    });

    const responseData = await response.json();
    setData(responseData.data);


        // Calculate total quantity
        const totalQuantity = responseData.data.reduce((acc, order) => {
          const orderQuantity = order.productDetails.reduce((orderAcc, product) => orderAcc + product.quantity, 0);
          return acc + orderQuantity;
        }, 0);
    
        setTotalQty(totalQuantity);
    
        console.log("order", responseData);
      };
    

    

  useEffect(() => {
    fetchOrderDetails()
  }, [])


  return (

    <div>
      
      {
        !data[0] && (
          <p>No Order available</p>
        )
      }

      <div className='p-4 w-full '>
      <div className='flex  px-4 gap-2 font-medium text-lg text-slate-600'>
        <p>Quantity:</p>
        <p>{totalQty}</p>
      </div>
        {
          data.map((item, index) => {
            return (
              <div key={item.userId + index} className='m-5'>
                <p className='font-medium text-lg '>{moment(item.createdAt).format('LLL')}</p>
                <div className='border rounded'>
                  <div className='flex flex-col lg:flex-row justify-between'>
                    <div className='grid gap-1'>
                      {
                        item?.productDetails.map((product, index) => {
                          return (
                            <div key={product.productId + index} className='flex  gap-3 bg-slate-100'>
                              <img
                                src={product.image?.[0]}
                                className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                              />
                              <div>
                                <div className='font-medium text-lg text-ellipsis line-clamp-1'>{product.name}</div>
                                <div className='flex items-center gap-5 mt-1'>
                                  <div className='text-lg text-red-500'>{displayINRCurrency(product.price)}</div>
                                  <p>Quantity : {product.quantity}</p>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                    <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                      <div>
                        <div className='text-lg font-medium'>Payment Details : </div>
                        <p className=' ml-1'>Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                        <p className=' ml-1'>Payment Status : {item.paymentDetails.payment_status}</p>
                      </div>
                      <div>
                        <div className='text-lg font-medium'>Shipping Details :</div>
                        {
                          item.shipping_options.map((shipping, index) => {
                            return (
                              <div key={shipping.shipping_rate} className=' ml-1'>
                                Shipping Amount : {shipping.shipping_amount}
                              </div>
                            )
                          })
                        }
                      </div>
                    </div>
                  </div>

                  <div className='font-semibold ml-auto w-fit lg:text-lg'>
                    Total Amount : {item.totalAmount}
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default OrderPage;
