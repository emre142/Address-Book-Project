import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const NewCountryModal = () => {
  const [data, setData] = useState({
    namem: '',
    codem: ''
});
 const handleSubmit = (e) => {
  e.preventDefault();
  if (data.namem.trim() !== '' && data.codem.trim() !== '') {
    axios.post('http://localhost:5000/country/new', data)
    .then(res => {
      console.log(res);
      window.location.reload();
    })
      .catch(err => console.log(err));
  }
  else{window.location.reload();}
}
  return (
    <div className='modal'>
        <div className='modal-container'>
          <form onSubmit={handleSubmit}>
            <div className='form-group'>
              <label htmlFor="country-name">Country Name*</label>
              <input className='input' type="text" 
              onChange={e => setData ({...data, namem: e.target.value})}/>
            </div>
            <div className='form-group'>
              <label htmlFor="country-code">Country Code*&nbsp;</label>
              <input className='input' type="text" 
              onChange={e => setData ({...data, codem: e.target.value})}/>
            </div>
            <div className='form-group'>*Field cannot be empty!</div>
            <button type='save' className='button'>Save</button>
          </form>
        </div>
    </div>
  )
}

export default NewCountryModal