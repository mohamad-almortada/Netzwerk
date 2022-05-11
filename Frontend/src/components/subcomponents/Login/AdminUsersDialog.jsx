
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Container, Row} from 'react-bootstrap';


const AdminUsersDialog = ({open, handleClose, userId, handleDeleteUser, getUserEmail}) => {
    return ( <>


<Container fluid="md" >
    
      
      <Dialog open={open} onClose={handleClose} fluid="md"  >
        <DialogTitle fluid="md"  style={{ backgroundColor: "#d7fcae"}}>User Verwalten</DialogTitle>
        <DialogContent fluid="md"  style={{ backgroundColor: "#d7fcae"}}>
          <DialogContentText>
            Benutzer E-Mail: <strong>{getUserEmail}</strong> 
          </DialogContentText>
         



<Row style={{marginBottom: '3%'}}>

   

    
        <Button 
                onClick={ (event)=>{event.preventDefault(); 
                  
                    handleDeleteUser(userId);
                    handleClose();
                    
                }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
          
                >Löschen 
        </Button>
  
    
    
    

</Row>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
        
        </DialogActions>
      </Dialog>
    
    
      </Container>
    
    
    </> );
}
 
export default AdminUsersDialog;