import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';

const Users = () => {
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
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/admin/customer/all`, {
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

    const handleCustomerRole = async () => { 
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/super/admin/customer/role`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    customerId,
                    role,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                console.log(Authurization);
                alert('Role Updated successfully:)');
                console.log('Role Updated successfully:)', data);
            }
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    useEffect(() => {
        handleCustomerRole();
    }, [role]);
    

    const handleEnable = async () => { 
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/super/admin/customer/enable/${customerId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert('Role Updated successfully:)');
                console.log('Role Updated successfully:)', data);
            }
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleDisable = async () => { 
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/super/admin/customer/disable/${customerId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert('Role Updated successfully:)');
                console.log('Role Updated successfully:)', data);
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
                <NavBar />
                <div className='text-white grid justify-center items-center pt-20 h-screen w-screen overflow-x-auto '>
                    <div className="relative h-full overflow-x-auto shadow-md sm:rounded-lg 2xl:translate-x-[120px] xl:translate-x-[200px] lg:translate-x-[300px] m-5">
                        <table className="w-[1600px] h-full max-[1815px]:w-[1300px] text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 overflow-x-auto ">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 overflow-x-auto">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        gender
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Phone
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Position
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Locked
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
                                    {productData.data.customers.map((product, index) => (
                                        <tr key={product.customerId} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 overflow-x-auto">
                                            <th scope="row" className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white">
                                                {
                                                    product.hasPicture ?

                                                    <img className="w-10 h-10 rounded-full" src={product.picture} alt=" image" />
                                                    :
                                                    <img className="w-10 h-10 rounded-full" src="/images/man-light-skin-tone-beard.svg" alt=" image" />
                                                }
                                                <div className="ps-3">
                                                    <div className="text-base font-semibold">{product.firstName} {product.lastName}</div>
                                                    <div className="font-normal text-gray-300">{product.email}</div>
                                                </div>
                                            </th>
                                            <td className="px-6 py-4">
                                                {product.male?

                                                <img className="w-10 h-10 rounded-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOw1jqeyKIfWipMdt-DsUWbLfpMfbQ_-2QWA&usqp=CAU" alt=" image" />
                                                    :
                                                <img className="w-10 h-10 rounded-full" src="https://t3.ftcdn.net/jpg/01/37/69/42/240_F_137694239_ihbs4kHd2w3HC3KipODkBDfhltbjwwLV.jpg" alt=" image" />
                                                }
                                            </td>
                                            <td className="px-6 py-4">
                                                {product.phone}
                                            </td>
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
                                                        ) : (
                                                            <div className='flex items-center'>
                                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Disabled
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    {
                                                        !product.locked ? (
                                                            <div className='flex items-center'>
                                                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div> No
                                                            </div>
                                                        ) : (
                                                            <div className='flex items-center'>
                                                                <div className="h-2.5 w-2.5 rounded-full bg-red-500 me-2"></div> Yes
                                                            </div>
                                                        )
                                                    }
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div> {/**fetchData2(product.customerId); */}
                                                    <button onClick={() => { toggleNavbar(index); setIdcategory(product.customerId); }} id="dropdownActionButton" data-dropdown-toggle="dropdownAction" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
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
                                                                        <button onClick={()=>{setRole("super_admin"); handleCustomerRole();}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Super Admin</button>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={()=>{setRole("admin");handleCustomerRole(); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Admin</button>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={()=>{setRole("customer");handleCustomerRole(); }} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Customer</button>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={()=>{setRole("content_creator"); handleCustomerRole();}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Content Creator</button>
                                                                    </li>
                                                                    <li>
                                                                        <button onClick={()=>{setRole("delivery_boy"); handleCustomerRole();}} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Delivery Boy</button>
                                                                    </li>
                                                                </ul>
                                                                <div className="py-1">
                                                                {product.locked ?
                                                                    <button onClick={()=>handleEnable()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Open</button>
                                                                    :
                                                                    <button onClick={()=>handleDisable()} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Lock</button>

                                                                }
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

export default Users;