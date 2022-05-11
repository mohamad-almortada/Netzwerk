import { Component } from 'react';
import imageCompression from 'browser-image-compression';


import axios from 'axios';  
import { Typography} from '@material-ui/core';
import FormA from './FormA';
import FormB from './FormB';
import FormC from './FormC';
import FormPreview from './FormPreview';
import FormSubmitted from './FormSubmitted';
import Alert from '@mui/material/Alert';  

import {createRef} from 'react'

let formMessage = "Füllen Sie bitte alle mit Sternchen markierten Felder aus";
const BASE_URL = process.env.REACT_APP_NEDICHE_API;

 class MainForm extends Component {

  constructor(props){
    super(props);
    this.myRef = createRef() 
    this.state = { 
      title: props.title ? props.title : "",
      email : props.email ? props.email : "",
      confirmEmail : props.confirmEmail ? props.confirmEmail : "",
      
      firstname: props.firstname ? props.firstname : "",
      lastname: props.lastname ? props.lastname : "",
      tel: props.tel ? props.tel : "",
    
      addressAuto: props.addressAuto ? props.addressAuto : {},
      // image: props.image ? props.image : {},
      image: props.modify ? "" : {},
      imageSrc: props.image ? props.image : "",

      addressData: props.addressData ? props.addressData : [],
      error: false,
      errorMessege: "",
      website: props.website ? props.website : "",
      publicEmail: props.publicEmail ? props.publicEmail : "",

      keywords: props.keywords ? props.keywords : [],
      keywordsList: props.keywordsList ? props.keywordsList : [],
      isSchool: false,

      position: props.position ? props.position : "",
      positions: [],

      
      additionalTitle: props.additionalTitle ? props.additionalTitle : "",
      activities: props.activities ? props.activities : "",
      fieldsOfResearch: props.fieldsOfResearch ? props.fieldsOfResearch : "",
      additionalLinks: props.additionalLinks ? props.additionalLinks : "",
      userId: props.userId ? props.userId : "",

      openDialog: false,
      searchAddressError: "",
      formNumber: 1, 
  }

  }

      
  handleOpenSearchAddressDialog = (value) => {
   this.setState({openDialog: value});
  }


componentDidMount(){

  axios.defaults.baseURL = BASE_URL;
  axios.defaults.headers['Content-Type'] = 'application/json';


  axios.get('/GET/getAddress.php').then(res =>{
      
      let data = [...this.state.addressData];
        res.data.forEach((address)=>{
         data = [...data, address];
        });
        this.setState({addressData: data}); 
      
      }).catch(err =>{
        this.setState({err: err.message});
      });


      axios.get('/GET/getPositions.php').then(res =>{
      
      let positions = [...this.state.positions];
        res.data.forEach((pos)=>{  positions = [...positions, pos[0]];
        });
        this.setState({positions: positions}); 

      }).catch(err =>{
        this.setState({err: err.message});
      });

      axios.get('/GET/getKeywords.php').then(res =>{
      
        let keywordsList = [...this.state.keywordsList];
          res.data.forEach( (element)=> {
             keywordsList = [...keywordsList, element['keyword']];
            });
            this.setState({keywordsList: keywordsList}); 
  
        }).catch(err =>{
          this.setState({err: err.message});
        });

}

handleKeywordsChange= (event)=>{

  event.preventDefault();

  let value = event.target.value;
  let keywords =[];
  keywords =   typeof value === 'string' ? value.split(',') : value;
 
  this.setState({ [event.target.name]: keywords});

}

 handleChange = event=> {
   this.setState({ [event.target.name]: event.target.value });
 }

nextForm = () => {
  this.setState({ formNumber: this.state.formNumber + 1 });
}

previousForm = () => {
  this.setState({ formNumber: this.state.formNumber - 1 });
}


//  wait 1.5 second, due to nominatim's policy, to make another request
handleAddress= (schoolName, street, streetNr, plz, place) =>{
 
  plz = plz.trim() !== "" ? plz + " " : plz.trim(); 
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
       typ: 'Schule'
      };

    let that = this;
      axios.post(`${BASE_URL}/POST/postAddress.php`, newAddress)
      .then(function (res) {
     
        that.setState({addressAuto: res.data});
        that.setState({isSchool: true, openDialog: false});
        
      })
      .catch(function (error) {
        // console.log(error);
        that.setState({isSchool: false, searchAddressError: "Ein Fehler ist aufgetreten."});
      });


    }else{
      console.log("KEINE");
      let that = this;
      that.setState({searchAddressError: "Kein Ergebnis gefunden. Prüfen Sie bitte Ihre Eingabe."})
      
    }
  }) }, 1500);
 
 
}


handleSubmit = () =>{


  

  let newUser = {

    email: this.state.email, 
    verifyEmail: this.state.confirmEmail,
    publicEmail: this.state.publicEmail,
    title: this.state.title,
    additionalTitle: this.state.additionalTitle,
    firstname: this.state.firstname,
    lastname: this.state.lastname,
    website: this.state.website, 
    tel: this.state.tel, 
    lat: !this.state.isSchool ? this.state.addressAuto["lat"] : this.state.addressAuto["lon"], 
    lon: !this.state.isSchool ? this.state.addressAuto["lon"] : this.state.addressAuto["lat"], 
    position: this.state.position,
    additionalLinks: this.state.additionalLinks,
    activities: this.state.activities,
    fieldsOfResearch: this.state.fieldsOfResearch,
    keywords: this.state.keywords,
    newImage: this.state.image
  };
 
 
  if(this.props.modify){
    newUser.userId = this.state.userId;
  
    axios.put(`${BASE_URL}/updateUser.php`, newUser)
    .then( (res) => {
      
      if(res.data === 1){
        this.nextForm();
      }
      else{
         let err = Object.values(res.data);
     
        this.setState({error: true, errorMessege: err});
        err && this.myRef.current.scrollIntoView()
      }
      
      }).catch((err) => {

       });
    
      } else {
            axios.post(`${BASE_URL}/newUsers.php`, newUser)
            .then( (res) => {
              
              if(res.data === 1){
                this.nextForm();
              }
              else{
                let err = Object.values(res.data);
            
                this.setState({error: true, errorMessege: err});
                err && this.myRef.current.scrollIntoView()
              }
            }).catch((err) => {
              // console.log(err)
            });
      }

  



}




handleUpload = (e) =>{

  let that = this;
  var imageFile = e.target.files[0];


  var options = {
    maxSizeMB: 1,
    maxWidthOrHeight: 1920,
    useWebWorker: true
  }

  imageCompression(imageFile, options)
  .then(function (compressedFile) {
     

      let fileReader = new FileReader();
      fileReader.readAsDataURL(compressedFile);

      fileReader.onload = (event) => {
          that.setState({
              image: event.target.result,
          })
      }

     
    })
    .catch( function(error) {
      // that.setState({errorMessage: error.message});
      // console.log(error.message);
    });



}



  render() {
   
    const { title, email, firstname, lastname, tel, website, position, addressAuto, confirmEmail, image, formNumber, 
      keywords, additionalTitle, additionalLinks, activities, fieldsOfResearch, positions, publicEmail, imageSrc} = this.state;

    const entries = { 
                        title, email, firstname, lastname, tel, addressAuto, confirmEmail, website, position,
                        image, formNumber, keywords, additionalTitle, additionalLinks, activities, fieldsOfResearch, publicEmail, imageSrc
                    };




                 
    
    return( <>

    {/* all forms are controlled by the internal state, based on this.formNumber  */}


  <Typography   variant="h4" align="center" style={{color: '#443'}}>
    {!this.props.modify ? "Anmeldeformular für die Eintragung in der Datenbank" : "Porfil Daten Ändern"}
</Typography>
<Typography   variant="h6" align="center" >
     {formMessage}
</Typography>
      
{this.state.errorMessege && <Alert severity="error" ref={this.myRef}> {this.state.errorMessege} </Alert> }
    

      {formNumber === 1 &&  
              <FormA 
              nextForm={()=> { this.nextForm();} }
              handleChange={ this.handleChange }
              entries={ entries }
              positions={positions}
              />
        

      }

      {formNumber === 2 &&        
            <FormB 
              previousForm={ this.previousForm }
              nextForm={ this.nextForm }
              handleChange={ this.handleChange }
              entries={ entries }
              sendAddressAuto = {(result)=>{ this.setState({addressAuto: result}) }}
              addressData = {this.state.addressData}
              sendAddressUp = {this.handleAddress}
              openDialog={this.state.openDialog}
              handleOpenSearchAddressDialog = {(value)=>{this.handleOpenSearchAddressDialog(value)}}
              searchAddressError= {this.state.searchAddressError}
            />
      }

    {formNumber === 3 &&   
              <FormC 
                previousForm={ this.previousForm }
                nextForm={ this.nextForm }
                entries={ entries }
                handleChange={ this.handleChange }
                handleUpload= {this.handleUpload}
                handleKeywordsChange={this.handleKeywordsChange}
                keywordsList = {this.state.keywordsList}
                handleRemovePhoto= {()=>{
                  this.setState({image: "", imageSrc: ""})
                  // URL.revokeObjectURL(image);
                  // inputFileRef.current.value = null;
                }}
              />
      }  


      {formNumber === 4 &&   
              <FormPreview 
                previousForm={ this.previousForm }
                nextForm={ this.nextForm }
                entries={ entries }
                handleSubmit={ this.handleSubmit}
                showError={this.state.error}
               

              />
      }  


      {formNumber === 5 && <FormSubmitted modify={this.props.modify && this.props.modify}/>}



</>)
 
}};

export default MainForm;