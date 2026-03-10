import { useState, useEffect } from 'react'
import { motion as Motion } from 'framer-motion'

const API = "https://academy-management-1.onrender.com"
const AddCourse = () => {
    const [detail, setDetail] = useState({
        coursename: "",
        description: "",
        duration: "",

    });
    const [courses, setCourses] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        loadCourses()
    }, [])

    const loadCourses = async () => {
        try {
            const res = await fetch(`${API}/admin/course`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (!res.ok) throw new Error("Failed to fetch courses")
            const data = await res.json()
            setCourses(Array.isArray(data) ? data : [])

        } catch (err) {
            console.log("Error ", err);
            setCourses([]);
        }

    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetail(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newDetails = { ...detail }
        if (!detail.coursename.trim() || !detail.description.trim()) {
            alert("Please fill in all fields");
            return;
        }
        try {
            setIsSubmitting(true);

            const res = await fetch(`${API}/admin/course`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }, body:
                    JSON.stringify(newDetails)
            });
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Failed to add course");
            }

            const data = await res.json();
            setCourses(prev => [...prev, data])
            setDetail({ coursename: "", description: "", duration: "" });

        } catch (err) {
            console.error("Error:", err);
            alert("Failed to add course");
        } finally {
            setIsSubmitting(false);
        }

    }
    const handleDelete = async (id) => {
        try {
            const res = await fetch(`${API}/admin/course/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            })
            if (!res.ok) throw new Error("Failed to delete course")
            setCourses(prev => prev.filter(c => c._id !== id))
        } catch (err) {
            console.error("Error:", err);
        }
    }

    return (
        <>
            <Motion.section
                className='glass-panel p-3 p-md-4'
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45 }}
            >
                <div className='pb-3'>
                    <h2 className='section-title'>List Of Courses</h2>
                </div>
                <div className='table-responsive modern-table-wrap'>
                    <table className='table table-sm table-striped table-bordered modern-table'>
                        <thead>
                            <tr>
                                <th>S.NO</th>
                                <th>COURSE NAME</th>
                                <th>COURSE DESCRIPTION</th>
                                <th>COURSE DURATION</th>
                                <th>ACTIONS</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course, index) => (
                                <tr key={course._id}>
                                    <td>{index + 1}</td>
                                    <td>{course.coursename}</td>
                                    <td>{course.description}</td>
                                    <td>{course.duration}</td>
                                    <td>
                                        <button className='btn btn-sm danger-btn' onClick={() => handleDelete(course._id)}>DELETE</button>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                    </table>
                </div>
            </Motion.section>
            <Motion.div
                className='my-2'
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: 0.05 }}
            >
                <h2 className='section-title mb-3'>Add Course</h2>
                <hr className='section-divider border w-25' />
            </Motion.div>
            <Motion.div
                className='container glass-panel p-3 p-md-4'
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.45, delay: 0.08 }}
            >
                <div className='d-flex align-items-center justify-content-center' style={{ maxWidth: '1200px' }}>
                    <form className='container align-items-center' onSubmit={handleSubmit}>
                        <div className='d-flex flex-column flex-md-row align-items-md-center mb-3 gap-2 gap-md-4'>
                            <label htmlFor='coursename' className='soft-title addcourse-label'>Course Name :</label>
                            <input
                                type="text"
                                name='coursename'
                                id='coursename'
                                className='form-control modern-input w-100'
                                style={{ maxWidth: "540px" }}
                                placeholder='Enter Course Name'
                                value={detail.coursename}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className='d-flex flex-column flex-md-row align-items-md-center mb-3 gap-2 gap-md-4'>
                            <label htmlFor='description' className='soft-title addcourse-label'>Course Description :</label>
                            <input
                                type="text"
                                name='description'
                                id='description'
                                className='form-control modern-input w-100'
                                style={{ maxWidth: "540px" }}
                                placeholder='Enter Course Description'
                                value={detail.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className='d-flex flex-column flex-md-row align-items-md-center mb-3 gap-2 gap-md-4'>
                            <label htmlFor='duration' className='soft-title addcourse-label'>Course Duration :</label>
                            <input
                                type='text'
                                name='duration'
                                id='duration'
                                className='form-control modern-input w-100'
                                style={{ maxWidth: "540px" }}
                                placeholder='Enter the Course duration'
                                value={detail.duration}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            className='btn modern-btn d-block mx-auto mt-2'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Course'}
                        </button>
                    </form>
                </div>
            </Motion.div>
        </>
    )
}

export default AddCourse

