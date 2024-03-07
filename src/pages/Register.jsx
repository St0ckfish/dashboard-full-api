import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
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
            const response = await fetch('https://api.vitaparapharma.com/api/v1/auth/register', {
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

            const data = await response.json();

            // Handle successful registration (e.g., display success message, redirect)
            console.log('Registration successful:', data); // Assuming you have a mechanism to handle the response in your application

            // Redirect to a different route or login page after successful registration
            navigate('/login'); // Replace with your desired route after registration

        } catch (error) {
            console.error('Registration error:', error);
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };
    return (
        <>
            <div className='grid justify-center  w-screen h-screen items-center '>
                <div className="flex justify-center items-center h-[600px] max-[880px]:h-full max-[880px]:p-2 bg-[#1A1C23] rounded-xl p-3">
                    <div className="flex justify-center items-center gap-5 max-[880px]:grid ">
                        <div className="flex justify-center items-center ">
                            <img className="h-[550px] w-[450px] rounded" src="/images/create-account-office-dark.jpeg" alt="#" />
                        </div>

                        <div className="flex justify-center items-center">
                            <form className="grid gap-7" onSubmit={handleSubmit}>
                                <div className="grid justify-start">
                                    <h1 className="text-white font-bold text-[27px]">Create Account</h1>
                                </div>
                                <div className="grid gap-2 justify-items-start">
                                    <label htmlFor="email" className="text-gray-300 font-bold">Email</label>
                                    <input
                                        autoComplete="off"
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="px-10 py-2 rounded-md bg-[#2b2e38] border border-[#41434d] focus:outline outline-[#41434d] text-white"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2 justify-items-start">
                                    <label htmlFor="phone" className="text-gray-300 font-bold">Phone</label>
                                    <input
                                        autoComplete="off"
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        className="px-10 py-2 rounded-md bg-[#2b2e38] border border-[#41434d] focus:outline outline-[#41434d] text-white"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                </div>
                                <div className="grid gap-2 justify-items-start">
                                    <label htmlFor="password" className="text-gray-300 font-bold">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        className="px-10 py-2 rounded-md bg-[#2b2e38] border border-[#41434d] focus:outline outline-[#41434d] text-white"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <input type="submit" value="Create Account" className='px-[109px] py-2 bg-[#8465F2] rounded text-white cursor-pointer' />
                                </div>
                                <hr />
                                <div className='grid gap-2 justify-items-start'>
                                    <Link className='text-[#8465F2] hover:underline' to="/Login">Already have an account?Login</Link>
                                </div>
                            </form>
                        </div>


                    </div>
                </div>
            </div>
        </>
    );
}

export default Register;