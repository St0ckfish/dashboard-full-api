import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import { Authurization, Active,DeactivateButtonapi } from '../api/Api';
import { Link } from 'react-router-dom';

const ActiveProducts = () => {

    const [productData, setProductData] = useState(null);
    const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token
    const [isLoading, setIsLoading] = useState(false);
    const [search,setSearch] = useState("");

    useEffect(() => {
        const retrievedToken = localStorage.getItem('myAuthorizationToken');
        if (retrievedToken) {
            setAuthorizationToken(retrievedToken);
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); 
            try {
                const response = await fetch(Active, {
                    headers: {
                        Authorization: `Bearer ${authorizationToken}`
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                console.log('Authorization token:', authorizationToken);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);


    const handleProductStatusChange = async (productId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'deactivate' : 'active';
        const apiEndpoint = DeactivateButtonapi+productId;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'DELETE', // Use POST for status updates
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    Accept: 'application/json',
                    'Accept-Language': 'en'
                }
            });

            if (!response.ok) {
                console.error('Error updating product status:', response);
                // Handle errors gracefully 
            } else {
                // Update product data locally (assuming success)
                setProductData(prevState => ({
                    ...prevState,
                    data: {
                        products: prevState.data.products.map(product =>
                            product.productId === productId ? { ...product, status: newStatus } : product
                        )
                    }
                }));
            }
        } catch (error) {
            console.error('Error updating product status:', error);
            // Handle errors gracefully
        }
    };

    // console.log(productData.data.products);

    return (
        <>
            <div className=''>
                <NavBar />
 
                <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>
                    <div>
                        {isLoading ? (
                            <p>Loading product details...</p>
                        ) : productData ? (
                            // Display fetched product details 
                            <div className='grid gap-6'>
                                <form className='grid justify-start translate-x-[100px] max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px] max-[1536px]:w-[1000px]  max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px] max-[1266px]:w-[850px] max-[1130px]:translate-x-[400px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                                    <input placeholder='Search name' className='bg-gray-700 mt-3 mb-3 ml-1 py-1 px-1 translate-y-28 rounded-md outline outline-gray-800' onChange={(e) => setSearch(e.target.value)} type="text" />
                                </form>
                                {productData.data.products.filter((product) => {
                                        return search.toLocaleLowerCase() === '' ? product : product.name.toLocaleLowerCase().includes(search)
                                    }).map((product) => (
                                    <div className=' justify-center mt-2 text-left max-[1700px]:text-center bg-[#1F2937] w-[1400px] max-[1815px]:translate-y-20 px-7 py-2 items-center grid grid-cols-2 translate-y-28 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px] max-[1266px]:w-[850px] max-[1130px]:translate-x-[400px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'
                                        key={product.productId}>
                                        <div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Name: </span>
                                                <h1 className=' text-gray-300'> {product.name}</h1>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>ID: </span>
                                                <h3 className='text-gray-300'>{product.productId}</h3>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Price: </span>
                                                <h2 className='text-gray-300'>{product.price}</h2>
                                            </div>

                                        </div>
                                        <div className='grid justify-end  gap-3'>
                                            <div className='flex justify-center'>
                                                <Link to={`/updateproduct/${product.productId}`} className='px-3 py-1 rounded-md bg-blue-800 text-white '>Update & View</Link>
                                            </div>
                                            <div className='flex justify-center'>
                                                <button className='px-3 py-1 rounded-md bg-green-600 text-white' onClick={() => {
                                                    handleProductStatusChange(product.productId, product.status);
                                                    // Call notify after status change
                                                }}>{product.status === 'active' ? 'Done' : 'Deactivate'}</button>
                                            </div>
                                        </div>
                                        {/* <p>{product.description}</p> */}
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

export default ActiveProducts;