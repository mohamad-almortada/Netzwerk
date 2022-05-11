import {useState, useEffect } from 'react';

import {Container, Row, Col} from 'react-bootstrap';



import Alert from '@mui/material/Alert';

import {Typography, Button } from '@material-ui/core'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FormControlLabel from '@mui/material/FormControlLabel';
import AutoCompleteAddress from './AutocompleteAddress'

import Badge from '@mui/material/Badge';

import FormDialog from './SearchAddressDialog'

const FormB = (props) => {

  const [disableNext, setDisableNext] = useState(true);



  const {addressAuto} = props.entries;

  useEffect(()=>{
  
  addressAuto === null || Object.keys(addressAuto).length === 0 ? setDisableNext(true) : setDisableNext(false);
  }, [addressAuto]);

  return (
<>

<Container>
 
 <Typography align="center" component="h1" variant="h5">
    Bitte Füllen Sie alle mit Sternchen * markierten Felder aus
  </Typography>
 
</Container>
    
 


<Container fluid="md"  style={{ backgroundColor: "#d7fcae", marginTop: "3%", maxWidth: "800px", marginBottom: "3%"}}>
      
{<Badge badgeContent={ props.entries.formNumber + "/4"} style={{float: 'right'}} color="warning" />}


      <Row>
      
      {props.searchAddressError && <Alert severity="error">Vfsadfsd {props.searchAddressError} </Alert>}

        <Typography align="center" component="h1" variant="h5" style={{marginBottom: "5%"}}>
          Addresse [Uni, ZfsL, Schule]
        </Typography>
      </Row>
        <Row>
         
         <AutoCompleteAddress data={props.addressData} 
         selectedValue={props.entries.addressAuto}  handleChange={(value)=>{props.sendAddressAuto(value)}} />
         </Row>



       <FormControlLabel label="Ihre Addresse ist nicht in der Liste? Versuchen Sie bitte hier" 
        control={<Button style={{marginLeft: "4%"}} variant="outlined" onClick={()=>{props.handleOpenSearchAddressDialog(true)}}>
        Addresse suchen
      </Button>} 
        labelPlacement="start"
        />

        

      
        <FormDialog 
        sendAddressUp= {props.sendAddressUp}  
        searchAddressError={props.searchAddressError}
        handleCloseDialog={()=>props.handleOpenSearchAddressDialog(false)} 
        openDialog={props.openDialog}
        />

            
            <Row style={{marginTop: '3%'}}>
  

              <Col>
              <Button 
                onClick={ (event)=>{event.preventDefault(); props.previousForm();} }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              > 
                <ArrowBackIcon sx={{marginRight: '4%'}}/>
                Zurück
              </Button>
                </Col>
            
            <Col>
              <Button 
                onClick={ (event)=>{event.preventDefault(); props.nextForm();}}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={disableNext}
                > Weiter
                <ArrowForwardIcon sx={{marginLeft: '4%'}}/>
              </Button>
            </Col>
            </Row>
           
           
       
    </Container>

  


</>
  )
}

export default FormB;