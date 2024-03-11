import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { getAllCategory } from '../api/Api';
import { AddProduct } from '../api/Api';

const AddNewProduct = () => {
    const [englishName, setenglishName] = useState('');
    const [arabicName, setarabicName] = useState('');
    const [frenchName, setfrenchName] = useState('');
    const [arabicAbout, setarabicAbout] = useState('');
    const [englishAbout, setenglishAbout] = useState('');
    const [frenchAbout, setfrenchAbout] = useState('');
    const [arabicDescription, setarabicDescription] = useState('');
    const [englishDescription, setenglishDescription] = useState('');
    const [frenchDescription, setfrenchDescription] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [price, setprice] = useState('');
    const [stockQuantity, setstockQuantity] = useState('');
    const [priceAfterDiscount, setpriceAfterDiscount] = useState('');
    const [isDiscount, setisDiscount] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token

    const handleImageChange = (event) => {
        const newImages = event.target.files;

        // Validate image count and size
        if (newImages.length > 5) {
            alert('Error: Maximum 5 images allowed.');
            return;
        }

        const validImages = Array.from(newImages) // Convert FileList to array for validation
            .filter((image) => image.size <= 30720); // Maximum 30 KB per image (30 * 1024 bytes)

        if (validImages.length !== newImages.length) {
            alert('Error: Some images exceed the 30 KB size limit.');
        }

        setSelectedImages(validImages); // Update state with validated images
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(getAllCategory);

                if (!response.ok) {
                    throw new Error('API request failed');
                }

                const data = await response.json();
                const formattedOptions = data.data.categories.map(category => ({
                    value: category.categoryId,
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
    }, [categoryId]);

    const handleCategoryChange = (selectedOption) => {
        console.log('Selected option:', selectedOption);
        if (selectedOption) {
            setcategoryId(selectedOption.value); // Update state with selected ID
        } else {
            setcategoryId(''); // Clear ID if no option selected
        }
    };
    // for category id
    useEffect(() => {
        const retrievedToken = localStorage.getItem('myAuthorizationToken');
        if (retrievedToken) {
            setAuthorizationToken(retrievedToken);
        }
    }, []);
    const handleSubmit = async (event) => {  //2update new
        event.preventDefault();

        const formData = new FormData();
        formData.append('arabicName', arabicName);
        formData.append('englishName', englishName);
        formData.append('frenchName', frenchName);
        formData.append('arabicAbout', arabicAbout);
        formData.append('englishAbout', englishAbout);
        formData.append('frenchAbout', frenchAbout);
        formData.append('arabicDescription', arabicDescription);
        formData.append('englishDescription', englishDescription);
        formData.append('frenchDescription', frenchDescription);
        formData.append('categoryId', categoryId);
        formData.append('price', price);
        formData.append('priceAfterDiscount', priceAfterDiscount);
        formData.append('isDiscount', isDiscount);
        formData.append('stockQuantity', stockQuantity);
        
        for (let i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            const customName = `image${i + 1}`; // names like image1, image2, etc.
            formData.append(customName, image);
        }

        try {
            const response = await fetch(AddProduct, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${authorizationToken}`, // Include token with Bearer prefix
                },
            });

            const data = await response.json();
            if (!response.ok) {
                console.log(data);
            }
            setenglishName('');
            setarabicName('');
            setfrenchName('');
            setarabicAbout('');
            setenglishAbout('');
            setfrenchAbout('');
            setarabicDescription('');
            setenglishDescription('');
            setfrenchDescription('');
            setcategoryId('');
            setprice('');
            setstockQuantity('');
            setpriceAfterDiscount('');
            setisDiscount('');
            setSelectedImages(null)

            console.log('Product created successfully:', data);

        } catch (error) {
            console.error('Error submitting form:', error);
        }

        if (!categoryId) {
            console.error('Error: No category selected. Please choose a category.');
            return; // Prevent sending the request if category is not selected
        }
    };
    return (
        <>
            <div className="">

                <NavBar />

                <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>

                    <div className='bg-[#1F2937] w-[1400px] max-[1815px]:translate-y-11 p-7 items-center grid translate-y-8 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[400px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[300px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>

                        <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>

                            <div className="flex justify-center items-center gap-3 max-[1815px]:grid">
                                <input placeholder='Product Name: (AR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="arabicName"
                                    id="arabicName"
                                    value={arabicName}
                                    onChange={(e) => setarabicName(e.target.value)} required />
                                <input placeholder='Product Name: (EN)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="englishName"
                                    id="englishName"
                                    value={englishName}
                                    onChange={(e) => setenglishName(e.target.value)} required />
                                <input placeholder='Product Name: (FR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="frenchName"
                                    id="frenchName"
                                    value={frenchName}
                                    onChange={(e) => setfrenchName(e.target.value)} required />
                            </div>

                            <div className='flex justify-center items-center gap-3 max-[1815px]:grid'>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="isDiscount" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Discount?</label>
                                    <input id="isDiscount" type="checkbox" onChange={(e) => setisDiscount(e.target.checked ? 1 : 0)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" ></input>{/*onChange={handleAfterDiscountChange}*/}
                                    <input placeholder='After Discount:' className='bg-[#2b2e38]  px-2 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="afterDiscount" name="afterDiscount" onChange={(e) => setpriceAfterDiscount(e.target.value)} min="0" step="0.01" />
                                </div>

                                <div className="flex items-center justify-center gap-2">
                                    <input placeholder='Price:' className='bg-[#2b2e38] px-2 py-2 rounded-xl w-[150px] border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="price" name="price" onChange={(e) => setprice(e.target.value)} min="0" step="0.01" required /> {/*onChange={handleChange}*/}
                                    <input placeholder='Stock Quantity:' className='bg-[#2b2e38] px-2 py-2 w-[150px]  rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="stockQuantity" name="stockQuantity" onChange={(e) => setstockQuantity(e.target.value)} min="0" required /> {/*onChange={handleChange}*/}
                                </div>
                                <Select
                                    placeholder={"Category Name"}
                                    name="categoryId"
                                    id="categoryId"
                                    className="" // Customize container
                                    isLoading={isLoading}
                                    value={categoryId} // Reflect currently selected ID
                                    options={options}
                                    onChange={handleCategoryChange}
                                    // getOptionLabel={(option) => (option.label || option.value)}
                                    styles={{
                                        option: (provided, { isSelected }) => ({
                                            ...provided,
                                            color: 'black', // Set text color to black for all options
                                            // Customize option background
                                        }),
                                    }}
                                ></Select>
                                <p>{categoryId}</p>
                            </div>

                            <div className='grid justify-center items-center gap-3'>
                                <textarea placeholder='Description: (AR)' className='bg-[#2b2e38] max-[1815px]:w-[800px]  w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                    name="arabicDescription"
                                    id="arabicDescription"
                                    value={arabicDescription}
                                    onChange={(e) => setarabicDescription(e.target.value)} required />
                                <textarea placeholder='Description: (EN)' className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                    name="englishDescription"
                                    id="englishDescription"
                                    value={englishDescription}
                                    onChange={(e) => setenglishDescription(e.target.value)} required />
                                <textarea placeholder='Description: (FR)' className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                    name="frenchDescription"
                                    id="frenchDescription"
                                    value={frenchDescription}
                                    onChange={(e) => setfrenchDescription(e.target.value)} required />
                            </div>

                            <div className='grid justify-center items-center gap-3'>
                                <textarea placeholder='About: (AR)' className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                    name="arabicAbout"
                                    id="arabicAbout"
                                    value={arabicAbout}
                                    onChange={(e) => setarabicAbout(e.target.value)} />
                                <textarea placeholder='About: (EN)' className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                    name="englishAbout"
                                    id="englishAbout"
                                    value={englishAbout}
                                    onChange={(e) => setenglishAbout(e.target.value)} />
                                <textarea placeholder='About: (FR)' className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                    name="frenchAbout"
                                    id="frenchAbout"
                                    value={frenchAbout}
                                    onChange={(e) => setfrenchAbout(e.target.value)} />
                            </div>

                            <div className='flex justify-center items-center gap-3 '>
                                <label className="block mb-2 text-sm font-medium text-white translate-y-1" htmlFor="images">Upload image</label>
                                <input type="file"
                                    id="images"// Restrict file types to images
                                    onChange={handleImageChange} className=" bg-slate-700 text-black text-sm file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[#8465F2] file:hover:bg-[#5735d1] file:text-white rounded" required multiple accept="image/*" />
                            </div>

                            <div>
                                <input value="Add Product" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddNewProduct;