
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Container, Row, Col} from 'react-bootstrap';

export default function AdminDialog({openDialog, handleClose, userId, handleDelete, handleInsert, getUserEmail}) {
  
 
  return (

    <Container fluid="md" >
     
      
      <Dialog open={openDialog} onClose={handleClose} fluid="md"  >
        <DialogTitle fluid="md"  style={{ backgroundColor: "#d7fcae"}}>User Verwalten</DialogTitle>
        <DialogContent fluid="md"  style={{ backgroundColor: "#d7fcae"}}>
          <DialogContentText>
            Benutzer E-Mail: <strong>{getUserEmail}</strong> 
          </DialogContentText>
         



<Row style={{marginBottom: '3%'}}>

    <Col sm={6} style={{marginBottom: "1%"}}> 
    
        <Button 
                onClick={ (event)=>{event.preventDefault();
                    handleInsert(userId);
                    handleClose();
                }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
               
                >Freigeben 
        </Button>
    </Col>

    <Col sm={6} style={{marginBottom: "1%"}}>
        <Button 
                onClick={ (event)=>{event.preventDefault(); 
                    handleDelete(userId);
                    handleClose();
                   
                }}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
               
                >Löschen 
        </Button>
    </Col>
    
    
  
</Row>


        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
        </DialogActions>
      </Dialog>
    
    
      </Container>

  );
}
