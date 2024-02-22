import { Breadcrumbs } from '@mui/material'
import React from 'react'
import { useLocation,Link } from 'react-router-dom'

const AppBreadcrumbs = () => {

    const routeNames = {
        '': 'Home',
        addressbook: 'Address Book',
        person: 'Person List',
        address: 'Address List',
        addresstype: 'Address Type List',
        city: 'City List',
        country: 'Country List',
      };

    const location = useLocation()
    let crumbLink = ''
    const crumbPath = location.pathname.split('/')
                        .filter((path) => path !== '')
                        .map((crumb) => {
                            crumbLink += `/${crumb}`
                            return (
                              <Link style={{textDecoration: 'none', color: 'black'}} to={crumbLink} key={crumb}>
                                {routeNames[crumb] || crumb}
                              </Link>
                            );
                        })
    console.log(crumbPath)

    crumbPath.unshift(
      <Link style={{textDecoration: 'none', color: 'black'}} to='/' key="home">
        {routeNames['']}
      </Link>
    );
    
  return (
    <Breadcrumbs margin="10px" aria-label="breadcrumb" separator=">" >
        {crumbPath}
    </Breadcrumbs>
  )
}

export default AppBreadcrumbs