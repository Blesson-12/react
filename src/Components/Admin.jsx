import { useEffect, useState } from 'react'
import AddCourse from './AddCourse'
import '../App.css'
const API = "https://academy-management-1.onrender.com"
const Admin = () => {
  const [entries, setEntries] = useState([])

  useEffect(() => {
    loadEntries()
  }, [])


  const loadEntries = async () => {
    try {
      const res = await fetch(`${API}/admin/enquiry`,{
        method:"GET",
        headers:{
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })
      //if(!res.ok) throw new Error("Failed to fetch")
      const data = await res.json()
      setEntries(data);
      console.log(data)

    } catch (err) {
      console.log("Error ", err.message);
      alert("failed to load enguiry details")
      setEntries([]);
    }
  }


  const deleteEntries = async(id) => {
    try{
      const res = await fetch(`${API}/admin/enquiry/${id}`,{
        method:"DELETE",
        headers:{
          "Authorization": "Bearer " + localStorage.getItem("token")

        }
      })
      if(!res.ok) throw new Error("Failed to delete enquiry")
      setEntries(prev=> prev.filter(entry => entry._id !==id))
    }catch(err){
      console.log("Error ", err.message);
    }
  }


  const clearAll = async() => {
    try{
      const res = await fetch(`${API}/admin/enquiry`,{
        method:"DELETE",
        headers:{
             "Authorization": "Bearer " + localStorage.getItem("token")

        }
      })
      if(!res.ok) throw new Error("Failed to clear enquires")
      setEntries([])
    alert("All Enquiries cleared")
    }catch(err){
      console.log("error",err.message)
    }
  }


  return (
    <>
      <div className='container my-4 adminpage'>
        <h2 className='text-center text-warning'>Admin Page</h2>
        <hr className="border border-warning w-25 mx-auto" />

       
      </div>
      <section id='enquiry'>
        <div>
          <h2 className='text-warning'>Enguiry Details</h2>
        </div>
        <div className="mb-3 d-flex justify-content-end gap-2">
          <button className="btn btn-sm btn-secondary" onClick={loadEntries}>Refresh</button>
          <button className="btn btn-sm btn-danger" onClick={clearAll} disabled={entries.length === 0}>Clear All</button>
        </div>
        <div className=''>
          {entries.length === 0 ? (
            <h6>No enquiry received</h6>
          ) : (
            <div className='mt-4'>
              <div className='table-responsive'>
                <table className='table table-sm table-striped table-dark table-bordered border-light'>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NAME</th>
                      <th>MOBILE</th>
                      <th>EMAIL</th>
                      <th>COURSE</th>
                      <th>SUBMITTED AT</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entries.map((e, id) => {
                      return (
                        <tr key={id + 1}>
                          <td>{id + 1}</td>
                          <td>{e.name}</td>
                          <td>{e.mobile}</td>
                          <td>{e.email}</td>
                          <td>{e.course}</td>
                          <td>{e.submittedAt ? new Date(e.submittedAt).toLocaleString() : "-"}</td>
                          <td>
                            <button className='btn btn-sm btn-warning' onClick={() => deleteEntries(e._id)}>DELETE</button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      <section id='addcourse'>
        <AddCourse />
      </section>
    </>
  )
}

export default Admin