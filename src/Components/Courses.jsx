import React, { useEffect, useState } from 'react'
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

        <h2 className='text-warning text-center '>COURSES</h2>
        <hr className="border border-warning w-25 mx-auto" />

        {course.length === 0 ? (
          <div>
            <h2 className='text-light '>Courses will be update soon ...</h2>
          </div>
        ) : (
          <div className='d-flex flex-wrap justify-content-center my-5 mx-2 gap-4'>

            {course.map((course, id) => {
              return (
                <div className='card course-card' key={id} style={{ width: '15rem' }}>
                  <div className='card-body '>
                    <h4 className='card-title'>{course.coursename}</h4>
                    <p className='card-text'>{course.description}</p>
                    <a className='btn  btn-warning mt-auto' onClick={() => { openCourse(course) }}>Course Details</a>
                  </div>
                </div>

              )
            })}{selectedCourse && (
              <div className='modal bg-transparent show d-block tabIndex="-1"' style={{ backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1500 }}>
                <div className='modal-dialog modal-dialog-centered '>
                  <div className='modal-content bg-light text-dark'>
                    <div className='modal-header text-dark'>
                      <h2 className=''>{selectedCourse.coursename}</h2>
                      <button type='button' className='btn-close btn-close-white' onClick={closeCourse}></button>
                    </div>
                    <div className='modal-body'>
                      <p className='text-bold'>Description: {selectedCourse.description}</p>
                      <p>Course Duration  :  {selectedCourse.duration}</p>
                    </div>
                    <div className=' modal-footer'>
                      <button type='button' className='btn btn-warning ' onClick={closeCourse}>Close</button>
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