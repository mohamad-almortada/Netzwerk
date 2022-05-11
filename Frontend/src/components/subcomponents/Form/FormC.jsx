
import {Container, Row, Col} from 'react-bootstrap';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { ListItemText, Typography, TextField,Button } from '@material-ui/core';

import Avatar from '@mui/material/Avatar';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import Badge from '@mui/material/Badge';
import Input from '@mui/material/Input';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Chip from '@mui/material/Chip';


import {useState}  from 'react';


const BASE_URL = process.env.REACT_APP_NEDICHE_API +"/";
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: 48 * 4.5 + 8,
    
      width: 250,
    },
  },
  
};

const rePatternTel = /^\+?[0-9]{7,14}$/;
const FormC = (props) => {
  const [errorTel, setErrorTel] = useState(false);


  const handleKeywordsChange = (event) => {
    props.handleKeywordsChange(event);
  }

    return ( <>
    

    <Container fluid="md"  style={{ backgroundColor: "#d7fcae", marginTop: "3%", maxWidth: "800px", marginBottom: "3%"}}>
    { <Badge badgeContent={ props.entries.formNumber + "/4"} style={{float: 'right'}} color="warning" />}

    <Typography align="center" component="h1" variant="h4">
    Kontaktdaten &  Interessen 
  </Typography>

      <Row>
        <Col sm={4}> 
            {/* [ 'jpg', 'jpeg', 'png' ] */}
            <label htmlFor="contained-button-file">
                    
            <Input onChange={props.handleUpload} accept="image/*" id="contained-button-file" hidden type="file" />
          <FormHelperText>{"Erlaubte Formate fürs Foto:"} <strong>{"jpg, jpeg und png"}</strong></FormHelperText>
            <Button variant="contained" component="span" endIcon={<AddAPhotoIcon sx={{m: 1}}/>}>
              Hochladen
            </Button> 
          </label>
            
            </Col>
            <Col>    
            
      {(typeof props.entries.image !== 'object' && !props.entries.imageSrc) && <Chip label="Foto Entfernen" variant="outlined" style={{backgroundColor: "#ABCDEF"}} 
      onClick={props.handleRemovePhoto}/>}

      { props.entries.imageSrc && <Chip label="Foto Entfernen" variant="outlined" style={{backgroundColor: "#ABCDEF"}} 
      onClick={props.handleRemovePhoto}/>}
     
               <Avatar src={ (!props.entries.image || (typeof props.entries.image === "object" && props.entries.imageSrc !== ""))? `${BASE_URL}uploads/${props.entries.imageSrc}` : 
              typeof props.entries.image === 'object' ? "" : props.entries.image ? props.entries.image : ""} 
              alt={""}
              style={{width: '70%', height: "80%"}}
               />       
    
          </Col>
    </Row>
            
    <Row style={{marginBottom: '3%', marginTop: '3%'}}>
        <TextField 
            name="publicEmail"
            placeholder="E-Mail öffentlich (optional)"
            label="E-Mail öffentlich (optional)"
            type="email"
            variant="filled"
            fullWidth
            onChange={props.handleChange}
            value={props.entries.publicEmail}
        />
    
      </Row>
            <Row style={{marginBottom: '3%'}}>       
          <TextField 
          name="website"
          placeholder="Webseite (optional)"
          label="Webseite (optional)"
          variant="filled"
          fullWidth
          onChange={props.handleChange}
          value={props.entries.website}
          />
          </Row>
          <Row style={{marginBottom: '3%'}}>
            <TextField 
            name="tel"
            placeholder="Tel. Nummber (optional)"
            label="Tel. Nummber (optional)"
            variant="filled"
            fullWidth
            onChange={(e)=>{ props.handleChange(e); e.target.value==="" ? setErrorTel(false) : setErrorTel(true); }}
            value={props.entries.tel}
            error={ errorTel && ( !rePatternTel.test(props.entries.tel.trim()) ) }
            helperText={ errorTel &&  (  ( !rePatternTel.test(props.entries.tel.trim())  
            && "Ungültige Telefonnummer") )  }
            />
          </Row>

          <Row style={{marginBottom: '3%'}}>

          {/* <TextareaAutosize
            aria-label="minimum height"
            id="activities"
          label="Digitalisierungsbezogenen Aktivitäten"
          placeholder="Digitalisierungsaktivitäten"
         
          multiline
          name="activities"
            minRows={3}
            value={props.entries.activities}
            onChange={(e)=>{props.handleChange(e); }}
            helperText={  props.entries.activities && props.entries.activities.trim().length + " von 500" }
  
            style={{ width: '100%', backgroundColor: 'inherit' }}
          /> */}
          <TextField
          id="activities"
          label="Digitalisierungsbezogenen Aktivitäten"
          placeholder="Digitalisierungsaktivitäten"
          variant="filled"
          multiline
          name="activities"
          inputProps={{ maxLength: 500 }}
          maxRows={8}
          value={props.entries.activities}
          onChange={(e)=>{props.handleChange(e); }}
          helperText={  props.entries.activities && props.entries.activities.trim().length + " von 500" }

        />
          </Row>
          <Row style={{marginBottom: '3%'}}>
          <TextField
          id="fieldsOfResearch"
          variant="filled"
          placeholder="Forschungsgebiete/-interessen"
          label="Forschungsgebiete/-interessen"
          name="fieldsOfResearch"
          multiline
          inputProps={{ maxLength: 500 }}
          maxRows={8}
          value={props.entries.fieldsOfResearch}
          onChange={props.handleChange}
          helperText={ props.entries.fieldsOfResearch && props.entries.fieldsOfResearch.trim().length + " von 500" }

        />
          </Row>
          <Row style={{marginBottom: '3%'}}>
          <TextField
          id="links"
          variant="filled"
          label="Links zu eigenen Produkten, Projekte oder weiteren Inhalten"
          placeholder="Links zu eigenen Produkten, Projekte oder weiteren Inhalten"
          multiline
          name="additionalLinks"
          maxRows={8}
          // error={ props.entries.additionalLinks && props.entries.addtionalLinks.length+1 >= 500 }
          // helperText={"Max. Groesse ueberschritten"}
          inputProps={{ maxLength: 500 }}
          value={props.entries.additionalLinks}
          onChange={props.handleChange}
          helperText={ props.entries.additionalLinks && props.entries.additionalLinks.trim().length + " von 500" }

        />
          </Row>
      <FormControl variant="standard" style={{width: '100%', marginBottom: "2%"}}>
            <InputLabel id="from-keywords-label" required>Schlagworte</InputLabel>
            <Select
              multiple
              labelId="from-keywords-label"
              id="form-keywords"
              label="keywords"
              name="keywords"
              placeholder="Schlagworte"
              variant="filled"
              fullWidth

              onChange={handleKeywordsChange}
              value={props.entries.keywords}
              
              // input={<OutlinedInput label="Tag" />}
              MenuProps={MenuProps}

              renderValue={(selected) => selected.join(', ')}
            >


        

              {props.keywordsList.map((name) => 
          
             {return <MenuItem style={{width: '100%'}} key={name} value={name} divider> 
              <Checkbox style={{marginRight: '2%', marginLeft: '2%'}}  checked={props.entries.keywords.indexOf(name) > -1} />
              <ListItemText primary={name} />  <br />
              </MenuItem>}
          )}

{/* 
              <MenuItem style={{width: '100%'}} value={"1"}>Thema 1</MenuItem> <br />
              <MenuItem style={{width: '100%'}} value={"2"}>Thema 2</MenuItem> <br />
              <MenuItem style={{width: '100%'}} value={"3"}>Thema 3</MenuItem> <br />
              <MenuItem style={{width: '100%'}} value={"4"}>Thema 4</MenuItem> <br /> */}
         
              
            </Select>
          </FormControl>


{/* 
          <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.indexOf(name) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}

{/* <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-name-label">Name</InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          multiple
          // value={personName}
          // onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          // MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem
              key={name}
              value={name}
              // style={getStyles(name, personName, theme)}
            >
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl> */}
     <TextField name="username" placeholder="username" onChange={props.handleChange} value={props.username} tabIndex={-1} 
                style={{display: 'none', opacity: '0.1', maxWidth: "1px"}} />

            <Row style={{marginTop: '3%'}}>
  

              <Col >
              <Button 
                onClick={ (event)=>{event.preventDefault(); props.previousForm();} }
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              > 
                <ArrowBackIcon sx={{marginRight: '4%'}}/>
                Zurück
              </Button>
                </Col>
            
            <Col>
              <Button 
                onClick={ (event)=>{event.preventDefault(); props.nextForm();}}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                > Weiter
                <ArrowForwardIcon sx={{marginLeft: '4%'}}/>
              </Button>
            </Col>
            </Row>
    
        </Container>
    </> );
}
 
export default FormC;