import axios from 'axios';
import React from 'react'
import { useState } from 'react'

const EditAddresstypeModal = (props) => {
    const [data, setData] = useState({
        namem: props.name
    });

     const handleSubmit = (e) => {
      e.preventDefault();
      if (data.namem.trim() !== '') {
        axios.put('http://localhost:5000/address_type/edit/'+props.id, data)
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
                  <label htmlFor="addresstype">Address Type*</label>
                  <input className='input' type="text" defaultValue={props.name}
                  onChange={e => setData ({...data, namem: e.target.value})}/>
                </div>
                <div className='form-group'>*Field cannot be empty!</div>
                <button type='save' className='button'>Save</button>
              </form>
            </div>
        </div>
      )
}

export default EditAddresstypeModal