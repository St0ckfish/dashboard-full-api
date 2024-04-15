import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { Link } from 'react-router-dom';

const Report = () => {
    const [search,setSearch] = useState("");
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [customerId, setIdcategory] = useState('');
    const [role, setRole] = useState('');
    const toggleNavbar = (index) => {
        setIsOpen(isOpen === index ? null : index)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/admin/report/all`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        Accept: 'application/json', 
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); 
                console.log(productData);
                // console.log('Authorization token:', Authurization);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchData();
    }, []);

    const handleDisable = async () => { 
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/admin/review/delete/${customerId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert('Role Updated successfully:)');
                console.log('Review Deleted successfully:)', data);
            }
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    
    console.log(role);
    return ( 
        <>
        <div>
            <NavBar/>
            <div className='text-white grid justify-center items-center pt-20 h-screen w-screen overflow-x-auto '>
                    <div className="relative h-full overflow-x-auto shadow-md sm:rounded-lg 2xl:translate-x-[120px] xl:translate-x-[200px] lg:translate-x-[300px] m-5">
                        <div className='grid justify-start'>
                            <form>
                                <input placeholder='Search Report Id' className='bg-gray-700 mt-3 mb-3 ml-1 py-1 px-1 rounded-md outline outline-gray-800' onChange={(e) => setSearch(e.target.value)} type="text" />
                            </form>
                        </div>
                        <table className="w-[1600px] h-full max-[1815px]:w-[1300px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Report Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Product Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Review Id
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    Reported CustomerId
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        CustomerId
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    Report Type
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {isLoading ? (
                                <span>Loading customer details...</span>
                            ) : productData && productData.data.reports !== null ? (
                                <tbody className='h-[50px]'>
                                    {productData.data.reports.filter((product) => {
                                        return search.toLocaleLowerCase() === '' ? product : product.reportId.toLocaleLowerCase().includes(search)
                                    }).map((product, index) => (
                                        <tr key={product.customerId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-x-auto">
                                            <td className="px-6 py-4">
                                                {product.reportId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.productId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.reviewId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.reportedCustomerId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.customerId}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.reportType}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.reportDate}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div> {/**fetchData2(product.customerId); */}
                                                    <button onClick={() => { toggleNavbar(index); setIdcategory(product.reviewId); }} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                        <span className="sr-only">Action button</span>
                                                        Set Role
                                                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                        </svg>
                                                    </button>
                                                    {

                                                        isOpen === index && (

                                                            <div id="dropdownAction" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                                                    
                                                                    <li>
                                                                        <Link to={`/viewreview/${product.reviewId}`} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>View Review</Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/updateproduct/${product.productId}`} className='block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white'>View Product</Link>
                                                                    </li>
                                                                </ul>
                                                                <div className="py-1">
                                                                    <button onClick={()=>handleDisable()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete</button>
                                                                </div>
                                                            </div>
                                                        )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            ) : (
                                <span>No product data found.</span>
                            )}
                        </table>
                    </div>
                </div>
        </div>
        </>
    );
}

export default Report;