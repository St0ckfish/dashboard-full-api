import React, { useEffect, useState } from 'react';
import { Authurization } from '../api/Api';
import NavBar from '../components/NavBar';
import ReactQuill from 'react-quill';

const GetAllAdvertisements = () => {
    const [selectedImages, setSelectedImages] = useState([]);
    const [targetUrl, settargetUrl] = useState('');
    const [startDate, setstartDate] = useState('');
    const [endDate, setendDate] = useState('');
    const [title, setTitle] = useState('');
    const [arabicTitle, setarabicTitle] = useState('');
    const [frenchTitle, setfrenchTitle] = useState('');
    const [arabicDescription, setArabicDescription] = useState('');
    const [description, setDescription] = useState('');
    const [frenchDescription, setFrenchDescription] = useState('');
    const [productData, setProductData] = useState(null);
    const [productData2, setProductData2] = useState(null);
    const [productData3, setProductData3] = useState(null);
    const [idcategory, setIdcategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [advertisementStatus, setSelectedOption] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData3 = async () => {
            setIsLoading3(true); // Set loading state to true

            try {
                const response = await fetch('https://api.vitaparapharma.com/api/v1/custom/advertisement/status/all', {
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
        setSelectedOption(e.target.value);
        sendSelectedOptionToSecondAPI(e.target.value);
    };

    const sendSelectedOptionToSecondAPI = async (selectedValue) => {
        try {
            const response = await fetch('https://api.vitaparapharma.com/api/v1/custom/advertisement/status', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Authurization}`,
                },
                body: JSON.stringify({

                    advertisementStatus: selectedValue,
                    advertisementId: idcategory,

                }),
            });
            const responseData = await response.json();
            console.log('Response from second API:', responseData);
        } catch (error) {
            console.error('Error sending data to second API:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    const toggleNavbar = (index) => {
        setIsOpen(isOpen === index ? null : index)
    }


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch('https://api.vitaparapharma.com/api/v1/public/advertisement/all', {
                });
                const data = await response.json();
                console.log(data);
                setProductData(data);

            } catch (error) {
                console.error('Error fetching data:', error);

            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);


    const fetchData2 = async (categoryId) => {
        setIsLoading2(true); // Set loading state to true

        try {
            const response2 = await fetch(`https://api.vitaparapharma.com/api/v2/custom/advertisement/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                }
            });
            const data2 = await response2.json();
            console.log(data2);
            setProductData2(data2); // Update product data
            settargetUrl(data2.data.advertisement.targetUrl)
            setDescription(data2.data.advertisement.description)
            setFrenchDescription(data2.data.advertisement.frenchDescription)
            setArabicDescription(data2.data.advertisement.arabicDescription)
            setstartDate(data2.data.advertisement.startDate)
            setendDate(data2.data.advertisement.endDate)
            setarabicTitle(data2.data.advertisement.arabicTitle)
            setTitle(data2.data.advertisement.title)
            setfrenchTitle(data2.data.advertisement.frenchTitle)

        } catch (error) {
            console.error('Error fetching data:', error);

        } finally {
            setIsLoading2(false); // Set loading state to false
        }
    };


    const handleProductStatusChange = async (categoryId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'delete' : 'active';
        const apiEndpoint = `https://api.vitaparapharma.com/api/v1/custom/advertisement/delete/${categoryId}`;

        try {
            const response = await fetch(apiEndpoint, {
                method: 'DELETE', // Use POST for status updates
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    Accept: 'application/json',
                    'Accept-Language': 'en'
                }
            });

            if (!response.ok) {
                console.error('Error delete product status:', response);
                alert('You cant Delete this advertisement')
                // Handle errors gracefully 
            }

            else {
                // Update product data locally (assuming success)
                setProductData(prevState => ({
                    ...prevState,
                    data: {
                        advertisements: prevState.data.advertisements.map(product =>
                            product.categoryId === categoryId ? { ...product, statush: newStatus } : product
                        )
                    }
                }));
            }
            if (response.ok) {

                alert('advertisement Deleted successful')
            }
        } catch (error) {
            console.error('Error delete product status:', error);
            // Handle errors gracefully
        }
    };


    const handleSubmit = async (event) => {  //2update new
        event.preventDefault();
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v2/custom/advertisement/update/${idcategory}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    targetUrl,
                    startDate,
                    endDate,
                    title,
                    arabicTitle,
                    frenchTitle,
                    description,
                    arabicDescription,
                    frenchDescription,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                console.log(Authurization);

                settargetUrl("")
                setDescription("")
                setFrenchDescription("")
                setArabicDescription("")
                setstartDate("")
                setendDate("")
                setarabicTitle("")
                setTitle("")
                setfrenchTitle("")

                alert('Advertisement Updated successfully:)');


                console.log('Advertisement Updated successfully:)', data);

            }
            console.log(data);
            console.log(Authurization);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    // console.log(idcategory);


    const handleDeleteImage = async (productId) => {
        const response = await fetch(`https://api.vitaparapharma.com/api/v1/custom/advertisement/picture/delete/${productId}`, {
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


    const handleImageChange = (event) => {
        setSelectedImages(event.target.files[0]); // Access the first selected file
    };
    const handleImageUpload = async () => {
        if (!selectedImages) {
            return alert('Please select an image to upload.');
        }
        const formData = new FormData();
        formData.append('image', selectedImages);
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/custom/advertisement/picture/add/${idcategory}`, {
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
                alert('Advertisement picture is not empty');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error uploading image: 1 max');
            // Handle errors (e.g., network issues)
        }
    };

    return (
        <>
            <div>
                <NavBar />
                <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>
                    <div>
                        {isLoading ? (
                            <p>Loading Advertisement details...</p>
                        ) : productData ? (
                            // Display fetched product details 
                            <div className='grid gap-6'>
                                {productData.data.advertisements.map((product, index) => (
                                    <div className=' justify-center text-left max-[1700px]:text-center bg-[#1F2937] w-[1400px] max-[1815px]:translate-y-20 px-7 py-2 items-center grid grid-cols-2 translate-y-28 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px] max-[1266px]:w-[850px] max-[1130px]:translate-x-[400px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'
                                        key={index}>
                                        <div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Title: </span>
                                                <h1 className=' text-gray-300'> {product.title}</h1>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>ID: </span>
                                                <h3 className='text-gray-300'>{product.adId}</h3>
                                            </div>
                                        </div>
                                        <div className='grid justify-end  gap-3'>
                                            <div className='flex justify-center'>
                                                <button className='px-3 py-1 rounded-md bg-red-600 text-white' onClick={() => {
                                                    handleProductStatusChange(product.adId, product.statush);
                                                    // Call notify after status change
                                                }}>{product.status === 'active' ? 'Done' : 'Delete'}</button>
                                            </div>

                                            <div className='flex justify-center'>
                                                <button onClick={() => { toggleNavbar(index); fetchData2(product.adId); setIdcategory(product.adId) }} className='px-3 py-1 rounded-md bg-blue-800 text-white '>Update Category</button>
                                            </div>
                                        </div>
                                        {

                                            isOpen === index && (

                                                <div key={product.categoryId} className=' grid justify-center items-center text-center translate-x-[330px] m-3 max-[1536px]:translate-x-[250px] max-[1266px]:translate-x-[210px] max-[724px]:translate-x-[120px] max-[519px]:translate-x-[90px] max-[408px]:translate-x-[80px]'>
                                                    <form className='grid justify-center text-center gap-6 grid-cols-1' onSubmit={handleSubmit}>
                                                        <div className='grid text-center justify-center items-center'>
                                                            <h1 className='font-bold text-[25px] whitespace-nowrap text-center'>Update Advertisment</h1>
                                                        </div>

                                                        <div className='grid justify-cebter  gap-3'>
                                                            <p>{product.status}</p>
                                                            {isLoading3 ? <p>Loading product details...</p> :

                                                                <select value={advertisementStatus} onChange={handleSelectChange} className='text-black p-2 rounded-md outline-none'>
                                                                    <option className='font-bold text-blue-700' value={product.status}>{product.status}</option>
                                                                    {productData3.data.statuses.map((option) => (
                                                                        <option key={option} value={option}>
                                                                            {option}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            }
                                                        </div>

                                                        <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                                            <input placeholder='Target Url' className='bg-[#2b2e38] w-[1070px] max-[1736px]:w-[1000px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                                name="targetUrl"
                                                                id="targetUrl"
                                                                value={targetUrl}
                                                                onChange={(e) => settargetUrl(e.target.value)} required />
                                                            <label
                                                                htmlFor="startDate"
                                                                className="block text-sm font-medium"
                                                            >
                                                                Start Date
                                                            </label>
                                                            <input placeholder='Start Date' className='bg-[#2b2e38] w-[1070px] max-[1736px]:w-[1000px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                                name="startDate"
                                                                id="startDate"
                                                                value={startDate}
                                                                onChange={(e) => setstartDate(e.target.value)} required />
                                                            <label
                                                                htmlFor="endDate"
                                                                className="block text-sm font-medium"
                                                            >
                                                                End Date
                                                            </label>
                                                            <input placeholder='End Date' className='bg-[#2b2e38] w-[1070px] max-[1736px]:w-[1000px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                                name="endDate"
                                                                id="endDate"
                                                                value={endDate}
                                                                onChange={(e) => setendDate(e.target.value)} required />
                                                        </div>

                                                        <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                                            <input placeholder='Arabic Title' className='bg-[#2b2e38] w-[1070px] max-[1736px]:w-[1000px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                                name="arabicTitle"
                                                                id="arabicTitle"
                                                                value={arabicTitle}
                                                                onChange={(e) => setarabicTitle(e.target.value)} required />

                                                            <input placeholder='English Title' className='bg-[#2b2e38] w-[1070px] max-[1736px]:w-[1000px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                                name="title"
                                                                id="title"
                                                                value={title}
                                                                onChange={(e) => setTitle(e.target.value)} required />

                                                            <input placeholder='French Title' className='bg-[#2b2e38] w-[1070px] max-[1736px]:w-[1000px] max-[1536px]:w-[900px] max-[1278px]:w-[700px] max-[1200px]:w-[500px] max-[724px]:w-[300px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                                name="frenchTitle"
                                                                id="frenchTitle"
                                                                value={frenchTitle}
                                                                onChange={(e) => setfrenchTitle(e.target.value)} required />
                                                        </div>

                                                        <div className="grid justify-center items-center gap-3 max-[1815px]:grid">
                                                            <label
                                                                htmlFor="arabicDescription"
                                                                className="block text-sm font-medium"
                                                            >
                                                                Arabic
                                                            </label>
                                                            <ReactQuill placeholder='Description: (AR)' className=' bg-[#ffffff] text-black max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                                                name="arabicDescription"
                                                                id="arabicDescription"
                                                                onChange={setArabicDescription}
                                                                value={arabicDescription} />
                                                            <label
                                                                htmlFor="description"
                                                                className="block text-sm font-medium"
                                                            >
                                                                English
                                                            </label>
                                                            <ReactQuill placeholder='Description: (EN)' className=' bg-[#ffffff] text-black max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                                                name="description"
                                                                id="description"
                                                                value={description}
                                                                onChange={setDescription} />
                                                            <label
                                                                htmlFor="frenchDescription"
                                                                className="block text-sm font-medium"
                                                            >
                                                                French
                                                            </label>
                                                            <ReactQuill placeholder='Description: (FR)' className=' bg-[#ffffff] text-black max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                                                name="frenchDescription"
                                                                id="frenchDescription"
                                                                value={frenchDescription}
                                                                onChange={setFrenchDescription} />
                                                        </div>

                                                        <div>
                                                            <input value="Update Advertisement" className="w-[200px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit" />
                                                        </div>
                                                    </form>

                                                        <div className='m-5'>

                                                        {isLoading2 ? <p>Loading product details...</p> :

                                                            <div className='grid 2xl:flex 2xl:justify-center justify-center  items-center gap-4'>
                                                                {
                                                                    productData2.data.advertisement.imgUrl === "" ? (
                                                                        <div className='grid justify-center items-center gap-3 '>
                                                                            <label className="block mb-2 text-sm font-medium text-white translate-y-1" htmlFor="imageUpload">Select Image:</label>
                                                                            <input type="file"
                                                                                onChange={handleImageChange}
                                                                                id="imageUpload"// Restrict file types to images
                                                                                className=" bg-slate-700 text-black text-sm file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4 file:bg-[#8465F2] file:hover:bg-[#5735d1] file:text-white rounded" required accept="image/*" />
                                                                            <button className=' cursor-pointer bg-green-600 rounded-md px-2 py-1' onClick={handleImageUpload} disabled={!selectedImages}>Upload Image</button>
                                                                        </div>

                                                                    ) : (
                                                                        <div className=''>
                                                                            <img src={productData2.data.advertisement.imgUrl} alt={`picture`} className="product-image rounded-lg w-[270px]" />
                                                                            <button className='bg-red-500 rounded-md mt-4 px-2 py-1 mb-10' onClick={() => { handleDeleteImage(productData2.data.advertisement.adId) }} >Delete</button>
                                                                        </div>
                                                                    )
                                                                }
                                                            </div>
                                                        }
                                                        </div>
                                                </div>)}
                                        {/* <p>{product.description}</p> */}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>No product data found.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default GetAllAdvertisements;