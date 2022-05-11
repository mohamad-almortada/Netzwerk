

import SearchIcon from '@mui/icons-material/Search';

import { Grid, TextField, Button } from '@material-ui/core'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {useState, useEffect} from 'react';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const regexPattern = /^[a-zA-Z\u00df\u00dc\u00fc\u00d6\u00f6\u00c4\u00e4-]{2,}(?: [a-zA-Z\u00df\u00dc\u00fc\u00d6\u00f6\u00c4\u00e4-]+)*$/;
const BASE_URL = process.env.REACT_APP_NEDICHE_API;


export default function AdminAddressDialog({open, handleClose, address, handleDelete, setRefreshAddress, handleModify, search, addressObject}) {

  
  const [street, setStreet] = useState("");
  const [streetNr, setStreetNr] = useState("");
  const [plz, setPlz] = useState("");
  const [place, setPlace] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [typ, setTyp] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
 
  
  const [schoolError, setSchoolError] = useState(false);
  const [streetError, setStreetError] = useState(false);
  const [streetNrError, setStreetNrError] = useState(false);
  const [plzError, setPlzError] = useState(false);
  const [placeError, setPlaceError] = useState(false);
  const [typError, setTypError] = useState(false);
  
  const [disableSearch, setDisableSearch] = useState(true);
  

  const handleSubmit = () => {
    let parameters = {lat, lon, street, streetNr, plz, place, schoolName, typ};
    let coordinates = {lat: addressObject.lat, lon: addressObject.lon};
    handleModify(parameters, coordinates);
    handleClose();
  }


  const onTrigger = () =>
  {
    // schoolName, street, streetNr, plz, place

    setPlz( plz.trim() !== "" ? plz + " " : plz.trim()); 
    let address = street.trim() + ' ' + streetNr.trim() + ' ' + plz + place.trim();
   

  
  
  // parameters to adjust search query: Deutsch, Deutschland, and one result in json format.
  const params = "accept-language=de&countrycodes=de&limit=1&format=json";
  
  setTimeout(async () => {
    fetch(`https://nominatim.openstreetmap.org/search?q=${address}&${params}`)
    .then((response) =>{
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${ response.status }`);
      }
      return response.json();
    }).then((response) =>{
      
  
      if(response.length) {
   
      const newAddress =  {  
        addressName: schoolName,
         lat: response[0]["lon"], // OSM result: lat and lon have to be switched.
         lon: response[0]["lat"],
         street: street,
         buildingNr: streetNr,
         plz: plz,
         city: place,
         typ: typ
        };
  
        axios.defaults.withCredentials= true;
        axios.defaults.headers.post['Anti-CSRF']= localStorage.getItem('token');
        axios.defaults.headers['Content-Type']= 'application/json';
        axios.post(`${BASE_URL}/Admin/adminPostAddress.php`, newAddress)
        .then(function (res) {
    
          
          res.data && res.data === "valid" ? setRefreshAddress(true) : setRefreshAddress(false);
          // setAddressResult(res.data);
          handleClose();
          // that.setState({isSchool: true, openDialog: false});
          
        })
        .catch(function (error) {
          // console.log(error);
          // that.setState({isSchool: false, searchAddressError: "Ein Fehler ist aufgetreten."});
        });
  
  
      }else{
        console.log("KEINE Addresse wurde gefunden");        
      }
    }) }, 1500);

      // sendAddressUp(schoolName.trim(), street.trim(), streetNr.trim(), plz.trim(), place.trim()); 
  }



   // disables search button whenever any required field is empty.
   useEffect(()=>{
    street.trim() && streetNr.trim() && place.trim() && schoolName.trim()  && regexPattern.test(place.trim()) && typ.trim()
    ? setDisableSearch(false) : setDisableSearch(true);  
    (plzError && plz  &&  (plz.trim() === "" || ! /^([0-9] *){5}$/.test(plz) )   )  && setDisableSearch(true);
    
    
   }, [street, place, streetNr, schoolName, plz, plzError, typ]);
  
   useEffect(()=>{
    
    addressObject && addressObject.lat && setLat(addressObject.lat);
    addressObject && addressObject.lon && setLon(addressObject.lon);
    addressObject && addressObject.address && setSchoolName(addressObject.address);
    addressObject && addressObject.street && setStreet(addressObject.street);
    addressObject && addressObject.plz && setPlz(addressObject.plz);
    addressObject && addressObject.buildingNr && setStreetNr(addressObject.buildingNr);
    addressObject && addressObject.type && setTyp(addressObject.type);
    addressObject && addressObject.city && setPlace(addressObject.city);
   
   }, [addressObject])

  
 
  return (
 <>



      
      <Dialog open={open} onClose={handleClose} fluid="md"  >
        <DialogTitle fluid="md"  style={{ backgroundColor: "#d7fcae"}}>| Institut Verwalten |</DialogTitle>
        <DialogContent fluid="md"  style={{ backgroundColor: "#d7fcae"}}>
          <DialogContentText>
            Institut Name: {address && address}
          </DialogContentText>
         


          {/* <Row style={{marginBottom: '3%', marginTop: '3%'}} > */}




  
 
    
  
 
          
           <Grid container spacing={3} justifyContent="flex-end"> 

          { addressObject && <Grid item  xs={12} sm={6} >
                <TextField 
                name="lat"
                placeholder="latitude"
                label="Latitude"
                onChange={(v)=>{setLat(v.target.value); }}
                value={lat}
                required
                />
              </Grid>}

              
             { addressObject && <Grid item  xs={12} sm={6} >
                <TextField 
                  name="lon"
                  placeholder="Longitude"
                  label="Longitude"
                  onChange={(v)=> {setLon(v.target.value); }}
                  value={lon}                
                  required           
                />

                </Grid>}
            <Grid item  xs={12}   >
                <TextField 
                name="address"
                placeholder="Name der Addresse"
                label="Name der Addresse"
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
                  
                  helperText={ plzError &&  ( (! /^([0-9] *){5}$/.test(plz) || plz.trim() === "" ) &&  "Nur 5 Zahlen möglich") }
                                      
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

             

           { search ?   <Grid item  xs={6} >
               
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
            : 
            <Grid item  xs={6} >
               
            <Button 
            onClick={handleSubmit}

            disabled={disableSearch}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            >
           Addresse Aktualisieren
          </Button>

        </Grid>
            }

            <Grid item  xs={6} >
              <FormControl variant="standard" style={{width: '100%'}}
                error={ typError && typ.trim() === ""} >
              <InputLabel id="from-typ-label" required>Typ</InputLabel>
              <Select
                labelId="from-typ-label"
                id="form-typ"
                label="Typ"
                name="typ"
                placeholder="Typ"
                variant="filled"
                fullWidth
                onChange={(e)=>setTyp(e.target.value)}
                value={typ}
                onClose={()=>{typ === undefined || typ==="" ? setTypError(true) : setTypError(false); }}
              >
              
                <MenuItem style={{width: '100%'}} value={"Schule"}>Schule</MenuItem> <br />
                <MenuItem style={{width: '100%'}} value={"ZfsL"}>ZfsL</MenuItem> <br />
                <MenuItem style={{width: '100%'}} value={"Uni"}>Uni</MenuItem> <br />
                
              </Select>
            </FormControl>
            </Grid>

          <Grid item xs={12}> 
          <FormHelperText id="my-helper-text">Data &copy; OpenStreetMap contributors, <a href="https://osm.org/copyright"> ODbL 1.0.</a> .</FormHelperText> 
          </Grid>
    </Grid>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbrechen</Button>
          
        </DialogActions>
      </Dialog>
    
    
      </>

  );
}
