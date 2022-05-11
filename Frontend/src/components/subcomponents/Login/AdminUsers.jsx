

import {useState} from 'react';
import AdminTable from './AdminTable';
import AdminUsersDialog from './AdminUsersDialog';

const columns = [
  { id: 'Photo', label: 'Foto', width: 100, align: 'left'},
  { id: 'firstname', label: 'Vorname',  width: 100, align: 'left'},
  { id: 'lastname', label: 'Nachname',  width: 100, align: 'left'},
  { id: 'addressName', label: 'Addresse',  width: 100, align: 'left'},
  { id: 'email', label: 'Benutzername/E-Mail',  width: 150, align: 'left'},
  { id: 'publicEmail', label: 'Kontakt E-Mail',  width: 70, align: 'left'},
  { id: 'title', label: 'Title', width: 100, align: 'left' },
  { id: 'position', label: 'Position',  width: 100, align: 'left'},
  { id: 'additionalTitle', label: 'Zusatz Title', width: 120, align: 'left' },
  { id: 'website', label: 'Webseite',  width: 150, align: 'left'},
  { id: 'tel', label: 'Tel',  width: 150, align: 'left'},
  { id: 'keywords', label: 'Schlagworte',  width: 200, align: 'left'},
  { id: 'activities', label: 'Dig. Aktivitaeten', width: 300, align: 'left' },
  { id: 'fieldsOfResearch', label: 'Forschungsgebiete', width: 300, align: 'left' },
 
];



const AdminUsers = (props) => {
    const [userId, setUserId] = useState(0);
    const [open, setOpen] = useState(false);
    const [userEmail, setUserEmail] = useState("");

    
    return ( <>
    
    
    {
        open && 
        <AdminUsersDialog open={open} 
        handleClose={()=>{setOpen(false)}} 
        userId={userId} 
        handleDeleteUser={props.handleDeleteUser}
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



    </> );
}
 
export default AdminUsers;