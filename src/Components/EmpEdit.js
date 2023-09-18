import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function EmpEdit() {
  const { empid } = useParams();
  const [id, setUpdateId] = useState('');
  const [name, setUpdateName] = useState('');
  const [email, setUpdateEmail] = useState('');
  const [phone, setUpdatePhone] = useState('');
  const [status, setUpdateStatus] = useState(true);
  const [validation, setValidation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/employee/${empid}`)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        setUpdateId(resp.id);
        setUpdateName(resp.name);
        setUpdateEmail(resp.email);
        setUpdatePhone(resp.phone);
        setUpdateStatus(resp.status);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [empid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const empdata = {
      id: id,
      name: name,
      email: email,
      phone: phone,
      status: status,
    };

    fetch(`http://localhost:8000/employee/${empid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert('Employee Updated Successfully');
        navigate('/');
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <div className='row'>
        <div className='offset-lg-3 col-lg-6'>
          <form className='container' onSubmit={handleSubmit}>
            <div className='card' style={{ textAlign: 'left' }}>
              <div className='card-title'>
                <h2>Employee Edit</h2>
              </div>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-lg-12'>
                    <div className='form-group'>
                      <label>Id</label>
                      <input type='Number' className='form-control' disabled={true} value={id} />
                    </div>
                    <div className='form-group'>
                      <label>Name</label>
                      <input
                        type='text'
                        className='form-control'
                        value={name}
                        onMouseDown={(e) => setValidation(true)}
                        onChange={(e) => setUpdateName(e.target.value)}
                        required
                      />
                      {name.length === 0 && validation === true && (
                        <span className='text-danger'>Name is required</span>
                      )}
                    </div>
                    <div className='form-group'>
                      <label>Email</label>
                      <input
                        type='email'
                        className='form-control'
                        value={email}
                        onChange={(e) => setUpdateEmail(e.target.value)}
                      />
                    </div>
                    <div className='form-group'>
                      <label>Phone Number</label>
                      <input
                        type='Number'
                        className='form-control'
                        value={phone}
                        onChange={(e) => setUpdatePhone(e.target.value)}
                      />
                    </div>
                    <div className='col-lg-12'>
                      <div className='form-check'>
                        <input
                          checked={status}
                          onChange={(e) => setUpdateStatus(e.target.checked)}
                          type='checkbox'
                          className='form-check-input'
                        />
                        <label className='form-check-label'>Is Active</label>
                      </div>
                    </div>
                    <div className='col-lg-12'>
                      <div className='form-group'>
                        <button className='btn btn-success mt-1 me-2' type='submit'>
                          Update
                        </button>
                        <Link to='/' className='btn btn-danger mt-2'>
                          Back
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmpEdit;
