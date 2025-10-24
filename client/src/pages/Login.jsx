import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';


const Login = () => {
    const { login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await login({email, password})
            console.log('con')
        } catch (error) {
            console.log('nom')
        }
        console.log('form submitted')
    }

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
                <div>
                    <h2 className='text-center text-3xl font-semibold text-gray-900'>Sign in to coffercard</h2>
                </div>
                <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
                    <div>
                        <label>
                            Username
                        </label>
                        <input
                        type='email'
                            className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder='Username'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div>
                        <label>
                            Password
                        </label>
                        <input
                        type='password'
                            className="border border-gray-300 appearance-none rounded-md w-full relative block px-3 py-2 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div>
                        <button className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" type='submit'>Se connecter</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;