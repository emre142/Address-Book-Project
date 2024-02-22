import React from 'react'
import NewModal from  "../components/NewAddressModal"
import EditModal from "../components/EditAddressModal"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom';


const Address = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(-1);
  const [data, setData] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const personId = queryParams.get('id');

  useEffect(() => {
    axios.get('http://localhost:5000/address/'+personId)
      .then(res => setData(res.data))
      .catch((err) => console.log(err));
  }, [personId]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this address?');

    if (confirmDelete) {
      axios.delete('http://localhost:5000/address/delete/'+id)
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
              {modalOpen && <NewModal personid={personId}/>}
            </th>
            <th>Address Type</th>
            <th>City Name</th>
            <th>Country</th>
            <th>Address</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((address, index) => { 
          return <tr key={index}>
            <td><button onClick={() => {setEditOpen(index)}}>Edit</button>
              {editOpen === index && <EditModal id={address.ADDRESS_ID} address={address.ADDRESS} 
              postcode={address.POSTCODE} coid={address.COUNTRY_ID} coname={address.COUNTRY_NAME} 
              cid={address.CITY_ID} cname={address.CITY_NAME}/>}
            </td>
            <td>{address.ADDRESS_TYPE_NAME}</td>
            <td>{address.CITY_NAME}</td>
            <td>{address.COUNTRY_CODE}</td>
            <td>{address.ADDRESS}, {address.POSTCODE}</td>
            <td><button onClick={()=> handleDelete(address.ADDRESS_ID)}>Delete</button></td>
          </tr>})}
        </tbody>
      </table>
    </div>
  )
}

export default Address

