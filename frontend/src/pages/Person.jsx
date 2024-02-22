import React from 'react'
import NewModal from  "../components/NewPersonModal"
import EditModal from "../components/EditPersonModal"
import { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const Person = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(-1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/person')
      .then(res => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='tables'>
      <table className='table'>
        <thead>
          <tr>
            <th><button onClick={()=> setModalOpen(true)}>New</button>
              {modalOpen && <NewModal/>}
            </th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Edu Level</th>
            <th>Count of Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((person, index) => { 
          return <tr key={index}>
            <td><button onClick={() => {setEditOpen(index)}}>Edit</button>
              {editOpen === index && <EditModal id={person.PERSON_ID} fname={person.FIRST_NAME} lname={person.LAST_NAME} ename={person.EDU_LEVEL}/>}
            </td>
            <td>{person.FIRST_NAME}</td>
            <td>{person.LAST_NAME}</td>
            <td>{person.EDU_LEVEL}</td>
            <td>{person.ADDRESS_COUNT}</td>
            <td><button><Link className="link" to={{pathname: `/addressbook/person/address`,
             search: `?id=${person.PERSON_ID}`}}>Address List
              </Link></button>
            </td>
            </tr>})}
        </tbody>
      </table>
    </div>
  )
}

export default Person

