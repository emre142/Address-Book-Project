import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const NewPersonModal = () => {
  const [data, setData] = useState({
    fnamem: '',
    lnamem: '',
    enamem: 'Undefined'
});
 const handleSubmit = (e) => {
  e.preventDefault();
  if (data.fnamem.trim() !== '' && data.lnamem.trim() !== '') {
    axios.post('http://localhost:5000/person/new', data)
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
              <label htmlFor="first-name">First Name*</label>
              <input className='input' type="text" 
              onChange={e => setData ({...data, fnamem: e.target.value})}/>
            </div>
            <div className='form-group'>
              <label htmlFor="last-name">Last Name*</label>
              <input className='input' type="text" 
              onChange={e => setData ({...data, lnamem: e.target.value})}/>
            </div>
            <div className='border'>
            <div className='form-group'>
              <input className='radio' type="radio" value="Undefined" 
              onChange={e => setData ({...data, enamem: e.target.value})} checked={data.enamem === 'Undefined'}/>Undefined (selected)
            </div>
            <div className='form-group'>
              <input className='radio' type="radio" value="BSc" 
              onChange={e => setData ({...data, enamem: e.target.value})} checked={data.enamem === 'BSc'}/>BSc
            </div>
            <div className='form-group'>
              <input className='radio' type="radio" value="MSc" 
              onChange={e => setData ({...data, enamem: e.target.value})} checked={data.enamem === 'MSc'}/>MSc
            </div>
            <div className='form-group'>
              <input className='radio' type="radio" value="PhD" 
              onChange={e => setData ({...data, enamem: e.target.value})} checked={data.enamem === 'PhD'}/>PhD
            </div>
            </div>
            <div className='form-group'>*Field cannot be empty!</div>
            <button type='save' className='button'>Save</button>
          </form>
        </div>
    </div>
  )
}

export default NewPersonModal