import {Container} from 'react-bootstrap';

import {useParams } from 'react-router-dom';
import axios from 'axios';  
import Navi from './Navi'
import Alert from '@mui/material/Alert';

import {useState, useEffect} from 'react';
import Profile from './Profile';

const BASE_URL = process.env.REACT_APP_NEDICHE_API;

const UserProfil = () => {
 

    
    const {userId} = useParams();
    const [user, setUser] = useState({});
    const [errorMessege, setErrorMessege] = useState("");

      useEffect(() => {

        axios.defaults.baseURL = BASE_URL;
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.get(`${BASE_URL}/GET/getUser.php?userId=${userId}`)
        .then((response) => {
      
            setUser(response.data);
        })
        .catch((error) => {
            error.response.status === 404 ? setErrorMessege("Kein User gefunden") : setErrorMessege("");
        });

      },[userId])


    return ( <>
        <Navi />
        <Container 
        style={{  marginTop: "3%", maxWidth: "800px", marginBottom: "3%"}} 
        >

            <Profile user={user}/>
            {errorMessege && <Alert severity="error">{errorMessege}</Alert>}

        </Container>
    
    
    </> );
}
 
export default UserProfil;