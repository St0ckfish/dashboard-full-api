import React from 'react';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch('https://api.vitaparapharma.com/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    phone,
                    password,
                }),
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            // Handle successful login (e.g., store token, redirect to protected route)
            console.log('Login successful'); // Assuming you have a mechanism to handle the response in your application

            // Store authentication state or token on successful login (implementation depends on your app)

            navigate('/home'); // Replace with your desired protected route

        } catch (error) {
            console.error('Login error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className='grid justify-center  w-screen h-screen items-center '>
            <div className="  flex justify-center items-center  max-[880px]:h-full max-[880px]:p-2 bg-[#1A1C23] rounded-xl p-5">
                <div className="flex justify-center items-center gap-5 max-[880px]:grid max-[880px]:p-2">
                    <div className="flex justify-center items-center">
                        <img className="h-[600px] rounded" src="/images/login-office-dark.jpeg" alt="#" />
                    </div>

                    <div className="flex justify-center items-center">
                        <form className="grid gap-7" onSubmit={handleSubmit}>
                            <div className="grid justify-start">
                                <h1 className="text-white font-bold text-[27px]">Login</h1>
                            </div>
                            <div className="grid gap-2 justify-items-start">
                                <label htmlFor="email" className="text-gray-300 font-bold">Email</label>
                                <input
                                autoComplete="off"
                                    type="email"
                                    name="email"
                                    id="email"
                                    className="px-[110px] py-2 rounded-md bg-[#2b2e38] border border-[#41434d] focus:outline outline-[#41434d] text-white"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2 justify-items-start">
                                <label htmlFor="phone" className="text-gray-300 font-bold">Phone</label>
                                <input
                                autoComplete="off"
                                    type="phone"
                                    name="phone"
                                    id="phone"
                                    className="px-[110px] py-2 rounded-md bg-[#2b2e38] border border-[#41434d] focus:outline outline-[#41434d] text-white"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid gap-2 justify-items-start">
                                <label htmlFor="password" className="text-gray-300 font-bold">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="px-[110px] py-2 rounded-md bg-[#2b2e38] border border-[#41434d] focus:outline outline-[#41434d] text-white"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            {error && <div className="text-red-500">{error}</div>}
                            <div>
                                <button type="submit" className="px-[140px] py-2 bg-[#8465F2] rounded text-white cursor-pointer" disabled={isLoading}>
                                    {isLoading ? 'Loading...' : 'Log in'}
                                </button>
                            </div>
                            <hr />
                        </form>
                    </div>


                </div>
            </div>
            </div>
        </>
    );
}

export default Login;