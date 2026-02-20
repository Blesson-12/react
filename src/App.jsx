import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Home from './Components/Home';
import Courses from './Components/Courses';
import About from './Components/About';
import Contact from './Components/Contact';
import Admin from './Components/Admin';
import Login from './Components/Login';
import { BrowserRouter, Routes, Route, Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const location = useLocation();
  const showFooter = location.pathname === '/'
  const isAdmin = location.pathname === '/admin'
  const isLogin = location.pathname === '/login'
  //localStorage.setItem("token",JSON.stringify(eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5MzI4ZGVhZDM5NmFkNzllMTBhZDk0NiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2NDkyMTgyNiwiZXhwIjoxNzY1MDA4MjI2fQ.zFGo7j47ctphSsgZn64Zx4ZicOtbAjtmu54XjpkcY0w))
  return (
    <>
      <nav className='navbar navbar-expand-lg navbar-dark fixed-top '>
        <div className='container-fluid  borde p-2'>
          <div className='d-flex align-items-center col-4'>
            <Link to="/"><img src='/assets/logo.png' className='rounded-circle border border-light p-2' height='60' alt="logo" /></Link>
            <h2 className='text-light m-0 fs-3 ms-3'>Success Academy</h2>
          </div>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className='collapse navbar-collapse col-4 mx-5 ' id="navbarNav">
            <ul className='navbar-nav me-auto mb-1 mb-lg-0 ms-1'>
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
              <div className='col-4 text-end ms-auto me-5'>
                <Link to="/login"><button id='login' className='btn btn-warning '>Admin</button></Link>
              </div>
            }
            {isLogin && (
              <div className='col-4 text-end ms-auto me-5'>
                <a href="/"><button className='btn btn-warning' id='back'>Back</button></a>
              </div>
            )}
            {
              isAdmin && (
                <div className='col-4 text-end ms-auto me-5'>
                  <a href='/'><button id='logout' className='btn btn-warning '>Logout</button></a>
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
        <footer>
          <div className="container text-center py-2">

            <div className="text-light small">
              © 2024 Success Academy. All rights reserved.
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
