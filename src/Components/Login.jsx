import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion as Motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const navigate = useNavigate();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (email.length > 0 && pass.length > 0) {
                const post = await fetch(`https://academy-management-1.onrender.com/auth/login`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ email, password: pass })
                })

                const text = await post.text();
                let data;

                try {
                    data = JSON.parse(text);
                } catch {
                    data = { message: text };
                } if (!post.ok) {
                    alert(data.message || "Invalid credentials")
                    return
                }
                localStorage.setItem("token", data.token);
                alert("login successfull")
                navigate('/admin')
            }
        }
        catch (err) {
            console.log(err.message)
        }
    }

    return (
        <>
            <div className='login'>
                <Motion.h2
                    className='text-center section-title mt-5'
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    Admin Login
                </Motion.h2>
                <Motion.hr
                    className="border section-divider w-25 mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.05 }}
                />

                <div className='container d-flex justify-content-center mt-3'>
                    <Motion.div
                        className='container auth-card glass-panel justify-content-center w-100 p-4 p-md-5 mt-1'
                        style={{ maxWidth: '800px' }}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: 0.08 }}
                    >
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3 mt-2 row align-items-center g-2">
                                <label htmlFor="username" className="col-12 col-md-4 col-form-label soft-title">Email</label>
                                <div className="col-12 col-md-8">
                                    <input
                                        type="text"
                                        name='username'
                                        className="form-control modern-input"
                                        id="username"

                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="mb-3 row align-items-center g-2">
                                <label htmlFor="inputPassword" className="col-12 col-md-4 col-form-label soft-title">Password</label>
                                <div className="col-12 col-md-8">
                                    <input
                                        type="password"
                                        name='password'
                                        className="form-control modern-input"
                                        id="inputPassword"
                                        placeholder="Enter Password"

                                        value={pass}
                                        onChange={(e) => setPass(e.target.value)}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn modern-btn mt-3 d-block mx-auto px-4">Login</button>
                        </form>
                    </Motion.div>
                </div>
            </div>
        </>
    );
}

export default Login;

