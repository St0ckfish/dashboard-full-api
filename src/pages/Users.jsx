import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { Link } from 'react-router-dom';

const Users = () => {
    const [productData, setProductData] = useState(null);
    // const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token
    const [isLoading, setIsLoading] = useState(false);

   

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/admin/customer/all`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        Accept: 'application/json', // Assuming JSON response
                        // 'Accept-Language': 'en' // Set language preference to English
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                console.log(productData);
                console.log('Authorization token:', Authurization);
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
                <div className='text-white grid justify-center items-center py-20 h-screen w-screen overflow-x-auto '>
                    <div className="relative overflow-x-auto shadow-md sm:rounded-lg 2xl:translate-x-[120px] xl:translate-x-[200px] lg:translate-x-[300px]  translate-y-28 ">
                        <table className="w-[1600px] max-[1815px]:w-[1300px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Position
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {isLoading ? (
                            <span>Loading customer details...</span>
                        ) : productData && productData.data.products !== null ? (
                            <tbody>
                                {productData.data.customers.map((product) => (
                                <tr key={product.customerId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-x-auto">
                                    <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                        <img className="w-10 h-10 rounded-full" src="/images/man-light-skin-tone-beard.svg" alt="Jese image" />
                                        <div className="ps-3">
                                            <div className="text-base font-semibold">{product.firstName} {product.lastName}</div>
                                            <div className="font-normal text-gray-300">{product.email}</div>
                                        </div>
                                    </th>
                                    <td className="px-6 py-4">
                                        {product.role}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            {
                                                product.enabled ? (
                                                    <div className='flex items-center'>
                                                        <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> Enabled
                                                    </div>
                                                    
                                                    ):(
                                                        
                                                        <div className='flex items-center'>
                                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Not Enabled
                                                        </div>
                                                )
                                            }
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <Link to='/userpreview' className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit user</Link>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        ):(
                            <span>No product data found.</span>
                        )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Users;