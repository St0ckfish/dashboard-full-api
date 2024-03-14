import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { getAllCategory } from '../api/Api';
import { Authurization } from '../api/Api';
import { useParams } from 'react-router-dom'; // Import useParams hook

const UpdateProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const [buttonText, setButtonText] = useState('Delete');
    const { ProductId } = useParams()
    const [productData, setProductData] = useState(null);
    const [name, setName] = useState('');
    const [arabicName, setarabicName] = useState('');
    const [frenchName, setfrenchName] = useState('');
    const [arabicAbout, setarabicAbout] = useState('');
    const [about, setAbout] = useState('');
    const [frenchAbout, setfrenchAbout] = useState('');
    const [arabicDescription, setarabicDescription] = useState('');
    const [description, setDescription] = useState('');
    const [frenchDescription, setfrenchDescription] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [price, setprice] = useState('');
    const [stockQuantity, setstockQuantity] = useState('');
    const [afterDiscount, setpriceAfterDiscount] = useState('');
    const [discount, setDiscount] = useState('');
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token

    const handleImageChange = (event) => {
        setSelectedFile(event.target.files[0]); // Access the first selected file
    };
    const handleImageUpload = async () => {
        if (!selectedFile) {
            return alert('Please select an image to upload.');
        }
        const formData = new FormData();
        formData.append('image', selectedFile);
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/custom/product/picture/add/${ProductId}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`, // Include token with Bearer prefix
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Image uploaded successfully!');

                // Update product data to reflect the change (consider refetching data)
                // ... (implementation details)
            } else {
                console.error('Error uploading image:', await response.text());
                // Handle upload error (e.g., display an error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle errors (e.g., network issues)
        }
    };

    //
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v2/public/product/${ProductId}`, {

                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                console.log('Authorization token:', authorizationToken);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors gracefully (e.g., display an error message)
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);
    // 

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
        formData.append('categoryId', categoryId);
        // formData.append('isDiscount', isDiscount);
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v2/custom/product/update/${ProductId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Authurization}`, // Include token with Bearer prefix
                },
                body: JSON.stringify({
                    name,
                    description,
                    about,
                    price,
                    stockQuantity,
                    categoryId,
                    afterDiscount,
                    discount,
                    arabicName,
                    arabicDescription,
                    arabicAbout,
                    frenchName,
                    frenchDescription,
                    frenchAbout
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                console.log(Authurization);
            }
            setcategoryId('');
            setDiscount('');
            setAbout('')
            setName('')


            console.log('Product created successfully:', data);

        } catch (error) {
            console.error('Error submitting form:', error);
        }

        if (!categoryId) {
            console.error('Error: No category selected. Please choose a category.');
            return; // Prevent sending the request if category is not selected
        }
    };
    console.log(productData);
    const handleDeleteImage = async (productId, pictureUUID) => {
        const response = await fetch(`https://api.vitaparapharma.com/api/v1/custom/product/picture/delete/${productId}/${pictureUUID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${Authurization}`, // Include token with Bearer prefix
            },
        });
        // setButtonText(buttonText === 'Delete' ? 'Done' :"Done");
        if (response.ok) {
            // Image deletion successful
            alert('Image deleted successfully!');
            console.log('Image deleted successfully!');
        } else {
            console.error('Error deleting image:', await response.text());
            // Handle deletion error (e.g., display an error message)
        }
    };

    return (
        <>
            <div className="">

                <NavBar />

                <div className=' relative mt-[50px] grid justify-center items-center  2xl:justify-start 2xl:translate-x-[290px] px-5 py-5'>
                    {isLoading ? (
                        <p>Loading product details...</p>
                    ) : productData ? (
                        <div className='text-white text-start text-[20px] grid justify-start gap-4 py-4'>
                            <div className='grid 2xl:flex justify-start items-center gap-4'>
                                {productData.data.product.pictures.map((picture, index) => (
                                    <img key={index} src={picture} alt={`picture`} className="product-image rounded-lg w-[270px]" />
                                ))}
                            </div>
                            <hr />
                            <div>
                                <div className='flex justify-start items-center gap-2'>
                                    <h1 className='font-bold text-[22px]'>English name:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.name}</p>
                                </div>
                                <div className='flex justify-start items-center gap-2'>
                                    <h1 className='font-bold text-[22px]'>Arabic name:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.arabicName}</p>
                                </div>
                                <div className='flex justify-start items-center gap-2'>
                                    <h1 className='font-bold text-[22px]'>French name:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.frenchName}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='grid gap-2'>
                                <div className='flex justify-start items-center gap-1'>
                                    <h1 className='font-bold text-[22px]'>English about:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.about}</p>
                                </div>
                                <div className='flex justify-start items-center gap-1'>
                                    <h1 className='font-bold text-[22px]'>Arabic about:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.arabicAbout}</p>
                                </div>
                                <div className='flex justify-start items-center gap-1'>
                                    <h1 className='font-bold text-[22px]'>French about:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.frenchAbout}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='grid gap-2'>
                                <div className='flex justify-start items-center gap-1'>
                                    <h1 className='font-bold text-[22px]'>English description:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.description}</p>
                                </div>
                                <div className='flex justify-start items-center gap-1'>
                                    <h1 className='font-bold text-[22px]'>Arabic description:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.arabicDescription}</p>
                                </div>
                                <div className='flex justify-start items-center gap-1'>
                                    <h1 className='font-bold text-[22px]'>French description:</h1>
                                    <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.frenchDescription}</p>
                                </div>
                            </div>
                            <hr />
                            <div className='flex justify-start items-center gap-4'>
                                <h1 className='font-bold text-[22px]'>Price:</h1>
                                <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.price}</p>
                            </div>
                            <hr />
                            <div className='flex justify-start items-center gap-4'>
                                <h1 className='font-bold text-[22px]'>IS Discount:</h1>
                                <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.discount.toString() === "false" ? "NO" : "YES"}</p>
                            </div>
                            <hr />
                            <div className='flex justify-start items-center gap-4'>
                                <h1 className='font-bold text-[22px]'>After Discount:</h1>
                                <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.afterDiscount}</p>
                            </div>
                            <hr />
                            <div className='flex justify-start items-center gap-4'>
                                <h1 className='font-bold text-[22px]'>Category Id:</h1>
                                <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.categoryId}</p>
                            </div>
                            <hr />
                            <div className='flex justify-start items-center gap-4'>
                                <h1 className='font-bold text-[22px]'>Stock Quantity:</h1>
                                <p className='text-gray-300 text-[17px] translate-y-0.5'>{productData.data.product.stockQuantity}</p>
                            </div>
                            <hr />
                            <div className='flex justify-center  items-center'>
                                <button onClick={toggleNavbar} className='bg-sky-700 px-3 py-1 rounded-md'>Edit Product Data</button>
                            </div>
                        </div>
                    ) : (
                        <p>No product data found.</p>
                    )}
                </div>
                {
                    isOpen && (

                        <div className='text-white grid justify-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>
                            <div className='bg-[#1F2937] w-[1300px] max-[1815px]:translate-y-11 p-7 items-center grid translate-y-8 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[450px] max-[1278px]:w-[900px] max-[1200px]:w-[700px] max-[1109px]:translate-x-[350px] max-[1056px]:translate-x-[300px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                                <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>
                                    <div className="flex justify-center items-center gap-3 max-[1815px]:grid">
                                        <input placeholder='Product Name: (AR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                            name="arabicName"
                                            id="arabicName"
                                            value={arabicName}
                                            onChange={(e) => setarabicName(e.target.value)} required />
                                        <input placeholder='Product Name: (EN)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                            name="name"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)} required />
                                        <input placeholder='Product Name: (FR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                            name="frenchName"
                                            id="frenchName"
                                            value={frenchName}
                                            onChange={(e) => setfrenchName(e.target.value)} required />
                                    </div>

                                    <div className='flex justify-center items-center gap-3 max-[1815px]:grid'>
                                        <div className='flex items-center gap-2'>
                                            <label htmlFor="isDiscount" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Discount?</label>
                                            <input id="isDiscount" type="checkbox" onChange={(e) => setDiscount(e.target.checked ? 1 : 0)} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" ></input>{/*onChange={handleAfterDiscountChange}*/}
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
                                            name="description"
                                            id="description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)} required />
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
                                            name="about"
                                            id="about"
                                            value={about}
                                            onChange={(e) => setAbout(e.target.value)} />
                                        <textarea placeholder='About: (FR)' className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="frenchAbout"
                                            id="frenchAbout"
                                            value={frenchAbout}
                                            onChange={(e) => setfrenchAbout(e.target.value)} />
                                    </div>

                                    <div>
                                        <input value="Add Product" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit" />
                                    </div>
                                </form>
                                <div className='grid 2xl:flex 2xl:justify-start justify-center  items-center gap-4'>
                                    {productData.data.product.pictures.map((picture, index) => (
                                        <div key={index} className=''>
                                            <img key={index} src={picture} alt={`picture`} className="product-image rounded-lg w-[270px]" />
                                            <button key={index} className='bg-red-500 rounded-md mt-4 px-2 py-1' onClick={() => {handleDeleteImage(productData.data.product.productId, picture.substring(picture.lastIndexOf("/") + 1));}}>Delete</button>
                                        </div>


                                    ))}
                                </div>
                                {
                                    productData.data.product.pictures.length !== 5?(

                                <div className='flex justify-center items-center gap-3 '>
                                    <label className="block mb-2 text-sm font-medium text-white translate-y-1" htmlFor="imageUpload">Select Image:</label>
                                    <input type="file"
                                            onChange={handleImageChange}
                                        id="imageUpload"// Restrict file types to images
                                        className=" bg-slate-700 text-black text-sm file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[#8465F2] file:hover:bg-[#5735d1] file:text-white rounded" required accept="image/*" />
                                        <button className=' cursor-pointer bg-green-600 rounded-md px-2 py-1' onClick={handleImageUpload} disabled={!selectedFile}>Upload Image</button>
                                </div>
                                    ):(
                                        <p>Max images 5</p>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </>
    );
}

export default UpdateProduct;