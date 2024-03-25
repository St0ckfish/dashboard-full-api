import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { Authurization } from '../api/Api';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AllCoupons = () => {
    const [productData, setProductData] = useState(null);
    const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const retrievedToken = localStorage.getItem('myAuthorizationToken');
        if (retrievedToken) {
            setAuthorizationToken(retrievedToken);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v2/admin/coupon/all`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        Accept: 'application/json', // Assuming JSON response
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                console.log(productData);
                console.log('Authorization token:', Authurization);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);


    const handleProductStatusChange = async (productId, currentStatus) => {
        const newStatus = currentStatus === 'Revoke' ? 'activate' : 'deactivate';
        const apiEndpoint = `https://api.vitaparapharma.com/api/v2/admin/coupon/revoke/${productId}`;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'DELETE', // Use POST for status updates
                headers: {
                    Authorization: `Bearer ${Authurization}`,

                }
            });
console.log(response);
            if (!response.ok) {
                console.error('Error updating product status:', response);
                // Handle errors gracefully (e.g., display an error message)
            } else {
                // Update product data locally (assuming success)
                setProductData(prevState => ({
                    ...prevState,
                    data: {
                        coupons: prevState.data.coupons.map(product =>
                            product.code === productId ? { ...product, status: newStatus } : product
                        )
                    }
                }));
            }
        } catch (error) {
            console.error('Error updating product status:', error);
            // Handle errors gracefully
        }
    };
    return (  
        <>
        <div>
            <NavBar/>
            <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>
                    <div className=''>
                        {isLoading ? (
                            <p>Loading product details...</p>
                        ) : productData && productData.data.coupons !== null ? (
                            // Display fetched product details
                            <div className='grid gap-6 '>
                                {productData.data.coupons.map((product) => (
                                    <div className=' justify-center text-left max-[1700px]:text-center bg-[#1F2937] w-[1400px] max-[1815px]:translate-y-20 px-7 py-2 items-center grid grid-cols-2 translate-y-28 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px] max-[1266px]:w-[850px] max-[1130px]:translate-x-[400px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'
                                        key={product.code}>
                                        <div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Code: </span>
                                                <h1 className=' text-gray-300'> {product.code}</h1>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Product ID: </span>
                                                <h3 className='text-gray-300'>{product.productId}</h3>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Discount: </span>
                                                <h2 className='text-gray-300'>{product.discount}</h2>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Amount: </span>
                                                <h2 className='text-gray-300'>{product.amount}</h2>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Creation Date: </span>
                                                <h2 className='text-gray-300'>{product.creation.slice(0,19)}</h2>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Expiration Date: </span>
                                                <h2 className='text-gray-300'>{product.expiration}</h2>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Coupon Type: </span>
                                                <h2 className='text-gray-300'>{product.couponType}</h2>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Discount Type: </span>
                                                <h2 className='text-gray-300'>{product.discountType}</h2>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>IS Revoked: </span>
                                                <h2 className='text-gray-300'>{product.revoked?"Yes":"No"}</h2>
                                            </div>
                                        </div>
                                        <div className='grid justify-end  gap-3'>
                                        {!product.revoked?
                                            <div className='flex justify-center'>
                                                <button className='px-3 py-1 rounded-md bg-green-600 text-white' onClick={() => {
                                                    handleProductStatusChange(product.code, product.status);
                                                    // Call notify after status change
                                                }}>{product.status === 'deactivate' ?'Done': 'Revoke'}</button>
                                            </div>
                                            :<p>Revoked</p>
                                            }
                                        </div>
                                    </div>
                                ))}
                            </div>

                        ) : (
                            <p>No product data found.</p>
                        )}
                    </div>
                </div>
        </div>
        </>
    );
}
 
export default AllCoupons;