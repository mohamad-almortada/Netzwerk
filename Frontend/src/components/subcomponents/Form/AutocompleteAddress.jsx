

import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import Autocomplete from '@mui/material/Autocomplete';
import {useEffect} from 'react';

const AutocompleteAddress = ({handleChange, selectedValue, data}) => {
   
  useEffect(() => {
    
  },[data])
   
    
  
    return ( <>

    <Autocomplete
      
        id="country-select-demo"
        sx={{ width: 400 }}
        onChange={(event, value)=>{handleChange(value); }}
        options={data}
        autoHighlight
        // defaultValue= {null}
        // when the object is empty, take the input value. elsewise use the selected value from props.
        value={(JSON.stringify(selectedValue) && selectedValue)}
        groupBy={(option) => option.typ }
        getOptionLabel={(option) => `${option.typ === "ZfsL" ? "ZfsL " + option.addressName : option.typ==="Uni" ? option.addressName : 
        option.typ === "Schule" ? option.addressName + " | " + option.city: ""}`}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        noOptionsText={"Keine Addresse gefunden"}
        renderOption={(props, option) => (
          <Box component="li"  {...props}>
           
             {option.typ === "ZfsL" ? "ZfsL " + option.addressName : option.typ==="Uni" ? option.addressName : 
             option.typ === "Schule" && option.addressName + " | " + option.city }
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Wählen Sie Bitte eine Addresse aus"
            required
          
          />
        )}
      />
    
    
    </> );
}
 
export default AutocompleteAddress;