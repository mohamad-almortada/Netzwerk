import React, { Component } from 'react';



import Navi from './subcomponents/Navi';
import Info from './subcomponents/Info';

import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from 'react-leaflet-markercluster';

import MultipleSelectChip from './subcomponents/SelectInterests'
import Paper from '@mui/material/Paper';


import {Container, Row, Col} from 'react-bootstrap';
import '../App.css';


const BASE_URL = process.env.REACT_APP_NEDICHE_API;


class MainMap extends Component {

  
    state = { 
      markers: [],   
    marker: {},
    other: [],
    toDisplayData : {},
    userData : {},
    keywords: [],
    selectedKeywords: [],
    selectedKeywordsIds: [],
    keywordsQuery: ""
  
  }; 



   getAddresses() {
  
     axios.defaults.headers['Content-Type'] = 'application/json';
    //  axios.defaults.baseURL = BASE_URL;
     axios.get(`${BASE_URL}/GET/getAllAddresses.php`).then(res =>{

  let markers = [...this.state.markers];
    res.data.forEach((address)=>{
      markers.length ? markers = [...markers, address]: markers= [address] ;
    });
    this.setState({markers: markers}); 
   
  }).catch(err =>{
    this.setState({error: err.message});
  });

  }

  

    // used to connect to external api 
    componentDidMount() {

      this.getAddresses();
      axios.defaults.headers['Content-Type'] = 'application/json';


    axios.get(`${BASE_URL}/GET/getKeywords.php`).then(res =>{
 
    let keywords = [...this.state.keywords];
    res.data.forEach((address) => {

        keywords.length ? keywords = [...keywords, address]: keywords= [address] ;
      });
      this.setState({keywords: keywords}); 
     
    
    }).catch(err =>{
      this.setState({error: err.message});
    });

}



    handleKeywordsChange= (event)=>{

      event.preventDefault();
    
      let value = event.target.value;
      let selectedKeywords = [];
      // let that = this;
     
      selectedKeywords =   typeof value === 'string' ? value.split(',') : value;
      const choosedKeywords = this.state.keywords.filter(element => selectedKeywords.includes(element.keyword));
      let keywordsIds = choosedKeywords.map(k => k["keywordId"]);
      let keywordsIdsStr = keywordsIds.toString();
      
      axios.defaults.headers['Content-Type'] = 'application/json';
      axios.defaults.baseURL = BASE_URL;
      axios.get(`/GET/getUsersByKeywords.php?keywords=${keywordsIdsStr}`).then(res =>{
        this.setState({toDisplayData: {users: (Array.isArray(res.data) && res.data ) ? res.data : res.data === "Leere Eingabe" && null}});
     }).catch(err =>{
        // console.log(err.response.status)
    });
     
      
      this.setState({ selectedKeywords: selectedKeywords, keywordsIds: keywordsIdsStr });
    
    }
    
    


    render() { 
      const {toDisplayData} = this.state;
      
      return (
      <>
  
        
        <Navi currentActive={"karte"}/>

    
        <Container fluid="xs"  style={{marginLeft: "4%", marginRight: "4%"}}>
        

          <Row sm={12}>

          <MultipleSelectChip 
          selectedKeywords= {this.state.selectedKeywords}
          keywords={this.state.keywords}
          
          handleKeywordsChange={this.handleKeywordsChange}/>
          </Row>
        
          <Row style={{width:'100%', marginTop: '1%'}}>
              <Col sm={12} md={8}>
                <MapContainer className="map" center={[51.2562,7.150]} 
                  zoom={8} 
                  style={{ height: "80vh", marginBottom: "2%"}}>
                  
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  />      

        

                  <MarkerClusterGroup>
                  {this.state.markers && this.state.markers.map((marker, index)=>{
                        
                        return <Marker position={[marker["lat"], marker["lon"]]} key={index}                
                                       eventHandlers= {{
                                          click: (e) => {                                    
                                              let that = this;

                                              axios({
                                                method: 'get',
                                                url: `${BASE_URL}/GET/getUsersAt.php?lat=${marker["lat"]}&lon=${marker["lon"]}`,
                                                config: {headers: {'Content-Type': 'application/json'}}
                                              }).then(res =>{
                                               
                                                let toDisplayData = {
                                                  typ : marker["typ"], 
                                                  address: marker["addressName"],
                                                  users: (Array.isArray(res.data) && res.data ) ? res.data : null,

                                                }; 
                                              
                                              
                                              that.setState({toDisplayData: toDisplayData});

                                            }).catch(function (error) {
                                              console.log(error);
                                            });
                                          }
                                  }}
                                  >
                                  <Popup>
                                    { marker["typ"] === "ZfsL" ? "Zfsl" : "" } {marker.addressName}
                                  </Popup>
                                </Marker>
                        
                      }) }

                  </MarkerClusterGroup>
                </MapContainer>      
          
              </Col>
        

      
      
      
          <Col  sm={12} md={4}>
            <Paper variant="outlined"  style= {{
                      borderRadius: '10px', 
                      backgroundColor: "#abcdef",
                      height: '80vh',
                      width: '100%',
                      overflowY: 'scroll',
                      zIndex: '1000',
                      }}
              >

              {toDisplayData && <Info data={toDisplayData} />}
            </Paper>          
          </Col>
                  
        </Row>
            
      </Container>

  </>
);}

}
export default MainMap;