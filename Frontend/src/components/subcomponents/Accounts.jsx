
import ProfileCard from './ProfileCard';

import "../../App.css";

import {Container, Row, Col} from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import ButtonBase from '@mui/material/ButtonBase';

// import Typography from '@mui/material/Typography';
// import Pagination from '@mui/material/Pagination';
// import {useState} from 'react';

const Accounts = (props) => {
  let navigate = useNavigate();


  // const [page, setPage] = useState(1);
  // const [rowsPerPage, setRowsPerPage]= useState(6);
  // const handleChange = (event, value) =>{
  //   setPage(value);
  // }

    return ( 
    
<Container style={{width: "100%", height: "100%"}} >


    <Row style={{width: "100%", height: "100%"}} > 
      {props.users && props.users      
      .map( 
        (user, index) => <Col  key={index} style={{width: "100%", height: "100%"}} >

                          <ButtonBase style={{width: "100%"}}  onClick={()=>
                          navigate(`/profile/${user.userId && user.userId}/${user.firstname && user.firstname}-${user.lastname &&user.lastname}`)
                          }>
                                    <ProfileCard user={user} profiles={true} />   
                            {/* <ProfileCard user={user}/> */}
                          </ButtonBase>
                                </Col> 
      )} 
    </Row>
    
   {/* {props.users && console.log( Math.floor(7/6) )}
    <Pagination count={props.users && props.users.length / 6 > 1 ? Math.floor(props.users.length / 6 ) : 1} 
    page={page} onChange={handleChange}/>  */}

 
</Container>

     );
}
 
export default Accounts;