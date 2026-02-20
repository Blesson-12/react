import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState()
    const [pass, setPass] = useState()
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
            }     if (!post.ok) {
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
                <h2 className='text-center text-warning '>Admin Login</h2>
                <hr className="border border-warning w-25 mx-auto" />

                <div className='container d-flex justify-content-center mt-5'>
                    <div className='container bg-light justify-content-center border border-warning w-100 p-5 rounded-3 mt-5' style={{ maxWidth: '800px' }}>
                        <form onSubmit={handleSubmit}>
                            <div className='container row align-items-center'>
                                <div className="mb-4 mt-4 row">
                                    <label htmlFor="username" className="col-5 col-form-label text-dark">Email</label>
                                    <div className="col-6">
                                        <input
                                            type="text"
                                            name='username'
                                            className="form-control border border-dark"
                                            id="username"

                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='container row'>
                                <div className="mb-4 row">
                                    <label htmlFor="inputPassword" className="col-5 col-form-label text-dark">Password</label>
                                    <div className="col-6">
                                        <input
                                            type="password"
                                            name='password'
                                            className="form-control border border-dark"
                                            id="inputPassword"
                                            placeholder="Enter Password"

                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-warning mt-3 d-block mx-auto px-4">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;