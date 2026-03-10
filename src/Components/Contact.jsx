import React, { useEffect, useState } from 'react';
import { motion as Motion } from 'framer-motion';
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
      await res.json();

      alert("Enquiry Details Submitted");
      setForm({ name: "", mobile: "", email: "", course: "" });
    } catch (err) {
      console.log("Error", err);
      alert("Failed to load enquiry details");
    }
  };

  return (
    <section className="container-fluid text-light pt-1 pb-5" id="contact">
      <Motion.h2
        className="section-title text-center mb-3"
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        CONTACT US
      </Motion.h2>
      <Motion.hr
        className="border section-divider w-25 mx-auto mb-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.05 }}
      />
      <Motion.div
        className='container-fluid row g-4 glass-panel p-3 p-md-4'
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.45 }}
      >
        <div className='col-12 col-lg-6'>
          <div className='map ratio ratio-16x9 mb-3 mt-2 rounded-3 overflow-hidden border border-light-subtle'>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.6941834000627!2d77.01758008932971!3d10.828390798228728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba84fba4c568e55%3A0xff01ebc2a915f09f!2sMizpah%20Language%20Academy!5e0!3m2!1sen!2sin!4v1762738397964!5m2!1sen!2sin" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              className='pt-4'></iframe>
          </div>
          <div className='contact-meta'>
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
          </div>

          <div className="d-flex flex-wrap align-items-center gap-3 mt-3">
            <a href="#"><i className="bi bi-whatsapp text-warning fs-5"></i></a>
            <a href="#"><i className="bi bi-instagram text-warning fs-5"></i></a>
            <a href="#"><i className="bi bi-facebook text-warning fs-5"></i></a>
          </div>
        </div>


        <div className="col-12 col-lg-6">
          <h3 className="section-title text-center mb-3">For Enquiry</h3>

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label soft-title">Name</label>
              <input
                name="name" type="text"
                className="form-control modern-input"
                value={form.name} onChange={handleChange} required
                placeholder='Enter your name'
              />
            </div>
            <div className="mb-3">
              <label className="form-label soft-title">Mobile</label>
              <input
                name="mobile" type="tel"
                className="form-control modern-input"
                value={form.mobile} onChange={handleChange} required
                placeholder='Enter your Mobile No'
              />
            </div>
            <div className="mb-3">
              <label className="form-label soft-title">Email</label>
              <input
                name="email" type="email"
                className="form-control modern-input"
                value={form.email} onChange={handleChange} required
                placeholder='Enter your email '
              />
            </div>
            <div className="mb-3">
              <label className="form-label soft-title">Course</label>
              <select
                name="course" className="form-select modern-select"
                value={form.course} onChange={handleChange} required
              >
                <option value="">Select Course</option>
                {course.length > 0 ? course.map((c, i) => (
                  <option key={i} value={c.coursename}>{c.coursename}</option>
                )) : <option>No Courses Available</option>}
              </select>
            </div>
            <button type="submit" className="btn modern-btn">Submit</button>
          </form>
        </div>
      </Motion.div>
    </section>
  );
};

export default Contact;

