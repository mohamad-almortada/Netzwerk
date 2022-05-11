
import axios from "axios";
import {useEffect, useState} from 'react';
import LoginForm from './LoginForm';
import {Container} from 'react-bootstrap';

const Protected = ({children}) => {



    const [isAuthen, setIsAuthen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState("");
  

    const handleEmail = (e) =>{
        setEmail(e.target.value);         
       }
       const handlePassword = (e) =>{
        setPassword(e.target.value);         
    }


    const login = () =>{
  
      axios.post(`${process.env.REACT_APP_NEDICHE_API}/Admin/login.php`, { email: email, hashed_password: password }, {withCredentials: true}
      ).then(function (res) {
        //  console.log(res);
      
        res.data.anti_csrf ? setIsAuthen(true) : setErrors(res.data);
        res.data.anti_csrf  && localStorage.setItem('token', res.data.anti_csrf);

      }).catch(function (error) {
      
    //   console.log(error);
      });
  }

  
const handleSubmit = e =>{
    e.preventDefault(); 
    login(email, password);
}

    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.post(`${process.env.REACT_APP_NEDICHE_API}/Admin/verifyCookie.php`)
        .then((res)=>{    
          res.data.isValid === 'valid'  ? setIsAuthen(true): setIsAuthen(false);
         
        }).catch((err) => {
            // console.log(err);
        });
    })
    
    return ( <>
        <Container style={{alignItems: 'center'}} fluid="md">
   
        {
            isAuthen ? children 
            :  
            <LoginForm handleSubmit={handleSubmit}  handleEmail={handleEmail} handlePassword={handlePassword} error= {errors}/>     
        }
        </Container>
    
    </> );
}
 
export default Protected;