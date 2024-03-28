import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { Authurization,Active,Addcouponnsapi,getAllCustomersapi } from '../api/Api';
import axios from 'axios';

const NotifyAllCustomers = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbarn = () => {
        setIsOpen(!isOpen)
    }
    const [expiration, setExpiration] = useState('');
    const [amount, setAmount] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading3, setIsLoading3] = useState(true);
    const [productData3, setProductData3] = useState(null);
    const [type, setSelectedOption] = useState('');
    const [productId, setproductId] = useState('');
    const [couponType, setcouponType] = useState('');
    const [discountType, setdiscountType] = useState('');
    const [englishMessage, setenglishMessage] = useState('');
    const [arabicMessage, setarabicMessage] = useState('');
    const [frenchMessage, setfrenchMessage] = useState('');
    const [users, setUsers] = useState([]);
    const [userIdList, setSelectedUsers] = useState([]);

    useEffect(() => {
        const fetchData3 = async () => {
            setIsLoading3(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v2/public/enum/notification-type`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        // 'Content-Type': 'application/json',
                    },
                });
                const data = await response.json();
                console.log(data);
                setProductData3(data);

            } catch (error) {
                console.error('Error fetching data:', error);

            } finally {
                setIsLoading3(false); // Set loading state to false
            }
        };

        fetchData3();
    }, []);

    const handleSelectChange = (e) => {
        const selectedValue = e.target.value; // Parse the value as an integer
        setSelectedOption(selectedValue);
        console.log(type);
        console.log(typeof type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v2/admin/notify/all`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Authurization}` // Assuming Authurization is defined somewhere
                },
                body: JSON.stringify({
                    englishMessage,
                    arabicMessage,
                    frenchMessage,
                    type,
                    identifier,
                })
            });
            // if (response.ok) {
                const data = await response.json();
                console.log('Response:', data);
                // alert(`coupon code: ${data.data.code}`)
                // console.log(userIdList);
                alert(`Coupon Added and notify all :)`)
                
            // }
        } catch (error) {
            console.error('Error sending data:', error);
        }
        // console.log(formData);
    };
    return ( 
        <>
        <div>
            <NavBar/>
            <div className='text-white grid justify-center items-center py-20 w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>

                    <div className='bg-[#1F2937] w-[1300px] max-[1815px]:translate-y-11 p-7 items-center grid translate-y-8 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[450px] max-[1278px]:w-[900px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[300px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                        <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>
                            <div>
                                <h1 className='font-bold text-[25px]'>Add Coupon</h1>
                            </div>

                            <div className='grid justify-cebter  gap-3'>
                                {isLoading3 ? <p>Loading product details...</p> :

                                <select value={type} onChange={handleSelectChange} className='text-black p-2 rounded-md outline-none'>
                                    <option className='font-bold text-blue-700'>Select Type</option>//
                                    {Object.entries(productData3.data.types).map(([typee, number]) => (
                                        <option key={typee} value={typee}>
                                            {typee}
                                        </option>
                                    ))}
                                </select>
                                }
                            </div>

                            <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                <input placeholder='Identifier' className='bg-[#2b2e38] w-[1070px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="identifier"
                                    id="identifier"
                                    min="0" step="0.01"
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)} required />

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
 
export default NotifyAllCustomers;