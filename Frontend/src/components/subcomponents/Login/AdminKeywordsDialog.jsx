
import {useState} from 'react';

import {Container, Row, Col} from 'react-bootstrap';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminKeywordsDialog({open, handleClose, keyword, handleDelete, handleInsert, handleModify}) {

  const [newKeyword, setNewKeyword] = useState("");

 
  return (
 
    <Container fluid="md" >
  
      
      <Dialog open={open} onClose={handleClose} fluid="md"  >
        <DialogTitle fluid="md"  style={{ backgroundColor: "#d7fcae"}}>Schlagworte Verwalten</DialogTitle>
        <DialogContent fluid="md"  style={{ backgroundColor: "#d7fcae"}}>
          <DialogContentText>
            Schlagwort: {keyword}
          </DialogContentText>
         


          <Row style={{marginBottom: '3%', marginTop: '3%'}} >

            
              <TextField 
                      name="keyword"
                      placeholder="Schlagwort eingeben"
                      label="Schlagwort"
                      required
                      variant="filled"
                      fullWidth
                      InputProps= {
                        {
                            endAdornment: <Button 
                            onClick={ (event)=>{
                              event.preventDefault();
                              handleModify(keyword, newKeyword);
                              handleClose();
                            }
                          }
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                        
                          >Schlagwort Aktualisieren 
                          </Button>
                          }
                        }

                      onChange={(e)=>{ setNewKeyword(e.target.value); 

                      } }
                      value={newKeyword} 
                      
                      />
                      
          </Row>

          <Row>
        
              <Col sm={6} style={{marginBottom: "1%"}}>
                  <Button 
                          onClick={ (event)=>{event.preventDefault(); 
                              handleDelete(keyword);
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
