import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { useParams } from 'react-router-dom'; // Import useParams hook

const OrderPreview = () => {
    const [productData, setProductData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { OrderId } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Set loading state to true

            try {
                const response = await fetch(`https://api.vitaparapharma.com/api/v2/user/order/${OrderId}`, {
                    headers: {
                        Authorization: `Bearer ${Authurization}`,
                        Accept: 'application/json', // Assuming JSON response
                        'Accept-Language': 'en' // Set language preference to English
                    }
                });
                const data = await response.json();
                console.log(data);
                setProductData(data); // Update product data
                console.log(productData);
                // console.log('Authorization token:', Authurization);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle errors gracefully (e.g., display an error message)
            } finally {
                setIsLoading(false); // Set loading state to false
            }
        };

        fetchData();
    }, []);
    return ( 
        <>
            <div>
                <NavBar/>
                <div>
                </div>
            </div>
        </>
    );
}

export default OrderPreview;