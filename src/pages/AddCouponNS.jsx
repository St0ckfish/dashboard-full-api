import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { Authurization } from '../api/Api';
import axios from 'axios';

const AddCouponNS = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbarn = () => {
        setIsOpen(!isOpen)
    }
    const [expiration, setExpiration] = useState('');
    const [amount, setAmount] = useState('');
    const [discount, setDiscount] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(true);
    const [productId, setproductId] = useState('');
    const [couponType, setcouponType] = useState('');
    const [discountType, setdiscountType] = useState('');
    const [englishMessage, setenglishMessage] = useState('');
    const [arabicMessage, setarabicMessage] = useState('');
    const [frenchMessage, setfrenchMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [userIdList, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading3(true); // Set loading state to true

            try {
                const response = await axios.get('https://api.vitaparapharma.com/api/v1/admin/customer/all', {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Authurization}` // Assuming Authurization is defined somewhere
                    },
                });

                const data = response.data; // Access data from response.data
                console.log(data);
                // setUsers(data)
                setUsers(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading3(false); // Set loading state to false
            }
        };
        console.log(isLoading3);

        fetchData();
    }, []);

    const handleCheckboxChange = (userId) => {
        const index = userIdList.indexOf(userId);
        if (index === -1) {
            // If user is not already selected, add to userIdList array
            setSelectedUsers([...userIdList, userId]);
        } else {
            // If user is already selected, remove from userIdList array
            const updatedUsers = [...userIdList];
            updatedUsers.splice(index, 1);
            setSelectedUsers(updatedUsers);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/public/product/all`);

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                const formattedOptions = data.data.products.map(category => ({
                    value: category.productId,
                    label: category.name,
                }));
                // console.log(data.data.categories.categoryId)
                setOptions(formattedOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [productId]);

    const handleCategoryChange = (selectedOption) => {
        console.log('Selected option:', selectedOption);
        if (selectedOption) {
            setproductId(selectedOption.value); // Update state with selected ID
        } else {
            setproductId(''); // Clear ID if no option selected
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('https://api.vitaparapharma.com/api/v2/admin/coupon/new/customer/all', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Authurization}` // Assuming Authurization is defined somewhere
                },
                body: JSON.stringify({
                    couponType,
                    discountType,
                    expiration,//date same format
                    amount,
                    productId,
                    discount,
                    englishMessage,
                    arabicMessage,
                    frenchMessage,
                    userIdList
                })
            });
            if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
                // alert(`coupon code: ${data.data.code}`)
                console.log(userIdList);
                alert(`Coupon Added and notify all :)`)
                
            }
        } catch (error) {
            console.error('Error sending data:', error);
        }
        // console.log(formData);
    };
    return (
        <>
            <div>
                <NavBar />
                <div className='text-white grid justify-center items-center py-20 w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>

                    <div className='bg-[#1F2937] w-[1300px] max-[1815px]:translate-y-11 p-7 items-center grid translate-y-8 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[450px] max-[1278px]:w-[900px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[300px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                        <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>
                            <div>
                                <h1 className='font-bold text-[25px]'>Add Coupon</h1>
                            </div>

                            <div className='grid justify-cebter  gap-3'>
                                <Select
                                    placeholder={"Product Name"}
                                    name="productId"
                                    id="productId"
                                    className=""
                                    isLoading={isLoading}
                                    value={productId}
                                    options={options}
                                    onChange={handleCategoryChange}
                                    styles={{
                                        option: (provided, { isSelected }) => ({
                                            ...provided,
                                            color: 'black',
                                        }),
                                    }}
                                ></Select>
                                <p>{productId}</p>
                            </div>

                            <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                <label
                                    htmlFor="expiration"
                                    className="block text-sm font-medium"
                                >
                                    Expiration Date
                                </label>
                                <input placeholder='yyyy-MM-ddTHH:mm:ss' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="expiration"
                                    id="expiration"
                                    value={expiration}
                                    onChange={(e) => setExpiration(e.target.value)} required />

                                <input placeholder='Amount' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number"
                                    name="amount"
                                    id="amount"
                                    min="0" step="0.01"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)} required />

                                <input placeholder='Discount' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number"
                                    name="discount"
                                    id="discount"
                                    min="0" step="0.01"
                                    value={discount}
                                    onChange={(e) => setDiscount(e.target.value)} required />
                            </div>

                            <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                <input placeholder='Arabic Message' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="arabicMessage"
                                    id="arabicMessage"
                                    value={arabicMessage}
                                    onChange={(e) => setarabicMessage(e.target.value)} required />

                                <input placeholder='English Message' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="englishMessage"
                                    id="englishMessage"
                                    value={englishMessage}
                                    onChange={(e) => setenglishMessage(e.target.value)} required />

                                <input placeholder='French Message' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="frenchMessage"
                                    id="frenchMessage"
                                    value={frenchMessage}
                                    onChange={(e) => setfrenchMessage(e.target.value)} required />
                            </div>
                            {isLoading3 ? <p>Loading</p> :
                                <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                    <button onClick={toggleNavbarn} id="dropdownToggleButton" data-dropdown-toggle="dropdownToggle" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5  text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">Select Users 	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp;	&nbsp; <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                    </svg>
                                    </button>
                                    {
                                        isOpen && (
                                            <div>
                                                {users.data.customers.map(user => (
                                                    <div key={user.customerId} className='flex justify-start'>
                                                        <div id="dropdownToggle" className="z-10 bg-white divide-y divide-gray-100 shadow w-72 dark:bg-gray-700 dark:divide-gray-600">
                                                            <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownToggleButton" >
                                                            <li className=' list-none'>
                                                                <div className="flex p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                                                    <label className="inline-flex items-center w-full cursor-pointer">
                                                                        <input
                                                                            type="checkbox"
                                                                            id={user.customerId}
                                                                            value={user.customerId}
                                                                            checked={userIdList.includes(user.customerId)}
                                                                            onChange={() => handleCheckboxChange(user.customerId)}
                                                                            className='mx-2 sr-only peer'
                                                                        />
                                                                        <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full rtl:peer-checked:after:translate-x-[-100%] peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-500 peer-checked:bg-blue-600"></div>
                                                                        <label className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 cursor-pointer" htmlFor={user.customerId}>{user.email}</label>
                                                                    </label>
                                                                </div>
                                                            </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>)}
                                </div>
                            }

                            <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                <div className='flex justify-between w-[1050px] max-[1536px]:w-[900px] max-[1278px]:w-[600px] max-[724px]:w-[400px] max-[519px]:w-[370px]'>
                                    <div className='flex'>
                                        <p className='font-bold text-[18px]'>Coupon Type</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <div className='flex gap-1'>
                                            <input type="radio" id="ORDER" name="couponType" value="ORDER" onChange={(e) => setcouponType(e.target.value)} />
                                            <label htmlFor="ORDER">ORDER</label>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <input type="radio" id="PRODUCT" name="couponType" value="PRODUCT" onChange={(e) => setcouponType(e.target.value)} />
                                            <label htmlFor="PRODUCT">PRODUCT</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex justify-between w-[1050px] max-[1536px]:w-[900px] max-[1278px]:w-[600px] max-[724px]:w-[400px] max-[519px]:w-[370px]'>
                                    <div className='flex'>
                                        <p className='font-bold text-[18px]'>Discount Type</p>
                                    </div>
                                    <div className='flex gap-5 items-center'>
                                        <div className='flex gap-1'>
                                            <input type="radio" id="PRICE" name="discountType" value="PRICE" onChange={(e) => setdiscountType(e.target.value)} />
                                            <label htmlFor="PRICE">PRICE</label>
                                        </div>
                                        <div className='flex gap-1 items-center'>
                                            <input type="radio" id="PERCENTAGE" name="discountType" value="PERCENTAGE" onChange={(e) => setdiscountType(e.target.value)} />
                                            <label htmlFor="PERCENTAGE">PERCENTAGE</label>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div>
                                <input value="Add Coupon" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddCouponNS;