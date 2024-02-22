import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

const EditCityModal = (props) => {
    const [datacity, setDataCity] = useState({
        namem: props.name,
        idm: props.cid
    });

    
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5000/country')
        .then(res => setData(res.data))
        .catch((err) => console.log(err));
    }, []);

     const handleSubmit = (e) => {
      e.preventDefault();
      if (datacity.namem.trim() !== '') {
        axios.put('http://localhost:5000/city/edit/'+props.id, datacity)
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
              <label htmlFor="country-name">Country* &nbsp;&nbsp;&nbsp;</label>
              <select className='select' onChange={e => setDataCity ({...datacity, idm: e.target.value})}>
                <option>{props.cname}</option>
                {Array.isArray(data) && data.map((country, index) => { 
          return <option key={index} value={country.COUNTRY_ID}>{country.COUNTRY_NAME}</option>})}
              </select>
            </div>
                <div className='form-group'>
                  <label htmlFor="city">City Name*</label>
                  <input className='input' type="text" defaultValue={props.name}
                  onChange={e => setDataCity ({...datacity, namem: e.target.value})}/>
                </div>
                <div className='form-group'>*Field cannot be empty!</div>
                <button type='save' className='button'>Save</button>
              </form>
            </div>
        </div>
      )
}

export default EditCityModal