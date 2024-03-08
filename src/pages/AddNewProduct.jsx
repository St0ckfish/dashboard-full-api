import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';

const AddNewProduct = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        about: '',
        price: '',
        stockQuantity: '',
        categoryId: '',
        afterDiscount: '',
    });
    const [selectedLanguage, setSelectedLanguage] = useState('en'); // Initial language
    const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token


    const handleLanguageChange = (event) => {
        setSelectedLanguage(event.target.value);
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    useEffect(() => {
        // Replace with your logic to retrieve the authorization token (e.g., from local storage, API call)
        const retrievedToken = localStorage.getItem('myAuthorizationToken');
        if (retrievedToken) {
            setAuthorizationToken(retrievedToken);
        }
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        const headers = new Headers({
            'Accept-Language': selectedLanguage,
            'Content-Type': 'application/json', // Assuming JSON data
            'Authorization': `Bearer ${authorizationToken}`, // Add authorization token
        });

        const response = await fetch('https://api.vitaparapharma.com/api/v1/custom/product/new', {
            method: 'POST',
            headers,
            body: JSON.stringify(formData),
        });

        // Handle response (success/error)
        if (response.ok) {
            console.log('Product data submitted successfully!');
            setFormData({ // Clear form after successful submission
                name: '',
                description: '',
                about: '',
                price: '',
                stockQuantity: '',
                categoryId: '',
                afterDiscount: '',
            });
        } else {
            console.error('Error submitting product data:', await response.text());
        }
    };
    // Implement logic to retrieve or manage authorization token (replace with your approach)
    // This example assumes you have a separate mechanism to store or fetch the token


    return (
        <>
            <div className=''>

                <NavBar />

                <div className='text-white grid justify-center items-center w-screen h-screen '>
                    <div className='bg-[#1F2937] p-14 items-center grid translate-y-10 translate-x-10 rounded-xl border border-[#41434d] shadow-[#2c4157] shadow-2xl'>
                    <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>

                        <div className='flex justify-center items-center gap-3'>
                            {/* Language selection */}
                            <select className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' value={selectedLanguage} onChange={handleLanguageChange}>
                                <option value="en">English (US)</option>
                                <option value="fr">French (France)</option>
                                <option value="ar">Arabic (Egypt)</option>  {/* Adjust locale code for specific Arabic dialect */}
                            </select>
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            {/* <label htmlFor="name">Name:</label> */}
                            <input placeholder='Product Name:' className='bg-[#2b2e38] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            {/* <label className='text-start' htmlFor="price">Price:</label> */}
                            <input placeholder='Price:' className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="price" name="price" value={formData.price} onChange={handleChange} min="0" step="0.01" required />
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            {/* <label htmlFor="stockQuantity">Stock Quantity:</label> */}
                            <input placeholder='Stock Quantity:' className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="stockQuantity" name="stockQuantity" value={formData.stockQuantity} onChange={handleChange} min="0" required />
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            {/* <label htmlFor="categoryId">Category ID:</label> */}
                            <input placeholder='Category ID:' className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="categoryId" name="categoryId" value={formData.categoryId} onChange={handleChange} required />
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            {/* <label htmlFor="afterDiscount">After Discount (optional):</label> */}
                            <input placeholder='After Discount (-1 no discount):' className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="afterDiscount" name="afterDiscount" value={formData.afterDiscount} onChange={handleChange} min="-1" step="0.01" />
                        </div>
                        <div className='flex justify-center items-center gap-3'>
                            {/* <label htmlFor="description">Description:</label> */}
                            <textarea placeholder='Description:' className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' id="description" name="description" value={formData.description} onChange={handleChange} required />
                        </div>

                        <div className='flex justify-center items-center gap-3'>
                            {/* <label htmlFor="about">About:</label> */}
                            <textarea placeholder='About:' className='bg-[#2b2e38] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' id="about" name="about" value={formData.about} onChange={handleChange} />
                        </div>


                        <div>
                        <input value="Add Product" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit"/>
                        </div>
                    </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNewProduct;