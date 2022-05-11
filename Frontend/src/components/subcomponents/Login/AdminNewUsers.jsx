

import {useState} from 'react';

import AdminTable from './AdminTable';
import AdminDialog from './AdminDialog';

import { Button } from '@material-ui/core';
import FormHelperText from '@mui/material/FormHelperText';

const columns = [
  { id: 'Photo', label: 'Foto', width: 100, align: 'left'},
  { id: 'email', label: 'Benutzername/E-Mail',  width: 150, align: 'left'},
  { id: 'publicEmail', label: 'Kontakt E-Mail',  width: 70, align: 'left'},
  { id: 'firstname', label: 'Vorname',  width: 100, align: 'left'},
  { id: 'lastname', label: 'Nachname',  width: 100, align: 'left'},
  { id: 'title', label: 'Title', width: 100, align: 'left' },
  { id: 'additionalTitle', label: 'Zusatz Title', width: 120, align: 'left' },
  { id: 'website', label: 'Webseite',  width: 150, align: 'left'},
  { id: 'tel', label: 'Tel',  width: 150, align: 'left'},
  { id: 'position', label: 'Position',  width: 100, align: 'left'},
  { id: 'addressName', label: 'Addresse',  width: 100, align: 'left'},
  { id: 'lat', label: 'Latitude',  width: 100, align: 'left'},
  { id: 'lon', label: 'Longitude',  width: 100, align: 'left'},
  { id: 'keywords', label: 'Schlagworte',  width: 200, align: 'left'},
  { id: 'activities', label: 'Dig. Aktivitaeten', width: 300, align: 'left' },
  { id: 'fieldsOfResearch', label: 'Forschungsgebiete', width: 300, align: 'left' },
 
];



export default function AdminNewUsers(props) {
 
  
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState(0);
  const [userEmail, setUserEmail] = useState("");



  return (
    <>
     
        
        {props.myRows && props.myRows.length >= 50 &&
          <FormHelperText> Im Fall von Spam, so können Sie die ersten 50 Anfragen löschen. Dieser Vorgang ist nicht rückgängig. </FormHelperText>}
      <Button 
        onClick={ ()=> props.handleCleanUp(50)}
        type="submit"
        style={{marginLeft: "10%", marginBottom: '4%'}}
        variant="contained"
        color="primary"
        disabled={props.myRows && props.myRows.length < 50}
        > Spam aufräumen  
      </Button>

     
      
      {
        open && 
        <AdminDialog openDialog={open} 
        handleClose={()=>{setOpen(false)}}  
        userId={userId} 
        handleInsert= {props.handleInsert}
        handleDelete={props.handleDelete}
        getUserEmail= { userEmail }
        />
      }


      <AdminTable 
      myColumns={columns} 
      myRows={props.myRows} 
      isOpen={(e)=>{setOpen(e)}} 
      getUserId={(e)=>{setUserId(e)}} 
      getUserEmail={ (email) => {setUserEmail(email)}}
      />

   
    </>

      );
    }
    