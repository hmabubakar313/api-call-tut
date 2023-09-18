import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function EmpDetails() {
    const { empid } = useParams();
    const [empdata, setEmpData] = useState({});
    useEffect(() => {
        fetch('http://localhost:8000/employee/' + empid)
            .then((res) => {
                console.log('res');
                return res.json()

            })
            .then((resp) => {
                setEmpData(resp)
            })
            .catch((err) => {
                console.log(err.message);
            })
    }, [])
    console.log(empdata)


    return (
        <div>
            <div className='card' style={{ "textAlign": "left" }}>
                <div className='card-title'>
                    <h2>Employee Create</h2>
                </div>
                <div className='card-body'></div>
                {
                    empdata &&
                    <div>
                        <h2>Your name is {empdata.name}  and ({empdata.id})</h2>
                        <h3>Contact Details</h3>
                        <h4>Email {empdata.email}</h4>
                        <h5>Phone Number: {empdata.phone}</h5>
                        <Link to={"/"} className='btn btn-danger'> Back</Link>
                    </div>
                }

            </div>


        </div>
    )
}

export default EmpDetails