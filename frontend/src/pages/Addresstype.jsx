import React from 'react'
import NewModal from  "../components/NewAddresstypeModal"
import EditModal from "../components/EditAddresstypeModal"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Addresstype = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(-1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/address_type')
      .then(res => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this address type?');

    if (confirmDelete) {
      axios.delete('http://localhost:5000/address_type/delete/'+id)
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
            <th>Address Type Name</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        {Array.isArray(data) && data.map((address_type, index) => { 
          return <tr key={index}>
            <td><button onClick={() => {setEditOpen(index)}}>Edit</button>
              {editOpen === index && <EditModal id={address_type.ADDRESS_TYPE_ID} name={address_type.ADDRESS_TYPE_NAME}/>}
            </td>
            <td>{address_type.ADDRESS_TYPE_NAME}</td>
            <td><button onClick={()=> handleDelete(address_type.ADDRESS_TYPE_ID)}>Delete</button></td>
          </tr>})}
        </tbody>
      </table>
    </div>
  )
}

export default Addresstype

