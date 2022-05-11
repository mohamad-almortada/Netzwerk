import { List, ListItem, ListItemText, Button } from '@material-ui/core';
import{Container, Row, Col} from 'react-bootstrap';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import { TextField } from '@material-ui/core';
import Divider from '@mui/material/Divider';

import Avatar from '@mui/material/Avatar';


import Badge from '@mui/material/Badge';




const FormPreview = (props) => {
 
  const   {title, email, firstname, lastname, tel, addressAuto, website, position,
           keywords, additionalTitle, additionalLinks, activities, 
           fieldsOfResearch, publicEmail} = props.entries;
  


  const handleSubmit =  (event)=>{
    event.preventDefault();
     props.handleSubmit();
  }

  return (
    <>
    <Container fluid="md" 
    style={{maxWidth: '800px',
            justifyContent: 'space-between',
            backgroundColor: "#d7fcae",
            paddingLeft: '4%',
            paddingRight: '4%',
            marginTop: "2%", borderRadius: "10%"}} >
      { <Badge badgeContent={ props.entries.formNumber + "/4"} style={{float: 'right'}} color="warning" />}
 
     {/* <Profile user={{firstname: firstname, lastname: lastname, keywords: keywords,
       website: website, position: position, title: title, publicEmail: publicEmail, fieldsOfResearch: fieldsOfResearch, 
       tel: tel, email: email, address: addressAuto, activities: activities, additionalTitle: additionalTitle, additionalLinks: additionalLinks}}/> */}
     <Row>
   
  
        <List>
          <Col>
        <ListItem>
        <ListItemText primary="Foto" />

        <Avatar src={props.entries.image} 
              alt={""}
              style={{width: '50%', height: "65%"}}
          />      
        </ListItem>
        </Col>
        <Divider />
        <ListItem>
            <ListItemText primary="Title" secondary={title.length ? title : '--'}/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Zusatz Title" secondary={additionalTitle.length ? additionalTitle : '--'}/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Benutzername/E-Mail" secondary={email}/>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Kontakt E-Mail" secondary={publicEmail}/>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Vorname" secondary={firstname}/>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Nachname" secondary={lastname}/>
          </ListItem>
          <Divider />
         
          <ListItem>
            <ListItemText primary="Position" secondary={position}/>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Addresse" secondary={addressAuto.addressName}/>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Tel" secondary={tel}/>
          </ListItem>
          <Divider />
          
          <ListItem>
            <ListItemText primary="Website" secondary={website}/>
          </ListItem>
          <Divider />


          <ListItem>
            <ListItemText primary="Digitalisierungsbezogenen Aktivitäten" secondary={activities} style={{wordBreak: 'break-all'}}/>
          </ListItem>
          <Divider />

          <ListItem>
            <ListItemText primary="Forschungsgebiete/-interessen" secondary={fieldsOfResearch} style={{wordBreak: 'break-all'}}/>
          </ListItem>
          <Divider />
            
          <ListItem>
            <ListItemText primary="Links zu eigenen Produkten, Projekte oder weiteren Inhalten" secondary={additionalLinks} style={{wordBreak: 'break-all'}}/>
          </ListItem>
          <Divider /> 

          <ListItem>
            <ListItemText primary="Schlagworte" secondary={keywords && keywords.map(keyword => keyword).join(' | ')} style={{wordBreak: 'break-all'}}/>
          </ListItem>
          <Divider />
        
          {/* honeybot to capture  bots and handle them  on serverside */}
          <TextField 
            name="work"
            placeholder="work"
            label="work"
            required
            variant="filled"
            style={{display:  'none'}}
            tabIndex={-1}
        />
         
        </List>
     </Row>

       
        <Row  >
          <Col  xs={12} sm={6}>
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
          <Col  xs={12} sm={6}>
            <Button 
              onClick={handleSubmit  }
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              
            >
              Abschicken
              <CheckIcon sx={{marginLeft: '4%'}}/>
            </Button>
          </Col>
        </Row>
      
    </Container>
    </>
  )
}

export default FormPreview;
