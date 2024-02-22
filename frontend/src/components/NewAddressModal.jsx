import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'

const NewAddressModal = (props) => {
  const [dataaddress, setDataAddress] = useState({
    addressm: '',
    postcodem: '',
    cidm: '',
    aidm: null,
    personidm: props.personid.toString(),
    coidm: ''
});
const [datacountry, setDataCountry] = useState([]);
const [datacity, setDataCity] = useState([]);
const [dataaddresstype, setDataAddresstype] = useState([]);

useEffect(() => {
  axios.get('http://localhost:5000/country')
    .then(res => setDataCountry(res.data))
    .catch((err) => console.log(err));

  axios.get('http://localhost:5000/city')
    .then(res => setDataCity(res.data))
    .catch((err) => console.log(err));

  axios.get('http://localhost:5000/address_type')
    .then(res => setDataAddresstype(res.data))
    .catch((err) => console.log(err));
}, []);

 const handleSubmit = (e) => {
  e.preventDefault();
  if (dataaddress.postcodem.trim() !== '' && dataaddress.cidm.trim() !== ''
  && dataaddress.addressm.trim() !== '') {
    axios.post('http://localhost:5000/address/new', dataaddress)
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
              <label htmlFor="country-name">Country &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select className='select' onChange={e => setDataAddress ({...dataaddress, coidm: e.target.value})}>
                <option>--Choose a country--</option>
                {Array.isArray(datacountry) && datacountry.map((country, index) => { 
          return <option key={index} value={country.COUNTRY_ID}>{country.COUNTRY_NAME}</option>})}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="city-name">City* &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
              <select className='select' onChange={e => setDataAddress ({...dataaddress, cidm: e.target.value})}>
                <option>--Choose a city--</option>
                {Array.isArray(datacity) && datacity.map((city, index) => (
                  city.COUNTRY_ID.toString() === dataaddress.coidm
                  ? <option key={index} value={city.CITY_ID}>{city.CITY_NAME}</option>
                  : null
                ))}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="addresstype">Address Type </label>
              <select className='select' onChange={e => setDataAddress ({...dataaddress, aidm: e.target.value})}>
                <option>--Choose an address type--</option>
                {Array.isArray(dataaddresstype) && dataaddresstype.map((address_type, index) => { 
          return <option key={index} value={address_type.ADDRESS_TYPE_ID}>{address_type.ADDRESS_TYPE_NAME}</option>})}
              </select>
            </div>
            <div className='form-group'>
              <label htmlFor="address">Address* &nbsp;</label>
              <input className='input' type="text" 
              onChange={e => setDataAddress ({...dataaddress, addressm: e.target.value})}/>
            </div>
            <div className='form-group'>
              <label htmlFor="postcode">Postcode*</label>
              <input className='input' type="text" 
              onChange={e => setDataAddress ({...dataaddress, postcodem: e.target.value})}/>
            </div>
            <div className='form-group'>*Field cannot be empty!</div>
            <button type='save' className='button'>Save</button>
          </form>
        </div>
    </div>
  )
}

export default NewAddressModal