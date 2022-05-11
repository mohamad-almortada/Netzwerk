import Alert from '@mui/material/Alert';
import Navi from './subcomponents/Navi'



const NoPage = () => {
    return ( <>
    <Navi/>
    <h2 style= {{textAlign: "center", 
                margin: "auto", 
                marginTop:"10%",
                textDecoration: "underline"}}
    >
    404 
    </h2>
    <Alert severity="error">
        Checken Sie bitte den eingegebenen Link und versuchen Sie erneut
    </Alert>

    
    </> );
}
 
export default NoPage;