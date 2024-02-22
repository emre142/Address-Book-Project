import React from 'react'
import NewModal from  "../components/NewCountryModal"
import { useState, useEffect } from 'react'
import axios from 'axios'

const Country = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(-1);
  const [data, setData] = useState([]);
  const [dataUpdate, setDataUpdate] = useState({
    namem: '',
    codem: ''
});

  useEffect(() => {
    axios.get('http://localhost:5000/country')
      .then(res => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this country? Deleting this country will also delete associated cities and addresses!');

    if (confirmDelete) {
      axios.delete('http://localhost:5000/country/delete/'+id)
        .then(res => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  }

  const handleUpdate = (id) => {
    if (dataUpdate.namem.trim() !== '' && dataUpdate.codem.trim() !== '') {
      axios.put('http://localhost:5000/country/edit/'+id, dataUpdate)
      .then(res => {
        console.log(res);
        window.location.reload();
      })
        .catch(err => console.log(err));
    }
    else{window.location.reload();}
  }

  return (
    <div className='tables'>
      <table className='table'>
        <thead>
          <tr>
            <th><button onClick={()=> setModalOpen(true)}>New</button>
              {modalOpen && <NewModal/>}
            </th>
            <th>Country Name</th>
            <th>Country Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody style={{}}>
        {Array.isArray(data) && data.map((country, index) => { 
           return index === editOpen ?
            <tr>
              <td><button onClick={()=> handleUpdate(country.COUNTRY_ID)}>Update</button></td>
              <td><input type="text" defaultValue={country.COUNTRY_NAME} 
              onChange={e => setDataUpdate ({...dataUpdate, namem: e.target.value})}/>*</td>
              <td><input type="text" defaultValue={country.COUNTRY_CODE}
              onChange={e => setDataUpdate ({...dataUpdate, codem: e.target.value})}/>*</td>
              <td>*Field cannot be empty!</td>
            </tr>
            :       
           <tr key={index}>
            <td><button onClick={() => {setEditOpen(index);
              setDataUpdate({...dataUpdate, namem: country.COUNTRY_NAME, codem: country.COUNTRY_CODE})}}>Edit</button>
            </td>
            <td>{country.COUNTRY_NAME}</td>
            <td>{country.COUNTRY_CODE}</td>
            <td><button onClick={()=> handleDelete(country.COUNTRY_ID)}>Delete</button></td>
          </tr>})}
        </tbody>
      </table>
    </div>
  )
}

export default Country