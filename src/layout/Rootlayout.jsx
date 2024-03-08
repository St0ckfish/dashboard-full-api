import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '../components/NavBar';


const Rootlayout = () => {
    return ( 
        <>
            <Outlet/>
        </>
    );
}

export default Rootlayout;