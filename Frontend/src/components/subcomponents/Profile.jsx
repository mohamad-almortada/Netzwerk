import {Container, Row, Col} from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import {Typography } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import InterestsOutlinedIcon from '@mui/icons-material/InterestsOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import Chip from '@mui/material/Chip';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import Badge from '@mui/material/Badge';

const BASE_URL = process.env.REACT_APP_NEDICHE_API;

const Profile = ({user}) => {
    return (<>
   


        

    <Container style={{
      borderRadius: '10px', 
      backgroundColor: "#d7fcae",  
      maxWidth: '800px',
      marginBottom: "2%"
    }}>
         {
           user &&
            <Row>


           
              <Col sm={6} md={7}>
                  
                <Typography  variant="h3" align="center" style={{overflowWrap: "break-word"}}>
                    {user.firstname && user.firstname} {user.lastname && user.lastname} 
                    
                    {user.position && <p style={{fontWeight: '10', fontSize: "24px"}}>{user.position}</p>}
                </Typography>
                <Divider />

                {user.title && <Typography variant="h6" >
                  <BadgeOutlinedIcon style= {{marginRight: "2%"}} />
                 {user.title &&  user.title} 
                  {user.additionalTitle && `| ${user.additionalTitle}`} 
                </Typography>}

                
              
                {user.addressName && <Typography paragraph style={{overflowWrap: "break-word"}}>
                  <BusinessOutlinedIcon style= {{marginRight: "2%"}} />
                 {user.addressName} 
                </Typography>}
                
                {user.publicEmail && <Typography paragraph style={{overflowWrap: "break-word"}} >
                  <EmailOutlinedIcon style= {{marginRight: "2%"}} />
                 {user.publicEmail} 
                </Typography>}

                {user.tel && <Typography paragraph style={{overflowWrap: "break-word"}} >
                  <ContactPhoneOutlinedIcon style= {{marginRight: "2%"}} />
                 {user.tel} 
                </Typography>}

                {user.website && <Typography paragraph style={{overflowWrap: "break-word"}} >
                  <LanguageOutlinedIcon style= {{marginRight: "2%"}} />
                 {user.website} 
                </Typography>}
                
                

                {user.keywords && <Typography component={"div"} >
                  {/* <InterestsOutlinedIcon style= {{marginRight: "2%"}} /> */}
                  <Badge sx={{mr:2}} badgeContent={user.keywords.length} color="secondary">
                  <InterestsOutlinedIcon style= {{marginRight: "2%"}} />
                  </Badge> 
                
                 {  user.keywords.map(    (k) =>  <Chip key={k} label={k}  style={{marginRight: "2%",  marginBottom: "2%"}}/>)} 
                </Typography>}

                
                
                {user.additionalLinks && <Typography paragraph style={{overflowWrap: "break-word"}}>
                <strong>Links zu eigenen Produkten, Projekte oder weiteren Inhalten </strong> <br />
                { user.additionalLinks}
                </Typography>}

                {user.fieldsOfResearch && <Typography paragraph style={{overflowWrap: "break-word"}}>
                <strong>Forschungsgebiete und/oder Interessen</strong> <br />
                { user.fieldsOfResearch} 
                </Typography>}

                

          
            </Col>
            
            <Col sm={2} md={4}>
               <Avatar  
                style={{minWidth: '15rem', minHeight: '20rem', marginTop: '2%'}}
                alt={user.lastname && user.lastname[0].toUpperCase()}
                src={user.image && `${BASE_URL}/uploads/${user.image}`}
              /> 

          </Col>

           

        <Row>
        {user.activities && <Typography paragraph style={{overflowWrap: "break-word"}}>
                          <strong>Digitalisierungsbezogene Aktivitäten </strong> <br />
                        {user.activities} 
                        </Typography>}
        </Row>

        

                
         
        </Row>
}
    </Container>
    </>  );
}
 
export default Profile;