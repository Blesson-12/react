import React, { useEffect, useState } from 'react'
import { motion as Motion } from 'framer-motion'
const API = "https://academy-management-1.onrender.com"
const Courses = () => {
  const [course, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    loadCourses()
  }, [])

  const loadCourses = async () => {
    try {
      const res = await fetch(`${API}/user/course`)
      if (!res.ok) throw new Error("Failed to fetch courses")
      const data = await res.json()
      setCourses(Array.isArray(data) ? data : [])

    } catch (err) {
      console.log("Error ", err);
      setCourses([]);
    }

  }
  const openCourse = (course) =>
    setSelectedCourse(course);


  const closeCourse = () => setSelectedCourse(null)





  return (
    <>
      <div className='container '>

        <Motion.h2
          className='section-title text-center'
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          COURSES
        </Motion.h2>
        <Motion.hr
          className="border section-divider w-25 mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
        />

        {course.length === 0 ? (
          <div>
            <h2 className='soft-title'>Courses will be update soon ...</h2>
          </div>
        ) : (
          <div className='d-flex flex-wrap justify-content-center my-5 mx-2 gap-4'>

            {course.map((course, id) => {
              return (
                <Motion.div
                  className='card course-card'
                  key={id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.2 }}
                  transition={{ duration: 0.35, delay: id * 0.06 }}
                >
                  <div className='card-body d-flex flex-column h-100'>
                    <h4 className='card-title'>{course.coursename}</h4>
                    <p className='card-text'>{course.description}</p>
                    <button className='btn modern-btn mt-auto' type='button' onClick={() => { openCourse(course) }}>Course Details</button>
                  </div>
                </Motion.div>

              )
            })}{selectedCourse && (
              <div className='modal bg-transparent show d-block' tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.55)', zIndex: 1500 }}>
                <div className='modal-dialog modal-dialog-centered modal-modern'>
                  <div className='modal-content'>
                    <div className='modal-header'>
                      <h2 className=''>{selectedCourse.coursename}</h2>
                      <button type='button' className='btn-close closebutton' onClick={closeCourse}></button>
                    </div>
                    <div className='modal-body'>
                      <p className='text-bold'>Description: {selectedCourse.description}</p>
                      <p>Course Duration  :  {selectedCourse.duration}</p>
                    </div>
                    <div className=' modal-footer'>
                      <button type='button' className='btn modern-btn' onClick={closeCourse}>Close</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}


      </div>

    </>
  )
}

export default Courses

