import React from 'react'
import {Link} from 'react-router-dom'
import Logo from '../img/notebook.png'


const Addressbook = () => {
  return (
    <div>
        <div className="links-container">
            <div className="Links">
              <Link className="link" to="/addressbook/person">
                <h5><img className="icon" src={Logo} alt=''/>Person List</h5>
              </Link>
              <Link className="link" to="/addressbook/city">
                <h5><img className="icon" src={Logo} alt=''/>City List</h5>
              </Link>
              <Link className="link" to="/addressbook/country">
                <h5><img className="icon" src={Logo} alt=''/>Country List</h5>
              </Link>
              <Link className="link" to="/addressbook/addresstype">
                <h5><img className="icon" src={Logo} alt=''/>Address Type List</h5>
              </Link>
            </div>
        </div>
    </div>
  )
}

export default Addressbook