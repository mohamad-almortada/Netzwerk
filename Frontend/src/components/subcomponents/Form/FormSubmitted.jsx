import Alert from '@mui/material/Alert';  
import MapIcon from '@mui/icons-material/Map';
import { Button } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

const FormSubmitted = ({modify}) => {
  let navigate = useNavigate();
  return (

    <>

    <Alert severity="success">
     {modify ? `Ihre Änderungen wurden erfolgreich vorgenommen.` : `Vielen Dank fürs Ausfüllen das Formular! Ihr Eintrag wurde erfolgreich abgeschickt.
      Nach Bearbeitung Ihrer Anfrage wird Ihnen eine E-Mail geschickt, 
      um Ihr Profil zu aktiviern. Sie haben 30 Tage Zeit, Ihre E-Mail zu bestätigen.`}
    </Alert>
    <Button 
      onClick={ ()=>{navigate("../map");} }
      type="submit"
      fullWidth
      variant="contained"
      color="primary"
    > 
      <MapIcon sx={{marginRight: '2%'}}/>
        zur Karte
  </Button>
    </>
  )
}

export default FormSubmitted;