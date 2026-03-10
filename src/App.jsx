import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css'
import Home from './Components/Home';
import Courses from './Components/Courses';
import About from './Components/About';
import Contact from './Components/Contact';
import Admin from './Components/Admin';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const showFooter = location.pathname === '/' || location.pathname === '/admin'
  const isAdmin = location.pathname === '/admin'
  const isLogin = location.pathname === '/login'
  //localStorage.setItem("token",JSON.stringify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzI4ZGVhZDM5NmFkNzllMTBhZDk0NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDkyMTgyNiwiZXhwIjoxNzY1MDA4MjI2fQ.zFGo7j47ctphSsgZn64Zx4ZicOtbAjtmu54XjpkcY0w))
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark fixed-top '>
        <div className='container-fluid borde px-3 py-2'>
          <div className='d-flex align-items-center flex-grow-1'>
            <Link to="/" className='d-flex align-items-center text-decoration-none'>
              <img src='/assets/logo.png' className='rounded-circle border border-light p-2 navbar-logo' height='60' alt="logo" />
              <h2 className='text-light m-0 fs-5 fs-md-4 ms-2 ms-md-3 brand-title'>Success Academy</h2>
            </Link>
          </div>

          <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className='collapse navbar-collapse mt-3 mt-lg-0' id="navbarNav">
            <ul className='navbar-nav me-auto mb-2 mb-lg-0 ms-lg-3'>
              {!isAdmin && !isLogin && (
                <>
                  <li className='nav-item'><a className='nav-link' href='#home'>Home</a></li>
                  <li className='nav-item'><a className='nav-link' href='#course'>Courses</a></li>
                  <li className='nav-item'><a className='nav-link' href='#about'>About</a></li>
                  <li className='nav-item'><a className='nav-link' href='#contact'>Contact Us</a></li>
                </>)}
              {
                isAdmin && (
                  <>
                    <li className='nav-item'><a className='nav-link' href='#enquiry'>Enquiry Details</a></li>
                    <li className='nav-item'><a className='nav-link' href='#addcourse'>Add Courses</a></li>
                  </>
                )
              }
            </ul>
            {!isAdmin && !isLogin &&
              <div className='d-flex mt-2 mt-lg-0 ms-lg-auto'>
                <Link to="/login"><button id='login' className='btn btn-warning nav-cta-btn'>Admin</button></Link>
              </div>
            }
            {isLogin && (
              <div className='d-flex mt-2 mt-lg-0 ms-lg-auto'>
                <a href="/"><button className='btn btn-warning nav-cta-btn' id='back'>Back</button></a>
              </div>
            )}
            {
              isAdmin && (
                <div className='d-flex mt-2 mt-lg-0 ms-lg-auto'>
                  <a href='/'><button id='logout' className='btn btn-warning nav-cta-btn'>Logout</button></a>
                </div>
              )
            }

          </div>
        </div>

      </nav>

      <main >
        <Outlet />
      </main>

      {showFooter && (
        <footer className="site-footer mt-5">
          <div className="container py-4">
            <div className="row g-3 align-items-start">
              <div className="col-12 col-md-6">
                <h5 className="footer-title mb-2">Success Academy</h5>
                <p className="footer-text mb-0">
                  Building confident learners through practical classes, expert mentoring, and career-focused training.
                </p>
              </div>
              <div className="col-12 col-md-3">
                <h6 className="footer-subtitle mb-2">Quick Access</h6>
                {!isAdmin && !isLogin ? (
                  <>
                    <p className="mb-1"><a className="footer-link" href="#home">Home</a></p>
                    <p className="mb-1"><a className="footer-link" href="#course">Courses</a></p>
                    <p className="mb-1"><a className="footer-link" href="#about">About</a></p>
                    <p className="mb-0"><a className="footer-link" href="#contact">Contact Us</a></p>
                  </>
                ) : (
                  <>
                    <p className="mb-1"><a className="footer-link" href="#enquiry">Enquiry Details</a></p>
                    <p className="mb-0"><a className="footer-link" href="#addcourse">Add Courses</a></p>
                  </>
                )}
              </div>
              <div className="col-12 col-md-3">
                <h6 className="footer-subtitle mb-2">Campus Hours</h6>
                <p className="footer-text mb-1">Mon - Sat: 8:30 AM - 7:30 PM</p>
                <p className="footer-text mb-0">Classes Available: Online &amp; Offline</p>
              </div>
            </div>
            <hr className="footer-divider my-3" />
            <div className="footer-copy text-center">
              © {new Date().getFullYear()} Success Academy. All rights reserved.
            </div>
          </div>
        </footer>
      )}
    </>
  )
}

function HomePage() {
  return (
    <>
      <section id='home'><Home /></section>
      <section id='course'><Courses /></section>
      <section id='about'><About /></section>
      <section id='contact'><Contact /></section>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
