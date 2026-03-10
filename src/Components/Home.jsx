import React from 'react'
import { motion as Motion } from 'framer-motion'
import '../App.css'
const Home = () => {
    return (
        <>
            <div className="hero-container-fluid home">
                {/* <img src={pic} className='hero-img'></img> */}
                <Motion.div
                    className='hero-content container text-start rounded-4 p-4 p-md-5'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className='hero-title'>Welcome to Success Academy</h1>
                    <h5 className='hero-subtitle'>Learn. Grow. Succeed.</h5>
                    <button className='btn btn-dark btns' onClick={() => {
                        window.location.href = '#course'
                    }}>Get Started</button>
                </Motion.div>

            </div>
        </>
    )
}

export default Home

