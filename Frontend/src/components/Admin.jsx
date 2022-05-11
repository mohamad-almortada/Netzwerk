


import {Container} from 'react-bootstrap';

import { useState} from 'react';

import axios from 'axios';

import AdminContent from './subcomponents/Login/AdminContent';
import PersistentDrawerLeft from './subcomponents/Login/AppBar';




const Admin = () => {

  const [showTable, setShowTable] = useState(true);
  const [drawerNumber, setDrawerNumber] = useState(1);




  const handleDisplayTable = (value) => {
    setShowTable(value);
  }

 
const handleLogout = () => {
  axios.defaults.withCredentials = true;


        axios.post(`${process.env.REACT_APP_NEDICHE_API}/Admin/logout.php`)
        .then((res)=>{
          console.log(res);
          res.data.valid && window.location.reload();
          
      
        }).catch((err) => {
            // console.log(err);
        });
}



    return ( <>

  
   <Container fluid="md" style={{  marginTop: "11%",  borderRadius: "20px"}} >
     <PersistentDrawerLeft setDisplayTable={handleDisplayTable} handleLogout={()=>{handleLogout()}} 
     setDrawerNumber={setDrawerNumber}
     />

      <AdminContent displayNewUsers={showTable}
      drawerNumber={drawerNumber}
      // setAuthen={(value)=>{console.log(value)}}
      />
  
   
      </Container> 

    </> );
}
 
export default Admin;