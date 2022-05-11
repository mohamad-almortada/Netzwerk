
import { TextField, Button } from '@material-ui/core';
import {Container, Row} from 'react-bootstrap';
import Alert from '@mui/material/Alert';



const LoginForm = (props) => {

    
    return ( <>
    

    <Container  style={{ backgroundColor: "#d7fcae", marginTop: "20%", maxWidth: "700px", marginBottom: "3%", borderRadius: "3%"}} >

       <Row style={{marginBottom: '3%'}}>

            { props.error &&  <Alert severity="error">
                
                    {props.error}
                
                </Alert>
            }

            <TextField 
            name="email"
            placeholder="E-Mail / Benutzername"
            label="E-Mail / Benutzername"
            variant="filled"
            
            onChange={props.handleEmail} 
            value={props.email}
            style={{marginTop: "3%", width: "70%", marginLeft: "13%"}}
            />

        </Row>

      

    <Row style={{marginBottom: '3%'}}>

        <TextField 
            name="password"
            placeholder="Passwort"
            type="password"
            label="Passwort"
            variant="filled"
            style={{width: "70%", marginLeft: "13%"}}
            onChange={props.handlePassword} 
            value={props.password}
            onKeyPress={(e)=>{e.key === "Enter" && props.handleSubmit(e);}}
        
        />
    </Row>
 
 
    <Button 
        onClick={ props.handleSubmit }
        type="submit"
        fullWidth
        variant="contained"
        color="primary"> Einloggen
            
    </Button>
  

    
</Container>
        </> );
}
 
export default LoginForm;