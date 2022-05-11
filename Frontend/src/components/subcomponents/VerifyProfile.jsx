
import axios from "axios";
import {useParams } from 'react-router-dom';
import {useEffect, useState} from 'react';
import Alert from '@mui/material/Alert';  
import Navi from './Navi';
import {Container} from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_NEDICHE_API;

const VerifyProfile = () => {
    const {token, userId} = useParams();
    const [feedback, setFeedback] = useState("");

    useEffect(()=>{
        axios.defaults.baseURL = BASE_URL;
        axios.defaults.headers['Content-Type'] = 'application/json';
        axios.post(`${BASE_URL}/POST/verifyUser.php`, {token: token, userId: userId})
        .then((res)=>{
            res.data.valid === "true" ? setFeedback("success") : res.data.valid === "false" ? setFeedback("error") : setFeedback(res.data);
        })
        .catch((err)=>{
    // console.log(err);
    
        });
    },[token, userId]);

    return ( <>
    <Navi />
  
    <Container>
        {
            feedback && feedback === "success" ? <Alert severity="success">
                                                Vielen Dank! Das Profil wurde erfolgreich verifiziert
                                            </Alert> 
                                            : feedback === "error" ?
                                            <Alert severity="error">
                                                Ein Fehler ist aufgetreten :(
                                            </Alert> : 
                                            <Alert severity="warning">
                                           {feedback}
                                            </Alert> 

    }
        
    </Container>

    </> );
}
 
export default VerifyProfile;