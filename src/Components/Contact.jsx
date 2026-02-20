import React, { useEffect, useState } from 'react';
const API = "https://academy-management-1.onrender.com"
const Contact = () => {
  const [form, setForm] = useState({ name: '', mobile: '', email: '', course: '' });
  const [course, setCourse] = useState([]);

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const res = await fetch(`${API}/user/course`)
      if (!res.ok) throw new Error("Failed to fetch courses")
      const data = await res.json()
      setCourse(Array.isArray(data) ? data : [])
    } catch (err) {
      console.log("Error ", err);
      setCourse([]);
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API}/user/enquiry`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        }, body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error("Failed to Submit enquiry Details")
      const data = res.json();

      alert("Enquiry Details Submitted");
      setForm({ name: "", mobile: "", email: "", course: "" });
    } catch (err) {
      console.log("Error", err);
      alert("Failed to load enquiry details");
    }
  };

  return (
    <section className=" container-fluid text-light py-5  " id="">
      <h2 className="text-warning text-center mb-3">CONTACT US</h2>
      <hr className="border border-warning w-25 mx-auto mb-4" />
      <div className='container-fluid row'>
        <div className='col-12 col-md-6'>
          <div className='map ratio ratio-16x9 mb-1 mt-4'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6941834000627!2d77.01758008932971!3d10.828390798228728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84fba4c568e55%3A0xff01ebc2a915f09f!2sMizpah%20Language%20Academy!5e0!3m2!1sen!2sin!4v1762738397964!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className='pt-4'></iframe>
          </div>
          <p className="mb-1">
            <i className="bi bi-geo-alt-fill text-warning fs-4 me-2" />
            Old Bus Stand, Kinathukadavu, Coimbatore - 642109
          </p>
          <p className="mb-1">
            <i className="bi bi-envelope-at-fill text-warning fs-4 me-2" />
            abcdef@email.com
          </p>
          <p className="mb-1">
            <i className="bi bi-telephone-fill text-warning fs-4 me-2" />
            +91 1234567890
          </p>

          <div className="d-flex align-items-center gap-2 mt-2">
            <a href="#"><i className="bi bi-whatsapp text-warning fs-5"></i></a>
            <a href="#"><i className="bi bi-instagram text-warning fs-5"></i></a>
            <a href="#"><i className="bi bi-facebook text-warning fs-5"></i></a>
          </div>
        </div>


        <div className=" col-12 col-md-6">
          <h3 className="text-warning text-center mb-3">For Enquiry</h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label text-light">Name</label>
              <input
                name="name" type="text"
                className="form-control form-control "
                value={form.name} onChange={handleChange} required
                placeholder='Enter your name'
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Mobile</label>
              <input
                name="mobile" type="tel"
                className="form-control form-control "
                value={form.mobile} onChange={handleChange} required
                placeholder='Enter your Mobile No'
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Email</label>
              <input
                name="email" type="email"
                className="form-control form-control "
                value={form.email} onChange={handleChange} required
                placeholder='Enter your email '
              />
            </div>
            <div className="mb-3">
              <label className="form-label text-light">Course</label>
              <select
                name="course" className="form-select form-select"
                value={form.course} onChange={handleChange} required
              >
                <option value="">Select Course</option>
                {course.length > 0 ? course.map((c, i) => (
                  <option key={i} value={c.coursename}>{c.coursename}</option>
                )) : <option>No Courses Available</option>}
              </select>
            </div>
            <button type="submit" className="btn btn-warning">Submit</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
