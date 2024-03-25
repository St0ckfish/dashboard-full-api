import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization ,getAllCategorysapi,DeleteCategoryBtn,GetAllCategoryDataapi,UpdateAllCategoryDataapi} from '../api/Api';
import { Link } from 'react-router-dom';

const UpdateCategory = () => {
    const [productData, setProductData] = useState(null);
    const [productData2, setProductData2] = useState(null);
    const [idcategory, setIdcategory] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [name, setName] = useState('');
    const [arabicName, setarabicName] = useState('');
    const [frenchName, setfrenchName] = useState('');
    const [arabicDescription, setArabicDescription] = useState('');
    const [description, setDescription] = useState('');
    const [frenchDescription, setFrenchDescription] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = (index) => {
        setIsOpen(isOpen === index ? null : index)
    }


    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(getAllCategorysapi, {
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                // console.log('Authorization token:', authorizationToken);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors gracefully (e.g., display an error message)
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);


    const handleProductStatusChange = async (categoryId, currentStatus) => {
        const newStatus = currentStatus === 'active' ? 'delete' : 'active';
        const apiEndpoint = DeleteCategoryBtn+categoryId;

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
                alert('You cant Delete this Category')
                // Handle errors gracefully 
            }

            else {
                // Update product data locally (assuming success)
                setProductData(prevState => ({
                    ...prevState,
                    data: {
                        mainCategories: prevState.data.mainCategories.map(product =>
                            product.categoryId === categoryId ? { ...product, status: newStatus } : product
                        )
                    }
                }));
            }
            if (response.ok) {

                alert('Category Deleted successful')
            }
        } catch (error) {
            console.error('Error delete product status:', error);
            // Handle errors gracefully
        }
    };




        const fetchData2 = async (categoryId) => {
            setIsLoading2(true); // Set loading state to true

            try {
                const response2 = await fetch(GetAllCategoryDataapi+categoryId, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                    }
                });
                const data2 = await response2.json();
                console.log(data2);
                setProductData2(data2); // Update product data
                setArabicDescription(data2.data.category.arabicDescription)
                setDescription(data2.data.category.description)
                setFrenchDescription(data2.data.category.frenchDescription)
                setarabicName(data2.data.category.arabicName)
                setName(data2.data.category.name)
                setfrenchName(data2.data.category.frenchName)
                // console.log('Authorization token:', authorizationToken);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors gracefully (e.g., display an error message)
            } finally {
                setIsLoading2(false); // Set loading state to false
            }
        };

        // fetchData2();



    const handleSubmit = async (event) => {  //2update new
        event.preventDefault();
        try {
            const response = await fetch(UpdateAllCategoryDataapi+idcategory, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${Authurization}`, // Include token with Bearer prefix
                },
                body: JSON.stringify({
                    name,
                    arabicName,
                    frenchName,
                    description,
                    arabicDescription,
                    frenchDescription,
                }),
            });

            const data = await response.json();
            if (!response.ok) {
                console.log(data);
                console.log(Authurization);
            }

            setarabicName('');
            setName('');
            setfrenchName('');
            setArabicDescription('');
            setDescription('');
            setFrenchDescription('');


            alert('Main Category Updated successfully:)');


            console.log('Main Category Updated successfully:)', data);

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    // console.log(idcategory);
    return (
        <>
            <div>
                <NavBar />
                <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>
                    <div>
                        {isLoading ? (
                            <p>Loading product details...</p>
                        ) : productData ? (
                            // Display fetched product details 
                            <div className='grid gap-6'>
                                {productData.data.mainCategories.map((product,index) => (
                                    <div className=' justify-center text-left max-[1700px]:text-center bg-[#1F2937] w-[1400px] max-[1815px]:translate-y-20 px-7 py-2 items-center grid grid-cols-2 translate-y-28 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24 max-[1736px]:w-[1200px]  rounded-xl border border-[#41434d] shadow-[#2c4157] max-[1536px]:w-[1000px] shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px] max-[1266px]:w-[850px] max-[1130px]:translate-x-[400px] max-[1200px]:w-[700px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'
                                        key={index}>
                                        <div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>Name: </span>
                                                <h1 className=' text-gray-300'> {product.name}</h1>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='font-bold text-[20px]'>ID: </span>
                                                <h3 className='text-gray-300'>{product.categoryId}</h3>
                                            </div>
                                        </div>
                                        <div className='grid justify-end  gap-3'>
                                            <div className='flex justify-center'>
                                                <button className='px-3 py-1 rounded-md bg-red-600 text-white' onClick={() => {
                                                    handleProductStatusChange(product.categoryId, product.status);
                                                    // Call notify after status change
                                                }}>{product.status === 'active' ? 'Done' : 'Delete'}</button>
                                            </div>
                                            <div className='flex justify-center'>
                                                <button onClick={() => {toggleNavbar(index);fetchData2(product.categoryId);setIdcategory(product.categoryId)}} className='px-3 py-1 rounded-md bg-blue-800 text-white '>Update Category</button>
                                            </div>
                                        </div>
                                        {

                                            isOpen === index && (
                                            
                                            <div key={product.categoryId} className=' flex justify-center items-center text-center translate-x-[350px] m-3 max-[1536px]:translate-x-[250px] max-[1266px]:translate-x-[210px] max-[724px]:translate-x-[120px] max-[519px]:translate-x-[90px] max-[408px]:translate-x-[80px]'>
                                                <form className='grid justify-center  gap-6 grid-cols-1' onSubmit={handleSubmit}>
                                                    <div className='grid text-center justify-center items-center'>
                                                        <h1 className='font-bold text-[25px] whitespace-nowrap text-center'>Update Category</h1>
                                                    </div>
                                                    <div className="flex justify-center items-center gap-3 max-[1815px]:grid">
                                                        <input placeholder='Category Name: (AR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                            name="arabicName"
                                                            id="arabicName"
                                                            value={arabicName}
                                                            onChange={(e) => setarabicName(e.target.value)} required />
                                                        <input placeholder='Category Name: (EN)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                            name="name"
                                                            id="name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)} required />
                                                        <input placeholder='Category Name: (FR)' className='bg-[#2b2e38] w-[350px] px-6 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d]' type="text"
                                                            name="frenchName"
                                                            id="frenchName"
                                                            value={frenchName}
                                                            onChange={(e) => setfrenchName(e.target.value)} required />
                                                    </div>

                                                    <div className="flex justify-center items-center gap-3 max-[1815px]:grid">
                                                        <textarea placeholder='Description: (AR)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                                            name="arabicDescription"
                                                            id="arabicDescription"
                                                            value={arabicDescription}
                                                            onChange={(e) => setArabicDescription(e.target.value)} />
                                                        <textarea placeholder='Description: (EN)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                                            name="description"
                                                            id="description"
                                                            value={description}
                                                            onChange={(e) => setDescription(e.target.value)} />
                                                        <textarea placeholder='Description: (FR)' className=' bg-[#2b2e38] max-[1815px]:w-[800px] w-[1070px] px-8 py-2 rounded-xl border border-[#41434d] focus:outline outline-[#41434d] max-[1200px]:w-[500px] max-[724px]:w-[350px]'
                                                            name="frenchDescription"
                                                            id="frenchDescription"
                                                            value={frenchDescription}
                                                            onChange={(e) => setFrenchDescription(e.target.value)} />
                                                    </div>

                                                    <div>
                                                        <input value="Update Categoty" className="w-[150px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" type="submit" />
                                                    </div>
                                                </form>
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

export default UpdateCategory;