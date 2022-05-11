

import { Grid, TextField, Button } from '@material-ui/core'
import {useState, useEffect}  from 'react';
import SearchIcon from '@mui/icons-material/Search';



import FormHelperText from '@mui/material/FormHelperText';






const regexPattern = /^[a-zA-Z\u00df\u00dc\u00fc\u00d6\u00f6\u00c4\u00e4-]{2,}(?: [a-zA-Z\u00df\u00dc\u00fc\u00d6\u00f6\u00c4\u00e4-]+)*$/;



const SearchAddress = ({sendAddressUp}) => {

  const [street, setStreet] = useState("");
  const [streetNr, setStreetNr] = useState("");
  const [plz, setPlz] = useState("");
  const [place, setPlace] = useState("");
  const [schoolName, setSchoolName] = useState("");
  
  const [schoolError, setSchoolError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [streetNrError, setStreetNrError] = useState(false);
  const [plzError, setPlzError] = useState(false);
  const [placeError, setPlaceError] = useState(false);
  
  const [disableSearch, setDisableSearch] = useState(true);
  

// hidden textField as spam mitgation (honeypot)
  const [lastName, setLastName] = useState("");


  const onTrigger = () =>
  {
      sendAddressUp(schoolName.trim(), street.trim(), streetNr.trim(), plz.trim(), place.trim()); 
  }

  

   // disables search button whenever any required field is empty. lastname as anti-spam
   useEffect(()=>{

    street.trim() && streetNr.trim() && place.trim() && schoolName.trim() && !lastName && regexPattern.test(place.trim())
    ? setDisableSearch(false) : setDisableSearch(true);  
    (plzError && plz && (plz.trim() === "" || ! /^([0-9] *){5}$/.test(plz) )) && setDisableSearch(true);
    
   }, [street, place, streetNr, schoolName, lastName, plz, plzError]);
  

  return ( <>
    
  
 
           
           <Grid container spacing={3} justifyContent="flex-end"> 
            <Grid item  xs={12}   >
                <TextField 
                name="schoolName"
                placeholder="Name der Schule"
                label="Name der Schule"
                fullWidth
                onChange={(v)=>{setSchoolName(v.target.value); setSchoolError(true);}}
                error={ schoolError && schoolName.trim() === "" }
                helperText={ schoolError && (schoolName.trim() === "" ? 'Leers Feld' : ' ')  }
                value={schoolName}
               
            
                required
                />
              </Grid>   
              <Grid item  xs={12}   >
                <TextField 
                name="street"
                placeholder="Strasse"
                label="Strasse"
                fullWidth
                onChange={(v)=>{setStreet(v.target.value); setStreetError(true);}}
                error={  street.trim() === "" && streetError}
                helperText={ streetError && (street.trim() === "" ? 'Leeres Feld' : ' ') }
                value={street}
                required
                
                />
              </Grid>
          
              <Grid item  xs={12} sm={6} >
                <TextField 
                name="StreetNr"
                placeholder="Nr"
                label="Haus Nr"
                onChange={(v)=>{setStreetNr(v.target.value); setStreetNrError(true);}}
                error={streetNr.trim() === "" && streetNrError}
                helperText={ streetNrError && (streetNr.trim() === "" ? 'Leeres Feld' : ' ')  }
                value={streetNr}
                required
                
                />
              </Grid>

              
              <Grid item  xs={12} sm={6} >
                <TextField 
                  name="plz"
                  placeholder="Postleitzahl (optional)"
                  label="PLZ (optional)"
                  onChange={(v)=> {setPlz(v.target.value); setPlzError(true);}}
                  error={ plzError && (plz.trim() === "" || ! /^([0-9] *){5}$/.test(plz)) }
                  
                  helperText={ plzError && ( (! /^([0-9] *){5}$/.test(plz) || plz.trim() === "" ) &&  "Nur 5 Zahlen möglich") }
                                      
                  value={plz}                
                />

                </Grid>
        
              <Grid item  xs={12} >
                <TextField  
                name="ort"
                placeholder="Ort"
                label="Ort"
                onChange={(v)=>{setPlace(v.target.value); setPlaceError(true);}}
                value={place}
                required
                fullWidth
                error={place.trim() === "" && placeError}
                helperText={ placeError && (place.trim() === "" ? 'Leeres Feld' : ' ')}
                
                />
              </Grid>

                <TextField name="lastname" placeholder="lastname" onChange={(e)=>setLastName(e.target.value)} value={lastName} tabIndex={-1} 
                style={{display: 'none', opacity: '0.1', maxWidth: "1px"}} />

              <Grid item  xs={6} >
               
              <Button 
              onClick={onTrigger}

              disabled={disableSearch}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              >
              <SearchIcon />
            </Button>

        </Grid>

          <Grid item xs={12}> 
          <FormHelperText id="my-helper-text">Data &copy; OpenStreetMap contributors, <a href="https://osm.org/copyright"> ODbL 1.0.</a> .</FormHelperText>
            
          </Grid>
    </Grid>

       



    
    
       
    </> 
    );
}
 
export default SearchAddress;

