import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import { Authurization } from '../api/Api';
import { useParams } from 'react-router-dom'; // Import useParams hook

const OrderPreview = () => {
    const { OrderId } = useParams()
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