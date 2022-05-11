import Navi from "./subcomponents/Navi"
import axios from 'axios';  
import Alert from '@mui/material/Alert';
import MainForm from './subcomponents/Form/MainForm';
import { Typography, TextField, Button } from '@material-ui/core';

import {Container} from 'react-bootstrap';
import {useState, useEffect} from 'react';
import '../App.css';

// validate authorization code: accepts only the random token (which is hexadecimal) with length of 8
const regexAuthCode = /^[a-zA-Z0-9]{8}$/;
const BASE_URL = process.env.REACT_APP_NEDICHE_API;
const rePattern =  /^[a-zA-Z0-9]{2,60}(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*\+?(?:(?:\.[a-zA-Z0-9]+)*|(?:(?:-|_)[a-zA-Z0-9]+)*|(?:[a-zA-Z0-9])*)*@[a-zA-Z0-9]{1,50}(?:(?:\.|-)[a-zA-Z]+)*\.[a-zA-z]{1,10}$/;

const ModifyAccount = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [notificationMessege, setNotificationMessege] = useState("");
  const [authCode, setAuthCode] = useState("");
  const [user, setUser] = useState({});
  const [disableButton, setDisableButton] = useState(false);
  const [emailError, setEmailError] = useState(false);


  const handleSendEmail = () => {
    
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.post(`${BASE_URL}/sendToken.php`,{email: email}
    ).then((res)=>{
      res.data.valid === "success" && handleAuthCode();
      res.data.valid === "success" ? setError("") : setError(res.data);
    }).catch((err)=>{
      // console.log(err);
    })

  }

  
  useEffect(() =>{
    !rePattern.test(email.trim()) ? setDisableButton(true) : setDisableButton(false);
    
    if(regexAuthCode.test(authCode.trim())  ){
      axios.defaults.baseURL = BASE_URL;
      axios.defaults.headers['Content-Type']= 'application/json';
      axios.post(`${BASE_URL}/POST/validateToken.php`, {token: authCode.trim(), email: email}
      ).then((res)=>{
        
        res.data && res.data.success === "true" && setUser(res.data.user) ;       
      }).catch((err)=>{
        // console.log(err);
      })
  
     
    }
  }, [ email, authCode]);


  const handleAuthCode = () => {
    setNotificationMessege(`Eine E-Mail wurde an Sie gesendet.
     Dort finden Sie den Authorizierungscode, den Sie hier eingeben können, um einen Zugang zu Ihren Daten zu sichern.
     Schauen Sie bitte ggf. im Spam Ordner.`);
    

    setShow(true);
  }

    return ( <>
  
  <Navi currentActive={"profil-aendern"}/>
  <Container>
        
   { JSON.stringify(user) === '{}' && <Typography variant="h6" align="center" style={{ marginBottom: "3%"}}>
     Um Ihren Eintrag ändern zu können, benötigen Sie einen Authorizierungscode, den Sie direkt unten, nach Eingabe Ihre E-Mail, anfordern können. 
     Bei der E-Mail handelt es sich um dieselbe E-Mail, die Sie bei der Registrierung angegeben haben. Der Authorizierungscode ist nur innerhalb
     von EINER Stunde gültig und nachher benötigen Sie einen Neuen. 
    </Typography>}

    { notificationMessege && JSON.stringify(user) === '{}' &&
        <Alert  severity="success" style={{ marginBottom: "3%"}}>
        {notificationMessege}
        </Alert>
    }

    {JSON.stringify(user) !== '{}' && <MainForm 
              title={user.title && user.title}
              additionalTitle= {user.additionalTitle && user.additonalTitle}
              email= {user.email && user.email}
              confirmEmail= {user.email && user.email}
              firstname= {user.firstname && user.firstname} 
              lastname= {user.lastname && user.lastname} 
              addressAuto= {{
                              addressName: user.addressName && user.addressName, 
                              city: user.city && user.city,
                              plz: user.plz && user.plz,
                              buildingNr: user.buildingNr && user.buildingNr,
                              street: user.street && user.street,
                              typ: user.typ && user.typ,
                              lat: user.lat && user.lat,
                              lon: user.lon && user.lon
                            }}
              tel= {user.tel && user.tel}
              website= {user.website && user.website}
              additionalLinks= {user.additionalLinks && user.additionalLinks}
              fieldsOfResearch= {user.fieldsOfResearch && user.fieldsOfResearch}
              publicEmail= {user.publicEmail && user.publicEmail}
              activities= {user.activities && user.activities}
              keywords= {user.keywords && user.keywords}
              image= {user.imageSrc && user.imageSrc}
              position= {user.position && user.position}
              modify= {true}
              userId={user.userId && user.userId}
    />}

    

      
    { error && <Alert severity="error"> {error} </Alert> }

    { !show ? <TextField 
              // tabIndex={1}
              name="email"
              placeholder="E-Mail"
              label="E-Mail"
              required
              variant="filled"
              InputProps= {{
              
                endAdornment: 
                <Button 
                  type="submit"
                  variant="contained"
                  disabled={ disableButton }
                  color="primary"
                  onClick={ (e)=>{
                    setDisableButton(true) 
                    handleSendEmail();
                  }} 
                > 
                Authorizierungscode Anfordern
              </Button>
              }}
              fullWidth
              onChange={(e)=>{ setEmail(e.target.value); setEmailError(true) } }
              value={email}
              error={ emailError && !rePattern.test(email.trim())  }
              helperText={emailError && ( !rePattern.test(email.trim())  && 'Die eingegebene E-Mail ist ungültig')  }
              />


          : JSON.stringify(user) === '{}' &&

            <TextField 
              name="otp"
              placeholder="Authorizierungscode"
              label="Authorizierungscode"
              required
              variant="filled"
              InputProps={{
                endAdornment: 
                <Button 
                  type="submit"
                  variant="contained"
                  color="primary"> 
                  Absenden            
                </Button>
              }}
              fullWidth
              onChange={(e)=>{ setAuthCode(e.target.value)} }
              value={authCode}
              />
      }

    
</Container>
</>);
}
 
export default ModifyAccount;

