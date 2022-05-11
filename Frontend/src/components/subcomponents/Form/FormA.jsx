
import { Typography, TextField, Button } from '@material-ui/core';
import {Container, Row, Col} from 'react-bootstrap';

import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';
import FormHelperText from '@mui/material/FormHelperText';

import {useState}  from 'react';



const rePattern =  /^[a-zA-Z0-9]{2,60}(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*\+?(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*@[a-zA-Z0-9]{1,50}(?:(?:\.|-)[a-zA-Z]+)*\.[a-zA-z]{1,10}$/;
// const rePattern_3 = /^[a-zA-Z]+[a-zA-Z0-9]*(?:\.[a-zA-Z-]+)*(?:-[a-zA-Z]+)*@[a-zA-Z0-9]{1,50}(?:(?:\.|-)[a-zA-Z]+)*\.[a-zA-z]{1,10}$/;
// const rePattern2 = /^.+@.+\..+$/;
const namePattern = /^[a-zA-Z]+(?:-[a-zA-Z]+)*$/;

const FormA = (props) => {

  const {title, email, firstname, lastname, position, confirmEmail, additionalTitle} = props.entries;

    
  // let formMessage = "Füllen Sie bitte alle mit Sternchen markierten Felder aus";
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorConfirmEmail, setErrorConfirmEmail] = useState(false);
  const [errorFirstname, setErrorFirstname] = useState(false);
  const [errorLastname, setErrorLastname] = useState(false);
  const [errorPosition, setErrorPosition] = useState(false);

  


  // validate FormA: email, confirmEmail, firstname, lastname, position, title. Targeting empty fields and email-confirmEmail.

  const handleNextFormA = (event) =>{

    event.preventDefault(); 

      (email.trim() === "" ) ? setErrorEmail(true) :  confirmEmail.trim() === "" ? setErrorConfirmEmail(true) : !rePattern.test(email.trim()) 
      ? setErrorEmail(true): confirmEmail.trim() !== email.trim() ? setErrorConfirmEmail(true) : firstname.trim() === "" ? setErrorFirstname(true) : 
      !namePattern.test(firstname.trim()) ? setErrorFirstname(true) : lastname.trim() === "" ? setErrorLastname(true) :
      !namePattern.test(lastname.trim()) ? setErrorFirstname(true)
      : position.trim() === "" ? setErrorPosition(true) : props.nextForm();
  }



  return (
<>

  <Container fluid="md" 
    style={{ backgroundColor: "#d7fcae", marginTop: "3%", maxWidth: "800px", marginBottom: "3%"}} >
      {<Badge badgeContent={ props.entries.formNumber + "/4"} style={{float: 'right'}} color="warning" />}
      
 <Row>


    <Typography   variant="h4" align="center" style={{marginTop: "2%"}}>
      Persönliche Infos
    </Typography>
    
 </Row>
    
      <Row style={{marginBottom: '3%', marginTop: '3%'}}>
        <Col xs={4}>
       
         <Tooltip title="Titel">
          <FormControl variant="standard" style={{width: '100%'}}>
            <InputLabel id="from-title-label">Titel</InputLabel>
            <Select
              labelId="from-title-label"
              id="form-title"
              label="Titel"
              name="title"
              placeholder="Titel"
              variant="filled"
              fullWidth
              onChange={props.handleChange}
              value={title}
             
            >
              <MenuItem  style={{width: '100%'}} value=""> <span>&#8203;</span> </MenuItem><br />
              <MenuItem style={{width: '100%'}} value={"Dr."}>Dr.</MenuItem> <br />
              <MenuItem style={{width: '100%'}} value={"Prof. Dr."}>Prof. Dr.</MenuItem> <br />
              
            </Select>
          </FormControl>
          </Tooltip>
            
      
            </Col>


            <Col xs={4}>
       
            <Tooltip title="Zusatz Titel ">
        <TextField 
            name="additionalTitle"
            placeholder="Zusatz Titel"
            label="Zusatz Titel"
            variant="filled"
            fullWidth
            onChange={props.handleChange }
            value={additionalTitle}
           
        />
        </Tooltip>
      
            </Col>
      </Row>
      
        
          
      <Row style={{marginBottom: '3%'}}>
      <Tooltip title="E-Mail ">
        <TextField 
            name="email"
            placeholder="E-Mail"
            label="E-Mail"
            type="email"
            required
          
            variant="filled"
            fullWidth
            onChange={(e)=>{ props.handleChange(e); setErrorEmail(true);} }
            value={email}
            error={ errorEmail && (email.trim() === ""  || !rePattern.test(email.trim()) ) }
            helperText={ errorEmail ? ( (email.trim() === "" && 'Pflicht Eingabe. Bitte E-Mail eingeben') || ( !rePattern.test(email.trim())  
            && "Ungültige E-Mail") ) : "Dient als Benutzername (nicht öffentlich)" }
        />
        </Tooltip>
      </Row>
      
      <Tooltip title="E-Mail bestätigen">
        
      <Row style={{marginBottom: '3%'}}>
        <TextField 
            name="confirmEmail"
            placeholder="E-Mail bestätigen"
            label="E-Mail bestätigen"
            required
          
            type="email"
            variant="filled"
            fullWidth
            onChange={(e)=>{ props.handleChange(e); setErrorConfirmEmail(true);} }
            value={confirmEmail}
            error={ errorConfirmEmail && (confirmEmail.trim() === "" || confirmEmail.trim() !== email.trim()) }
            helperText={ errorConfirmEmail && ( (confirmEmail.trim() === "" && 'Pflicht Eingabe. Bitte E-Mail zur Bestätigung nochmal eingeben') 
            || (confirmEmail.trim() !== email.trim() && "Die Emails stimmen nicht überein" ) )  }
        />
      </Row>
      </Tooltip>
      <Row style={{marginBottom: '3%'}}>
            <Tooltip title="Vorname">
              
        <Col>
        <TextField 
          name="firstname"
          placeholder="Vorname"
          label="Vorname"
          required
        
          variant="filled"
          fullWidth
          onChange={(e)=>{ props.handleChange(e); setErrorFirstname(true);} }
          value={ firstname}
          error={errorFirstname && (firstname.trim() === "" || !namePattern.test(firstname.trim())) }
            helperText={ errorFirstname && ( (firstname.trim() === "" && 'Pflicht Eingabe. Bitte Vorname eingeben') 
            || (!namePattern.test(firstname.trim()) && "Vorname ungültig") )}
        />
        </Col>
      </Tooltip>

      
            <Tooltip title="Nachname">
              
<Col>
        <TextField 
          name="lastname"
          placeholder="Nachname"
          label="Nachname"
          required
          variant="filled"
     
          fullWidth
          onChange={(e)=>{ props.handleChange(e); setErrorLastname(true);} }
          value={lastname}
          error={ errorLastname && (lastname.trim() === "" ||  !namePattern.test(lastname.trim()) ) }
          helperText={errorLastname && ((lastname.trim() === "" && 'Pflicht Eingabe. Bitte Nachname eingeben') 
          || (!namePattern.test(lastname.trim()) && "Nachname ungültig") ) }
          />
          </Col>
      </Tooltip>
      </Row>
          
     
     
      <FormControl variant="standard" style={{width: '70%', marginBottom: "2%", marginLeft: "7%"}}
        error={  errorPosition && position.trim() === ""}
        title="Position"  
      >
            <InputLabel id="from-title-label" required>Position</InputLabel>
            <Select
              labelId="from-position-label"
              id="form-position"
              label="Position"
              name="position"
              
              placeholder="Position"
              variant="filled"
              // fullWidth
              onChange={props.handleChange}
              value={position}
              onClose={()=>{position === undefined ? setErrorPosition(true) : setErrorPosition(false); }}
            >
             

             {props.positions && props.positions.map( (pos, index) =>  {
                   
                  return <MenuItem key={index} style={{width: '100%'}} value={pos}>{pos}</MenuItem> 
             
           })
           }

              
            </Select>
            {errorPosition && <FormHelperText>{"Leer"} </FormHelperText> }
          </FormControl>
     
      
      
     
<Divider />
      <Button 
        onClick={ handleNextFormA }
        type="submit"
        fullWidth
        variant="contained"
        color="primary"> Weiter
        <ArrowForwardIcon sx={{ml: '4%'}}/>
      </Button>
  
       
      
    </Container>

</>

  )
}

export default FormA;