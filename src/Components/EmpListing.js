import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

function EmpListing() {

  const [empdata, setEmpData] = useState(null);
  const navigate = useNavigate();
  const removeFunc = (id) => {
    if (window.confirm('Do you Want to Remove?')) {
      fetch(`http://localhost:8000/employee/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(empdata),
      })
        .then((res) => {
          alert('Removed SuccessFully');
          window.location.reload()
        })
        .catch((err) => {
          console.log(err.message);
        });
    }


  }
  const loadEdit = (id) => {

    navigate('/employee/edit/' + id);
  }
  const loadDetail = (id) => {
    navigate('/employee/detail/' + id);
    console.log('id', id)
    console.log('detail function working ');

  }

  useEffect(() => {
    fetch('http://localhost:8000/employee')
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setEmpData(resp)
      })
      .catch((err) => {
        console.log(err.message);
      })
  }, [])
  return (
    <div className='container'>
      <div className='card'>
        <div className='card-title'>
          <h2>Emp Listing</h2>
        </div>
        <div className='card-body'>
          <div className='divbtn'>
            <Link to="employee/create" className='btn btn-success mb-2'>
              Add New (+)
            </Link>
          </div>
          <table className='table table-bordered'>
            <thead className='bg-dark text-white'>
              <tr>
                <td>ID</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {
                empdata &&
                empdata.map(item => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td><a onClick={() => { loadEdit(item.id) }} className='btn btn-success me-1'>Edit</a>
                      <a onClick={() => { removeFunc(item.id) }} className='btn btn-danger me-1'>Del</a>
                      <a onClick={() => { loadDetail(item.id) }} className='btn btn-primary me-1'>details</a></td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default EmpListing