import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { Link } from 'react-router-dom';


const ShippedOrders = () => {
    const [search,setSearch] = useState("");
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
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/delivery/shipped`, {
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

    const handleSubmit = async () => {  //2update new
        // event.preventDefault();
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/delivery/out/${customerId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
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
    useEffect(() => {
        handleSubmit();
    }, [customerId]);
    

console.log(customerId);
    
    return ( 
        <>
            <div>
                <NavBar/>
                <div className='text-white grid justify-center items-center pt-20 h-screen w-screen overflow-x-auto '>
                    <div className="relative h-full overflow-x-auto shadow-md sm:rounded-lg 2xl:translate-x-[120px] xl:translate-x-[200px] lg:translate-x-[300px] m-5">
                    <div className='grid justify-start'>
                            <form>
                                <input placeholder='Search Number' className='bg-gray-700 mt-3 mb-3 ml-1 py-1 px-1 rounded-md outline outline-gray-800' onChange={(e) => setSearch(e.target.value)} type="text" />
                            </form>
                        </div>
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
                                    {productData.data.orders.filter((product) => {
                                        return search.toLocaleLowerCase() === '' ? product : product.customerPhone.toLocaleLowerCase().includes(search)
                                    }).map((product, index) => (
                                        <tr key={product.orderId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-x-auto">
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    product.hasPicture ?

                                                    <img className="w-10 h-10 rounded-full" src={product.picture} alt=" image" />
                                                    :
                                                    <img className="w-10 h-10 rounded-full" src="/images/man-light-skin-tone-beard.svg" alt=" image" />
                                                }
                                                
                                                    <div className="font-normal text-gray-300">{product.customerPhone}</div>
                                                
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
                                                        product.city
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                <Link to={`/orderpreview/${product.orderId}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">View</Link>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div> {/**fetchData2(product.customerId); */}
                                                    <button onClick={() => {setIdcategory(product.orderId); handleSubmit() }} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                                                        <span className="sr-only">Action button</span>
                                                        Set Out for Delivery
                                                        
                                                    </button>
                                                    
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

export default ShippedOrders;