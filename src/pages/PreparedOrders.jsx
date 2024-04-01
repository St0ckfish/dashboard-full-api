import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { Link } from 'react-router-dom';

const PreparedOrders = () => {
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [customerId, setIdcategory] = useState('');
    const [value, setValue] = useState('');
    const toggleNavbar = (index) => {
        setIsOpen(isOpen === index ? null : index)
    }

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/delivery/prepared`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        Accept: 'application/json', 
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); 
                console.log(productData);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false); 
            }
        };

        fetchData();
    }, []);

    const handleSubmit = async (event) => {  //2update new
        event.preventDefault();
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/delivery/shipped/${customerId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    value
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                console.log(Authurization);
                setValue("")
                alert('Updated successfully:)');


                console.log('Updated successfully:)', data);

            }
            console.log(data);
            console.log(Authurization);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    

console.log(customerId);
    
    return ( 
        <>
            <div>
                <NavBar/>
                <div className='text-white grid justify-center items-center pt-20 h-screen w-screen overflow-x-auto '>
                    <div className="relative h-full overflow-x-auto shadow-md sm:rounded-lg 2xl:translate-x-[120px] xl:translate-x-[200px] lg:translate-x-[300px] m-5">
                        <table className="w-[1600px] h-full max-[1815px]:w-[1300px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                Customer Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    totalAmount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    Order Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    Zip Code
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                    Country
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        View
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            {isLoading ? (
                                <span>Loading customer details...</span>
                            ) : productData && productData.data.orders !== null ? (
                                <tbody>
                                    {productData.data.orders.map((product, index) => (
                                        <tr key={product.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-x-auto">
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    product.hasPicture ?

                                                    <img className="w-10 h-10 rounded-full" src={product.picture} alt=" image" />
                                                    :
                                                    <img className="w-10 h-10 rounded-full" src="/images/man-light-skin-tone-beard.svg" alt=" image" />
                                                }
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{product.firstName} {product.lastName}</div>
                                                    <div className="font-normal text-gray-300">{product.customerPhone}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {
                                                    product.totalAmount 
                                                } 
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.orderDate.split('T')[0]}
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.zipCode}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {
                                                        product.country
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                <Link to="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div> {/**fetchData2(product.customerId); */}
                                                    <button onClick={() => { toggleNavbar(index); setIdcategory(product.orderId); }} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                        <span className="sr-only">Action button</span>
                                                        Set Shipped
                                                        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                                        </svg>
                                                    </button>
                                                    {

                                                        isOpen === index && (

                                                            <div id="dropdownAction" className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                                                <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownActionButton">
                                                                    <form onSubmit={handleSubmit}>
                                                                        <input type="number" name="value" id='value' value={value} onChange={(e) => setValue(e.target.value)} required placeholder='Trancking number' className='py-1 px-2 text-sm text-white w-[172px] bg-gray-600 border-gray-600 outline-none rounded-md mb-2' />
                                                                        <button type='submit' className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Submit</button>
                                                                    </form>
                                                                </ul>
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

export default PreparedOrders;