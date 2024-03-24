import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Select from 'react-select';
import { Authurization } from '../api/Api';
import axios from 'axios';

const AllCoupons = () => {
    return (  
        <>
        <div>
            <NavBar/>
        </div>
        </>
    );
}
 
export default AllCoupons;