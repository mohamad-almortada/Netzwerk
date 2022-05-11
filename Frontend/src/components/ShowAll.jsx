
import {Button } from '@material-ui/core'
import Alert from '@mui/material/Alert';
import Accounts from './subcomponents/Accounts';

import {Container, Row} from 'react-bootstrap';


import {useState, useEffect} from 'react';
import {useParams } from 'react-router-dom';

import axios from 'axios';

import PeopleIcon from '@mui/icons-material/People';
import ViewListIcon from '@mui/icons-material/ViewList';

import ProfilesTable from './subcomponents/ProfilesTable'
import Navi from "./subcomponents/Navi"
import Profile from './subcomponents/Profile';


const BASE_URL = process.env.REACT_APP_NEDICHE_API;



const myColumns = [
  { id: 'Photo', label: 'Foto', maxWidth: 100, align: 'left'},
  { id: 'name', label: 'Name', maxWidth: 150, align: 'center'},
  { id: 'place', label: 'Institut',  maxWidth: 100, align: 'left'},
  { id: 'typ', label: 'Typ',  maxWidth: 100, align: 'left'},
  { id: 'position', label: 'Position', maxWidth: 75, align: 'center'},
  ];


function createMyData(place, firstname, lastname, position, typ, userId, imageSrc){
  let name= firstname + " " + lastname;
    return {place, firstname, lastname, position, typ, userId, imageSrc, name};
}
 




function ShowAll() {

const [profiles, setProfiles] = useState();
const [errors, setErrors] = useState("");
const [showCards, setShowCards] = useState(false);
const {userId, firstname, lastname} = useParams();
const [user, setUser] = useState();
const [errorMessege, setErrorMessege] = useState("");


  useEffect(() => {


    axios({
        method: 'get',
        url: `${BASE_URL}/GET/getUsers.php`,
        config: {headers: {'Content-Type': 'application/json'}}
      }).then(res =>{

        let data1=[];
      Array.isArray(res.data) && res.data.forEach((user)=>{
       data1 = [...data1, createMyData(user["addressName"], user["firstname"], user["lastname"],
                                     user["position"], user["typ"], user["userId"], user["imageSrc"]) ]        
        });
        setProfiles(data1);
      
      }).catch(err =>{
        setErrors(err.response.status)
      });



  },[]);
  

useEffect(() => {

  if(typeof userId !== "undefined"){

    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers['Content-Type'] = 'application/json';
    axios.get(`${BASE_URL}/GET/getUser.php?userId=${userId}`)
    .then((response) => {
      
      setUser(response.data);
    })
    .catch((error) => {
      error.response.status === 404 ? setErrorMessege("Kein User gefunden") : setErrorMessege("");
    });
    
  }

},[userId, firstname, lastname])


      
        

        return (<>

        <Navi currentActive={"profile"}/>


        {(errors ||  errorMessege) && <Alert severity="error"> {"Keine Daten gefunden"} </Alert>}
        <Container >
        { typeof userId === "undefined" ? 
            <Row>
          <div style={{display: "flex", flex: '1', justifyContent: 'center', marginBottom: "2%"}}>
          <Button 
               
                onClick={ ()=>{setShowCards(true)} }

                type="submit"
                
                variant="contained"
                color="primary"
                style={{marginRight: "2%"}}
              > 
          <PeopleIcon />
                
              </Button>
         
          <Button 
                onClick={ ()=>{setShowCards(false)} }
                type="submit"
                variant="contained"
                color="primary"
              > 
          <ViewListIcon />
                
              </Button>

          </div>

         { showCards ? <Accounts users={profiles}/> : profiles && <ProfilesTable  myColumns={myColumns} myRows={profiles}  />}

          </Row>
        
          : <Profile user={user}/>
        
}
         
  
</Container>


            
        </>);
    
    
}
 
export default ShowAll;




