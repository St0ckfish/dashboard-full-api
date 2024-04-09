import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { Link, useParams } from 'react-router-dom'; // Import useParams hook

const OrderPreview = () => {
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { OrderId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/delivery/order/${OrderId}`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        Accept: 'application/json', // Assuming JSON response
                        'Accept-Language': 'en' // Set language preference to English
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                console.log(productData);
                // console.log('Authorization token:', Authurization);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors gracefully (e.g., display an error message)
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);
    return (
        <>
            <div>
                <NavBar />
                <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>
                    {isLoading ? (
                        <p>Loading product details...</p>
                    ) : productData && productData.data !== null ? (
                        // Display fetched product details
                        
                        <div className='grid gap-6 flex-wrap'>
                            {productData.data.order.orderItems.map((product) => (
                                <div className=' justify-center text-center max-[1700px]:text-center bg-[#1F2937]  max-[1815px]:translate-y-20 px-7 py-2 items-center flex flex-wrap translate-y-28 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24   rounded-xl border border-[#41434d] shadow-[#2c4157]  shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px]  max-[1130px]:translate-x-[400px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'
                                    key={product.productId}>
                                    <div className=''>
                                        <div className='flex items-center gap-3 mb-2 justify-center'>
                                            <img src={product.pictureUrl} className='w-[300px]' alt="" />
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <h1 className=' text-gray-300'> {product.productName}</h1>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span className='font-bold text-[20px]'>ID: </span>
                                            <h3 className='text-gray-300'>{product.productId}</h3>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span className='font-bold text-[20px]'>Price: </span>
                                            <h2 className='text-gray-300'>{product.unitPrice}</h2>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span className='font-bold text-[20px]'>Quantity: </span>
                                            <h2 className='text-gray-300'>{product.quantity}</h2>
                                        </div>
                                        <div className='flex items-center gap-3'>
                                            <span className='font-bold text-[20px]'>Total Price: </span>
                                            <h2 className='text-gray-300'>{product.totalPrice}</h2>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    ) : (
                        <p>No product data found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default OrderPreview;