import { useState, useEffect } from 'react'

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
            <section className=''>
                <div className='pb-3 my-5'>
                    <h2 className='text-warning'>List Of Courses</h2>
                </div>
                <div className='table-responsive'>
                    <table className='table table-sm table-striped table-secondary table-bordered'>
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
                                        <button className='btn btn-warning' onClick={() => handleDelete(course._id)}>DELETE</button>
                                    </td>
                                </tr>
                            ))

                            }
                        </tbody>
                    </table>
                </div>
            </section>
            <div className='my-5'>
                <h2 className='text-warning mb-5'>Add Course</h2>
            </div>
            <div className='container '>
                <div className='d-flex align-items-center justify-content-center mt-5 ' style={{ maxWidth: '1200px' }}>
                    <form className='container align-items-center' onSubmit={handleSubmit}>
                        <div className='d-flex mb-3 gap-4'>
                            <label htmlFor='coursename' className='col-2 text-light' style={{ minWidth: "150px" }}>Course Name :</label>
                            <input
                                type="text"
                                name='coursename'
                                id='coursename'
                                className='form-control w-50'
                                placeholder='Enter Course Name'
                                value={detail.coursename}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className='d-flex mb-3 gap-4'>
                            <label htmlFor='description' className='col-2 text-light' style={{ minWidth: "150px" }}>Course Description :</label>
                            <input
                                type="text"
                                name='description'
                                id='description'
                                className='form-control w-50'
                                placeholder='Enter Course Description'
                                value={detail.description}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>

                        <div className='d-flex mb-3 gap-4'>
                            <label htmlFor='duration' className='col-2 text-light' style={{ minWidth: "150px" }}>Course Duration :</label>
                            <input
                                type='text'
                                name='duration'
                                id='duration'
                                className='form-control w-50'
                                placeholder='Enter the Course duration'
                                value={detail.duration}
                                onChange={handleChange}
                                disabled={isSubmitting}
                            />
                        </div>

                        <button
                            className='btn btn-primary d-block mx-auto'
                            type='submit'
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Course'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default AddCourse