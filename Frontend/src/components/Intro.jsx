import { useState } from 'react';
import { Navigate } from "react-router-dom";


import Navi from './subcomponents/Navi';
import Map from './subcomponents/Map'
import Footer from './subcomponents/Footer';

import {Button} from "react-bootstrap";
import Highlighter from "react-highlight-words";
import MapRoundedIcon from '@mui/icons-material/MapRounded';

import Networking from "../assets/Networking.svg";
import Foto from "../assets/foto.svg";






const Intro = () => {
    
    // Homepage title, and list of its words to use it in higlighter, the same applies to page description.
    let title = "Netzwerk der Chemieunterricht"; 
    let titleWords = title.split("\\s");
    
    let description = "Eine App zur Vernetzung Wissenschaftler*innen  der Didakatik der Chemie in NRW";
    let descriptionWords = description.split("\\n");

    let datenschutzLink = "";
    let impressumLink = "";

    // More details to show at the end of the footer on homepage.
    let furtherDetials = "";
    
    // By clicking on the intro-button, go to the map.
    let [goToMap, setGoToMap] = useState(false);

    let handleClickIntro = () =>{
        setGoToMap(true);
    }
   
    return ( 
    <>
        <div>
            <div>
                <Navi currentActive={"home"}/>

                <div className="intro-map-title-wrapper">
                    <Map className="intro-map" opacity={0.7} mapWidth = {"100%"} mapHeight={"100vh"}/>

                    

                    <Highlighter
                        title="Netzwerk der Chemieunterricht Title"
                        searchWords={titleWords}
                        autoEscape={false}
                        textToHighlight={title}
                        className="intro-title"
                        highlightStyle={{ backgroundColor: '#ffd54f',  borderRadius: "50% 40% / 90% 10%" }}
                    />                   
                
                    <Button id="intro-button" onClick={handleClickIntro} title="Karte Zeigen">
                        Zur Karte
                        <MapRoundedIcon id="intro-map-icon" fontSize="large"  />
                    </Button>
                   
                </div>
                
                {goToMap && <Navigate to="/karte" />}
                
                

                
                <div className="div-and-text">
                    <p id="text-box">
                    <Highlighter
                    searchWords={descriptionWords}
                    autoEscape={true}
                    textToHighlight={description}
                    highlightStyle={{ backgroundColor: '#35ccb8',  borderRadius: "5px" }}

                />
                    </p>
                    
                    <img style={{width: "40%"}} src={Foto} alt="netzwerk Foto" />
                </div>
                <div className="div-and-text">
                    
                    <img style={{width: "40%"}} src={Networking} alt="netzwerk Foto" />
                    <p id="text-box">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor
                    um nemo id voluptatem facilis voluptatibus delectus officia magni eligendi. 
                        Voluptatem explicabo totam dolorum! Consequatur quisquam nihil ea doloremque unde, facilis maxime.
                    </p>
                </div>
     
                <Footer furtherDetials={furtherDetials} datenschutz={datenschutzLink} 
                impressum={impressumLink}/>
            </div>
        </div>  
    </>
    );
}
 
export default Intro;