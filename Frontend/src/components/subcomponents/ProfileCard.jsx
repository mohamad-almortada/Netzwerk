import Avatar from '@mui/material/Avatar';
import {  Typography } from '@material-ui/core'
import MailIcon from '@mui/icons-material/Mail';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import InterestsIcon from '@mui/icons-material/Interests';
import Badge from '@mui/material/Badge';
import Chip from '@mui/material/Chip';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import {Container} from 'react-bootstrap';

const BASE_URL = process.env.REACT_APP_NEDICHE_API;


const ProfileCard = ({user, profiles}) =>{

    return (
      
      <>
              <Container style={{width: '100%', padding: "1%"}} >

                <Card style={{ marginLeft:"0", marginBottom: "2%", marginRight: '0', marginTop: "0", padding: "0", backgroundColor: "#D7FCAE", minWidth: "20rem"}}  >
                      <CardContent>
                       
                        <Typography gutterBottom variant="h5" component="div" >
                          
                          <Avatar  src={(user.imageSrc || user.image) && BASE_URL+`/uploads/${user.image  ? user.image : user.imageSrc ? user.imageSrc : ""}`}
                           style={{float: 'right', width: "5rem", height: "5rem"}} 
                           />
                        </Typography>
                        <Typography variant="h4" align="center" style={{overflowWrap: "break-word"}} gutterBottom >
                                                   {/* <p style={{nowWrap: 'break-word'}}>  */}
                            { user.firstname} {user.lastname}
                           {/* </p> */}
                      {user.position && <p style={{fontWeight: '10', fontSize: "16px"}}>{user.position}</p>}

                        </Typography>

                    <Typography variant="body2" component={"div"}>
                      {user.publicEmail && <MailIcon />} {user.publicEmail} <br />
                      {user.tel && <ContactPhoneIcon />} {user.tel}  <br />
                        

                  {(user.addressName || user.place) && <Typography paragraph>
                  <BusinessOutlinedIcon style= {{marginRight: "2%"}} />
                 {user.place && user.place} {user.addressName && user.addressName} 
                </Typography>}

                {user.position && <Typography paragraph> {user.position}</Typography>}
                        
                      {user.keywords &&  <Badge sx={{mr:2}} badgeContent={user.keywords.length} color="secondary">
                      <InterestsIcon  /> </Badge> }
                      {user.keywords && user.keywords.map( (el) =>  <Chip key={el} label={el} variant="outlined" />)}
       
                      </Typography>
        
                  </CardContent>
                 
            </Card>
        </Container>
        </>
    );
   
}
 
export default ProfileCard;