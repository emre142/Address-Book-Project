import React from 'react'
import NewModal from  "../components/NewCityModal"
import EditModal from "../components/EditCityModal"
import { useState, useEffect } from 'react'
import axios from 'axios'

const City = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(-1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/city')
      .then(res => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this city? Deleting this city will also delete associated addresses!');

    if (confirmDelete) {
      axios.delete('http://localhost:5000/city/delete/'+id)
        .then(res => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <div className='tables'>
      <table className='table'>
        <thead>
          <tr>
            <th><button onClick={()=> setModalOpen(true)}>New</button>
              {modalOpen && <NewModal/>}
            </th>
            <th>City Name</th>
            <th>Country</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((city, index) => { 
          return <tr key={index}>
            <td><button onClick={() => {setEditOpen(index)}}>Edit</button>
              {editOpen === index && <EditModal id={city.CITY_ID} cid={city.COUNTRY_ID} name={city.CITY_NAME} cname={city.COUNTRY_NAME}/>}
            </td>
            <td>{city.CITY_NAME}</td>
            <td>{city.COUNTRY_CODE}</td>
            <td><button onClick={()=> handleDelete(city.CITY_ID)}>Delete</button></td>
          </tr>})}
        </tbody>
      </table>
    </div>
  )
}

export default City

