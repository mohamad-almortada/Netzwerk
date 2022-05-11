import ProfileCard from './ProfileCard';

import {Container} from 'react-bootstrap';

import { useNavigate } from "react-router-dom";

import Divider from '@mui/material/Divider';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { List, Button, Typography } from '@material-ui/core'
import ButtonBase from '@mui/material/ButtonBase';



// const BASE_URL = process.env.REACT_APP_NEDICHE_API;

const Info = (props) => {
  const {data} = props;

  let navigate = useNavigate();
 
    const handleClick = (userId, firstname, lastname) => {
      navigate(`/profile/${userId}/${firstname}-${lastname}`);
    }


    return ( <>

    <Container style={{ margin: "0", padding: '0'}}>

 
    <List> 
      {data.address && <Typography variant="h4" align="center" style={{nowWrap: 'break-word'}} gutterBottom >
        {data.typ === "ZfsL" ? data.typ + " " + data.address : data.address}
      </Typography>}

      {data.address && <Divider />}

         
       {data.users  ? data.users.map((user, index)=>{  
         if(!user.additionalTitle) user.additionalTitle = "";
         if( user.image === 'undefined') user.image = "";
         
         return <div key={index} style={{width: "100%"}}>
                  <ButtonBase style={{width: "100%"}}  onClick={()=>handleClick(user.userId, user.firstname, user.lastname)}>
                    <ProfileCard user={user}/>
                  </ButtonBase>

    </div>
            
        }

       ):  data.users === null ? <Typography varaint="h6" align="center" style={{marginTop: "10%"}}> 
         {"Noch keine Mitglieder. Machen Sie als erster mit, indem Sie das Eintragsformular abschicken."}  <br />
         <Button
           type="submit"
           onClick={() =>{navigate("../add-account")}}
           variant="text"
         > <AddBoxIcon/> </Button></Typography>: (
           <Typography variant="h4" align="center">
           Willkommen 
           <Divider />
           <br />
           Klicken Sie auf einem Marker, um die Mitglieder anzusehen
         
         </Typography>
       
         
   
         )} 
  
        </List>

    </Container>

    </> );
}
 
export default Info;