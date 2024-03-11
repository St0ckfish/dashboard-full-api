import React from 'react';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
        <>
            <div class="grid h-screen place-content-center bg-[#121317] px-4 w-screen">
                <div class="text-center">
                    <h1 class="text-9xl font-black text-[#33343b]">404</h1>

                    <p class="text-2xl font-bold tracking-tight text-gray-400 sm:text-4xl">Uh-oh!</p>

                    <p class="mt-4 text-gray-500">We can't find that page.</p>

                    <Link
                        to="/"
                        class="mt-6 inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring"
                    >
                        Go Login
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Error;
<>
</>