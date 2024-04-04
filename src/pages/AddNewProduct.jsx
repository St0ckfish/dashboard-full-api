import React, { useState, useEffect } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { getAllCategory, getTagsUrl } from '../api/Api';
import { AddProduct } from '../api/Api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
    const [priceBeforeDiscount, setprice] = useState('');
    const [weight, setWeight] = useState('');
    const [stockQuantity, setstockQuantity] = useState('');
    const [priceAfterDiscount, setpriceAfterDiscount] = useState('');
    const [discount, setisDiscount] = useState(false);
    const [options, setOptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
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
        setenglishDescription(content);
    };
    const handleArabicDescriptionChange = (content) => {
        setarabicDescription(content);
    };
    const handleFrenchDescriptionChange = (content) => {
        setfrenchDescription(content);
    };
    const handleImageChange = (event) => {
        const newImages = event.target.files;

        // Validate image count and size
        if (newImages.length > 5) {
            alert('Error: Maximum 5 images allowed.');
            return;
        }

        const validImages = Array.from(newImages) // Convert FileList to array for validation
            .filter((image) => image.size <= 61440); // Maximum 30 KB per image (30 * 1024 bytes)

        if (validImages.length !== newImages.length) {
            alert('Error: Some images exceed the 60 KB size limit.');
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

    const handleInputChange = (event) => {
        setpriceAfterDiscount(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        event.target.checked ? true : false
        setisDiscount(event.target.checked);
        if (!event.target.checked === false) {
            setpriceAfterDiscount(0);
        }
    };

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

        const productData = { arabicName, englishName, frenchName, arabicDescription, englishDescription, frenchDescription, arabicAbout, englishAbout, frenchAbout, categoryId, priceBeforeDiscount, weight, discount, priceAfterDiscount, stockQuantity,frenchTags,arabicTags, englishTags }
        const formData = new FormData();
        formData.append('product', JSON.stringify(productData));

        for (let i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            const customName = `images`; // names like image1, image2, etc.
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
            setWeight('');
            setstockQuantity('');
            setpriceAfterDiscount('');
            setisDiscount('');
            setSelectedImages(null)
            alert('Product created successfully:)')

            console.log('Product created successfully:', data);

        } catch (error) {
            console.error('Error submitting form:', error);
        }

        if (!categoryId) {
            console.error('Error: No category selected. Please choose a category.');
            return; // Prevent sending the request if category is not selected
        }
        console.log('Authorization token:', authorizationToken);
    };
    console.log(suggestions);

    return (
        <>
            <div className="">

                <NavBar />

                <div className='text-white grid justify-center items-center py-20 w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>

                    <div className='bg-[#1F2937] w-[1300px] max-[1815px]:translate-y-11 p-7 items-center grid translate-y-8 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[450px] max-[1278px]:w-[900px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[300px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>

                    <div className='grid justify-center items-center gap-3'>
                        <h1 className='font-bold text-[25px]'>Add Product</h1>
                    </div>

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
                                    onChange={(e) => setenglishName(e.target.value)} required />
                                <input placeholder='Product Name: (FR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                    name="frenchName"
                                    id="frenchName"
                                    value={frenchName}
                                    onChange={(e) => setfrenchName(e.target.value)} required />
                            </div>

                            <div className='flex justify-center items-center gap-3 max-[1815px]:grid'>
                                <div className='flex items-center gap-2'>
                                    <label htmlFor="discount" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Is Discount?</label>
                                    <input id="discount" type="checkbox" onChange={handleCheckboxChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" ></input>{/*onChange={handleAfterDiscountChange}*/}
                                    <input placeholder='After Discount:' className='bg-[#2b2e38] w-[250px]  px-2 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="number" id="afterDiscount" name="afterDiscount" onChange={handleInputChange} min="0" step="0.01" />
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
                                    onChange={(e) => setenglishAbout(e.target.value)} />
                                <textarea placeholder='About: (FR)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
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