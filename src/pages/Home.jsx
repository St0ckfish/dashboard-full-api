import React from 'react';
import NavBar from '../components/NavBar';

const Home = () => {
    return (
        <>
            <NavBar />
            <div>
                <div className="relative h-screen w-screen justify-center">
                    <img src="https://images.unsplash.com/photo-1494783367193-149034c05e8f" alt="Background Image" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
                    <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <h1 className="text-4xl text-white font-bold">Hello, World!</h1>
                        <p className="text-xl text-white mt-4">Welcome In Dashboard</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;