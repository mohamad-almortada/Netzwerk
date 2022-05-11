import "../../App.css"

import {Navbar, Nav} from 'react-bootstrap';
import NeDiChe from "../../assets/NeDiChe.png"

// matrial icons
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ManageAccountsRoundedIcon from '@mui/icons-material/ManageAccountsRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ViewListRoundedIcon from '@mui/icons-material/ViewListRounded';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';


const Navi = ({currentActive}) => {
  
  
  const logoSrc = NeDiChe;

    return ( 
 <>
      
        <Navbar className="navbar" expand="md" 
        style={{backgroundColor: 'rgb(53, 204, 184)',
               marginBottom: '2%',
               paddingLeft: '2%',
               paddingRight: '2%'}} >

            <Navbar.Brand href="/home">
              <img
              src={logoSrc}
              width="200rem"
              height="90rem"
              alt="NeDiChe Logo"
              title="NeDiChe Homepage"
              />
            </Navbar.Brand>
            <Navbar.Toggle title="Funktionen zeigen"/>
            <Navbar.Collapse>
              
              <div style={{ width: "50%"}}></div>
              <Nav variant="tabs" className="w-100 nav-justified" defaultActiveKey={currentActive} >
              <Nav.Item>
                <Nav.Link style={{justifyContent: "center", height: '5rem'}} eventKey= "home" title="Homepage" href="/home">
                  <HomeRoundedIcon sx={{mr: 2}}/>
                   Startseite
                  </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{justifyContent: "center", height: '5rem'}} eventKey="karte" title="Karte Zeigen" href="../../../karte">
                  <AddLocationAltOutlinedIcon sx={{mr: 2}}/>
                   Karte
                  </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{justifyContent: "center", height: '5rem'}} eventKey="profile" title="Profile ansehen" href="../../../profile">
                  <ViewListRoundedIcon sx={{mr: 2}}/>
                   Profile
                  </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{justifyContent: "center", height: '5rem'}} eventKey="profil-aendern" title="Profil Ändern" href="../../../profil-aendern">
                  <ManageAccountsRoundedIcon sx={{mr: 2}}/>
                   Ändern
                  </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link style={{justifyContent: "center", height: '5rem'}} eventKey="profil-erstellen" title="Neues Profil anlegen" href="../../../profil-erstellen">
                  <AddRoundedIcon sx={{mr: 1}}/>
                   Eintragen
                  </Nav.Link>
              </Nav.Item>
              
              </Nav>
              </Navbar.Collapse>
            
               
          
          </Navbar> 
                </>
          
          );
}
         
export default Navi;