import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { getAllCategory, getTagsUrl } from '../api/Api';
import { Authurization,UpdateProductImgapi ,GetAllProductDataapi,UpdateProductDataapi,DeleteProductImgapi} from '../api/Api';
import { useParams } from 'react-router-dom'; // Import useParams hook
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const UpdateProduct = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen)
    }
    const [selectedFile, setSelectedFile] = useState(null);
    const { ProductId } = useParams()
    const [productData, setProductData] = useState(null);
    const [englishName, setName] = useState('');
    const [arabicName, setarabicName] = useState('');
    const [frenchName, setfrenchName] = useState('');
    const [arabicAbout, setarabicAbout] = useState('');
    const [weight, setWeight] = useState('');
    const [englishAbout, setAbout] = useState('');
    const [frenchAbout, setfrenchAbout] = useState('');
    const [arabicDescription, setarabicDescription] = useState('');
    const [englishDescription, setDescription] = useState('');
    const [frenchDescription, setfrenchDescription] = useState('');
    const [categoryId, setcategoryId] = useState('');
    const [priceBeforeDiscount, setprice] = useState('');
    const [stockQuantity, setstockQuantity] = useState('');
    const [afterDiscount, setpriceAfterDiscount] = useState('');
    const [discount, setDiscount] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [authorizationToken, setAuthorizationToken] = useState(''); // For authorization token
    const [englishTags, setTags] = useState([]);
    const [arabicTags, setArabicTags] = useState([]);
    const [frenchTags, setFrenchTags] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [tagValue, setTagValue] = useState('');
    const [tagValueA, setTagValueA] = useState('');
    const [tagValueF, setTagValueF] = useState('');

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const response = await fetch(getTagsUrl);
                const data = await response.json();
                setSuggestions(data);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, [getTagsUrl]);



    const handleTagInputChange = (event) => {
        setTagValue(event.target.value);
    };
    const handleTagInputChangeA = (event) => {
        setTagValueA(event.target.value);
    };
    const handleTagInputChangeF = (event) => {
        setTagValueF(event.target.value);
    };

    const addTag = (tag) => {
        if (tag.key === 'Enter' && tagValue.trim()) {
            setTags([...englishTags, tagValue.trim()]);
            setTagValue('');
        }
    };
    const addTagA = (tag) => {
        if (tag.key === 'Enter' && tagValueA.trim()) {
            setArabicTags([...arabicTags, tagValueA.trim()]);
            setTagValueA('');
        }
    };
    const addTagF = (tag) => {
        if (tag.key === 'Enter' && tagValueF.trim()) {
            setFrenchTags([...frenchTags, tagValueF.trim()]);
            setTagValueF('');
        }
    };

    const handleTagSelection = (suggestion) => {
        setTags([...englishTags, suggestion]);
        setTagValue('');
    };
    const handleTagSelectionA = (suggestion) => {
        setArabicTags([...arabicTags, suggestion]);
        setTagValueA('');
    };
    const handleTagSelectionF = (suggestion) => {
        setFrenchTags([...frenchTags, suggestion]);
        setTagValueF('');
    };

    const handleTagRemoval = (tag) => {
        setTags(englishTags.filter((t) => t != tag));
    };
    const handleTagRemovalA = (tag) => {
        setTagValueA(arabicTags.filter((t) => t != tag));
    };
    const handleTagRemovalF = (tag) => {
        setTagValueF(frenchTags.filter((t) => t != tag));
    };

    const handleEnglishDescriptionChange = (content) => {
        setDescription(content);
    };
    const handleArabicDescriptionChange = (content) => {
        setarabicDescription(content);
    };
    const handleFrenchDescriptionChange = (content) => {
        setfrenchDescription(content);
    };
    const handleInputChange = (event) => {
        setpriceAfterDiscount(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        event.target.checked ? true : false
        setDiscount(event.target.checked);
        if (!event.target.checked === false) {
            setpriceAfterDiscount(0);
        }
    };

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
            const response = await fetch(UpdateProductImgapi+ProductId, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`, // Include token with Bearer prefix
                },
                body: formData,
            });

            if (response.ok) {
                console.log('Image uploaded successfully!');
                alert('Image uploaded successfully!');

                // Update product data to reflect the change (consider refetching data)
                // ... (implementation details)
            } else {
                console.error('Error uploading image:', await response.text());
                alert('Error uploading image: must be less than 60kb');
                // Handle upload error (e.g., display an error message)
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading image: 5 max');
            // Handle errors (e.g., network issues)
        }
    };

    //
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(GetAllProductDataapi+ProductId, {

                });

                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                setName(data.data.product.name)
                setarabicName(data.data.product.arabicName)
                setfrenchName(data.data.product.frenchName)
                setAbout(data.data.product.about)
                setWeight(data.data.product.weight)
                setarabicAbout(data.data.product.arabicAbout)
                setfrenchAbout(data.data.product.frenchAbout)
                setDescription(data.data.product.description)
                setarabicDescription(data.data.product.arabicDescription)
                setfrenchDescription(data.data.product.frenchDescription)
                setcategoryId(data.data.product.categoryId)
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
            const response = await fetch(UpdateProductDataapi+ProductId, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Authurization}`, // Include token with Bearer prefix
                },
                body: JSON.stringify({
                    englishName,
                    weight,
                    englishDescription,
                    englishAbout,
                    priceBeforeDiscount,
                    stockQuantity,
                    categoryId,
                    afterDiscount,
                    discount,
                    arabicName,
                    arabicDescription,
                    arabicAbout,
                    frenchName,
                    frenchDescription,
                    frenchAbout,
                    frenchTags,
                    arabicTags, 
                    englishTags
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                console.log(Authurization);
            }
            setcategoryId('');
            setDiscount('');
            setAbout('');
            setName('');
            setWeight('')
            setarabicDescription('');
            setDescription('');
            setfrenchDescription('');
            setarabicAbout('');
            setfrenchAbout('');
            setarabicName('');
            setfrenchName('');
            setprice('');
            setpriceAfterDiscount('');
            setstockQuantity('');


                alert('Product edited successfully:)');
            

            console.log('Product edited successfully:', data);

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
        const response = await fetch(`${DeleteProductImgapi}${productId}/${pictureUUID}`, {
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
                                <div className='grid justify-center items-center gap-3'>
                                <div className="input-container">
                                    <input
                                        className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                        type="text"
                                        value={tagValue}
                                        placeholder='English HashTags#'
                                        onChange={handleTagInputChange}
                                        onKeyDown={addTag}
                                    />
                                <ul className="tags-list flex gap-2 m-2">
                                    {englishTags.map((tag) => (
                                        <li key={tag} className="tag  px-2 pb-1.5 bg-slate-600 rounded-lg cursor-pointer">
                                            {tag}
                                            &nbsp;&nbsp;
                                            <button className=' text-gray-400 text-[22px]' type="button" onClick={() => handleTagRemoval(tag)}>
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                    {suggestions.data != null && (
                                        <ul className="suggestions-list flex gap-2 m-2 bg-slate-700 rounded-lg p-2">
                                            {suggestions.data.filter((product) => {
                                                return tagValue.toLocaleLowerCase() === '' ? "" : product.toLocaleLowerCase().includes(tagValue)
                                            }).map((suggestion) => (
                                                <li
                                                    key={suggestion}
                                                    className="suggestion p-2 bg-slate-600 rounded-lg cursor-pointer flex-wrap" 
                                                    onClick={() => handleTagSelection(suggestion)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        <div className='grid justify-center items-center gap-3'>
                                <div className="input-container">
                                    <input
                                        className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                        type="text"
                                        value={tagValueA}
                                        placeholder='Arabic HashTags#'
                                        onChange={handleTagInputChangeA}
                                        onKeyDown={addTagA}
                                    />
                                <ul className="tags-list flex gap-2 m-2">
                                    {arabicTags.map((tag) => (
                                        <li key={tag} className="tag  px-2 pb-1.5 bg-slate-600 rounded-lg cursor-pointer">
                                            {tag}
                                            &nbsp;&nbsp;
                                            <button className=' text-gray-400 text-[22px]' type="button" onClick={() => handleTagRemovalA(tag)}>
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                    {suggestions.data != null && (
                                        <ul className="suggestions-list flex gap-2 m-2 bg-slate-700 rounded-lg p-2">
                                            {suggestions.data.filter((product) => {
                                                return tagValueA.toLocaleLowerCase() === '' ? "" : product.toLocaleLowerCase().includes(tagValueA)
                                            }).map((suggestion) => (
                                                <li
                                                    key={suggestion}
                                                    className="suggestion p-2 bg-slate-600 rounded-lg cursor-pointer flex-wrap" 
                                                    onClick={() => handleTagSelectionA(suggestion)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className='grid justify-center items-center gap-3'>
                                <div className="input-container">
                                    <input
                                        className='bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                        type="text"
                                        value={tagValueF}
                                        placeholder='French HashTags#'
                                        onChange={handleTagInputChangeF}
                                        onKeyDown={addTagF}
                                    />
                                <ul className="tags-list flex gap-2 m-2">
                                    {frenchTags.map((tag) => (
                                        <li key={tag} className="tag  px-2 pb-1.5 bg-slate-600 rounded-lg cursor-pointer">
                                            {tag}
                                            &nbsp;&nbsp;
                                            <button className=' text-gray-400 text-[22px]' type="button" onClick={() => handleTagRemovalF(tag)}>
                                                &times;
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                                    {suggestions.data != null && (
                                        <ul className="suggestions-list flex gap-2 m-2 bg-slate-700 rounded-lg p-2">
                                            {suggestions.data.filter((product) => {
                                                return tagValueF.toLocaleLowerCase() === '' ? "" : product.toLocaleLowerCase().includes(tagValueF)
                                            }).map((suggestion) => (
                                                <li
                                                    key={suggestion}
                                                    className="suggestion p-2 bg-slate-600 rounded-lg cursor-pointer flex-wrap" 
                                                    onClick={() => handleTagSelectionF(suggestion)}
                                                >
                                                    {suggestion}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
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
                                            <input id="isDiscount" type="checkbox" onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" ></input>{/*onChange={handleAfterDiscountChange}*/}
                                            <input placeholder='After Discount:' className='bg-[#2b2e38]  px-2 py-2 rounded-xl border w-[250px] border-[#41434d] focus:outline outline-[#41434d]' type="number" id="afterDiscount" name="afterDiscount" onChange={handleInputChange} min="0" step="0.01" />
                                        </div>

                                        <div className="flex items-center justify-center gap-2 max-[524px]:grid">
                                            <input placeholder='Weight:' className=' bg-[#2b2e38] px-2 py-2 rounded-xl w-[150px] max-[524px]:w-[350px] border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="weight" name="weight" onChange={(e) => setWeight(e.target.value)} min="0" step="0.01" required /> {/*onChange={handleChange}*/}
                                            <input placeholder='Price:' className='bg-[#2b2e38] px-2 py-2 rounded-xl w-[150px] max-[524px]:w-[350px] border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="priceBeforeDiscount" name="priceBeforeDiscount" onChange={(e) => setprice(e.target.value)} min="0" step="0.01" required /> {/*onChange={handleChange}*/}
                                            <input placeholder='Stock Quantity:' className='bg-[#2b2e38] px-2 py-2 w-[150px] max-[524px]:w-[350px]  rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="stockQuantity" name="stockQuantity" onChange={(e) => setstockQuantity(e.target.value)} min="0" required /> {/*onChange={handleChange}*/}
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
                                        <ReactQuill placeholder='Description: (AR)' className='text-black bg-[#ffffff] max-[1815px]:w-[800px]  w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="arabicDescription"
                                            id="arabicDescription"
                                            value={arabicDescription}
                                            onChange={handleArabicDescriptionChange} required />
                                        <ReactQuill placeholder='Description: (EN)' className='text-black bg-[#ffffff] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="englishDescription"
                                            id="englishDescription"
                                            value={englishDescription}
                                            onChange={handleEnglishDescriptionChange} required />
                                        <ReactQuill placeholder='Description: (FR)' className='text-black bg-[#ffffff] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="frenchDescription"
                                            id="frenchDescription"
                                            value={frenchDescription}
                                            onChange={handleFrenchDescriptionChange} required />
                                    </div>
                                    {/* <ReactQuill theme="snow" value={value} onChange={setValue} /> */}
                                    <div className='grid justify-center items-center gap-3'>
                                        <textarea placeholder='About: (AR)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="arabicAbout"
                                            id="arabicAbout"
                                            value={arabicAbout}
                                            onChange={(e) => setarabicAbout(e.target.value)} />
                                        <textarea placeholder='About: (EN)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="englishAbout"
                                            id="englishAbout"
                                            value={englishAbout}
                                            onChange={(e) => setAbout(e.target.value)} />
                                        <textarea placeholder='About: (FR)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                            name="frenchAbout"
                                            id="frenchAbout"
                                            value={frenchAbout}
                                            onChange={(e) => setfrenchAbout(e.target.value)} />
                                    </div>

                                    <div>
                                        <input value="Upedate Product" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer mb-10" type="submit" />
                                    </div>
                                </form>
                                <div className='grid 2xl:flex 2xl:justify-start justify-center  items-center gap-4'>
                                    {productData.data.product.pictures.map((picture, index) => (
                                        <div key={index} className=''>
                                            <img key={index} src={picture} alt={`picture`} className="product-image rounded-lg w-[270px]" />
                                            <button key={index} className='bg-red-500 rounded-md mt-4 px-2 py-1 mb-10' onClick={() => { handleDeleteImage(productData.data.product.productId, picture.substring(picture.lastIndexOf("/") + 1)); }}>Delete</button>
                                        </div>


                                    ))}
                                </div>
                                {
                                    productData.data.product.pictures.length !== 5 ? (

                                        <div className='grid justify-center items-center gap-3 '>
                                            <label className="block mb-2 text-sm font-medium text-white translate-y-1" htmlFor="imageUpload">Select Image:</label>
                                            <input type="file"
                                                onChange={handleImageChange}
                                                id="imageUpload"// Restrict file types to images
                                                className=" bg-slate-700 text-black text-sm file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[#8465F2] file:hover:bg-[#5735d1] file:text-white rounded" required accept="image/*" />
                                            <button className=' cursor-pointer bg-green-600 rounded-md px-2 py-1' onClick={handleImageUpload} disabled={!selectedFile}>Upload Image</button>
                                        </div>
                                    ) : (
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