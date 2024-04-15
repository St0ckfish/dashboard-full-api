import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams hook
import { Authurization } from '../api/Api';


const ViewReview = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [productData, setProductData] = useState(null);
    const navigate = useNavigate();
    const { ReviewId } = useParams()
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v1/public/review/` + ReviewId, {

                });

                const data = await response.json();
                console.log(data);
                setProductData(data);

            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors gracefully (e.g., display an error message)
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);

    const handleDisable = async () => { 
        try {
            const response = await fetch(`https://api.vitaparapharma.com/api/v1/admin/review/delete/${productData.data.review.reviewId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${Authurization}`,
                    'Content-Type': 'application/json',
                },
                
            });
            const data = await response.json();
            if (response.ok) {
                console.log(data);
                alert('Role Updated successfully:)');
                console.log('Review Deleted successfully:)', data);
                navigate('/report');
                
            }
            console.log(data);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };
    return (
        <>
            <div>
                <NavBar />
                <div className='text-white grid justify-center items-center w-[1800px] max-[1815px]:w-[800px] max-[1563px]:w-[600px] h-screen max-[628px]:w-[200px]'>

                    {isLoading ? (
                        <p>Loading details...</p>
                    ) : productData ? (

                        // <div className='justify-center text-center max-[1700px]:text-center bg-[#1F2937]  max-[1815px]:translate-y-20 px-7 py-2 items-center flex flex-wrap translate-y-28 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24   rounded-xl border border-[#41434d] shadow-[#2c4157]  shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px]  max-[1130px]:translate-x-[400px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                        //     <p>{ productData.data.review.productId }</p>
                        //     <p>{ productData.data.review.rating }</p>
                        //     <p>{ productData.data.review.email }</p>
                        //     <p>{ productData.data.review.comment }</p>
                        // </div>

                        <div className=' justify-center text-center max-[1700px]:text-center bg-[#1F2937]  max-[1815px]:translate-y-20 px-7 py-2 items-center grid translate-y-12 max-[1815px]:translate-x-[600px] max-[1626px]:translate-x-[550px] max-[1563px]:translate-x-[620px]  max-[2000px]:translate-x-24   rounded-xl border border-[#41434d] shadow-[#2c4157]  shadow-2xl max-[1430px]:translate-x-[500px] max-[1306px]:translate-x-[470px]  max-[1130px]:translate-x-[400px] max-[1056px]:translate-x-[340px] max-[964px]:translate-x-[150px] max-[854px]:translate-x-[100px] max-[764px]:translate-x-[70px] max-[724px]:w-[500px] max-[628px]:translate-x-[210px] max-[557px]:translate-x-[160px] max-[519px]:w-[400px] max-[408px]:w-[370px] max-[467px]:translate-x-[105px] max-[392px]:translate-x-[90px]'>
                            <div className=''>
                                <div className='flex items-center gap-3'>
                                    <span className='font-bold text-[20px]'>Product Id: </span>
                                    <h1 className=' text-gray-300'> {productData.data.review.productId}</h1>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <span className='font-bold text-[20px]'>Rate: </span>
                                    <h3 className='text-gray-300'>{productData.data.review.rating}</h3>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <span className='font-bold text-[20px]'>Customer Email: </span>
                                    <h2 className='text-gray-300'>{productData.data.review.email}</h2>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <span className='font-bold text-[20px]'>Comment: </span>
                                    <h2 className='text-gray-300'>{productData.data.review.comment}</h2>
                                </div>
                            </div>
                            <div className='flex justify-center mt-3'>
                                <button onClick={() => handleDisable()} className="block px-4 py-2 text-sm text-gray-700 rounded-md bg-red-500 hover:bg-red-400 dark:hover:bg-red-400 dark:text-gray-200 dark:hover:text-white">Delete</button>
                            </div>
                        </div>

                    ) : (
                        <p>No data found.</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default ViewReview;