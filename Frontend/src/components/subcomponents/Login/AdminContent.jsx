
import {useState, useEffect}  from 'react';

import axios from 'axios';

import AdminKeywords from './AdminKeywords';
import AdminUsers from './AdminUsers';
import AdminNewUsers from './AdminNewUsers';
import AdminAddress from './AdminAddress';

import {Container} from 'react-bootstrap';

import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';

const BASE_URL = process.env.REACT_APP_NEDICHE_API;

/* This file handles the CRUD operations on the keyword list, delete existing users, and managing new requests. Hence, it make use of axios to post, get
    delete and put data to the api given in BASE_URL and specified in the corrosponding function. By get all a table is used where the admin can trigger 
    a pop up and perform the action on the specific table cell (user, keyword, or new registration request). Data is collected mostly in myRows
    and is passed down to the corrospondent component where the colum attribute is defined to show the table.
    Note that all requests are sent with cookies (PHPSESSID and csrf) setting the attribute WithCredintional= true. Also csrf cookie is stored in
    the **localStorage** to establish the double submit solution as a mitgation to csrf attack.*/
  



  function createMyDataUsers( email, firstname, lastname, title, website, 
                              tel, position, addressName, keywords, imageSrc,
                              publicEmail, additionalTitle, additionalLinks, 
                              fieldsOfResearch, activities, userId)
  {

    return { email, firstname, lastname, title, website, tel, position,
            addressName, keywords, imageSrc, publicEmail, additionalTitle,
            additionalLinks, fieldsOfResearch, activities, userId};
  }

  
const AdminContent = (props) => {


   
  const [keywordText, setKeywordText] = useState("");
  const [userRequests, setUserRequests] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [showMessege, setShowMessege] = useState(false); 
  const [errors, setErrors] = useState("");
  const [keywords, setKeywords] = useState([]);
  const [refreshKeywords, setRefreshKeywords] = useState(false);
  const [refreshUsers, setRefreshUsers] = useState(false);
  const [address, setAddress] = useState([]);
  const [refreshAddress, setRefreshAddress] = useState(false);
  const [users, setUsers] = useState([]);

  
// existing users effect (get all)
  useEffect(() => {
    
    axios.defaults.headers.get['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.headers['Content-Type']= "application/json";
    axios.defaults.withCredentials= true;

    axios.get(`${BASE_URL}/Admin/getUsersAdmin.php`)
        .then(res =>{

        let myRows1 = [];

        Array.isArray(res.data) && res.data.forEach((user)=>{ 
          myRows1 = [...myRows1, createMyDataUsers(user["email"], user["firstname"],
          user["lastname"], user["title"], user["website"], 
          user["tel"], user["position"], user["addressName"], 
          user["keywords"] && user["keywords"].join(" | "),  user["imageSrc"] ? "uploads/"+user["imageSrc"] : "",
          user["publicEmail"], user["additionalTitle"], user["additionalLinks"], 
          user["fieldsOfResearch"], user["activities"], user["userId"] ) ];
       
    
      });

      setUsers(myRows1);
      setErrors("");
      // setShowMessege(false);
      
    }).catch(err =>{
      console.log(err); 
    });
  
  }, [refreshUsers, props.drawerNumber]);

//  new requests effect (get all)
  useEffect(() => {
  
    axios.defaults.withCredentials= true;
    axios.defaults.headers.get['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.get(`${BASE_URL}/Admin/getNewUsers.php`)
    .then(res =>{

      let myRows1 = [];
       Array.isArray(res.data) && res.data.forEach((user)=>{ 
      
          myRows1 = [...myRows1, {email: user['email'], firstname: user['firstname'], lastname: user['lastname'], website: user['website'],
                                  tel: user['tel'], position: user['position'], lat: user['lat'], lon: user['lon'], addressName: user['addressName'], 
                                  keywords: user["keywords"] && user["keywords"].join(" | "), newUserId: user['newUserId'], title: user['title'],
                                  imageSrc: user['newImage'], publicEmail: user['public_email'], additionalTitle: user['additionalTitle'], 
                                  additionalLinks: user['additinoalLinks'], fieldsOfResearch: user['fieldsOfResearch'], activities: user['activities']
        } ];
                   
    
      });
      setUserRequests(myRows1);
      setErrors("");
    
     
   
      
    }).catch(err =>{
      console.log(err); 
    });
  
  }, [refreshTable, props.drawerNumber]);


// keywords effect (get all)
  useEffect(() => {
    axios.defaults.withCredentials= true;
    axios.defaults.headers.get['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.get(`${BASE_URL}/Admin/getKeywordsAdmin.php`)
    .then( (res) =>{
    
        let myRows1 = [];
        Array.isArray(res.data) && res.data.forEach((user)=>{
            myRows1 = [...myRows1, {keyword_id: user['keyword_id'], keyword: user['keyword']}];
        });
          setKeywords(myRows1);
          setErrors("");
          // setShowMessege(false);
      
    }).catch(err =>{
        console.log(err);
    });
  
  }, [refreshKeywords, props.drawerNumber]);
  

  // address effect (get all)
  useEffect(() => {
    axios.defaults.withCredentials= true;
    axios.defaults.headers.get['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.get(`${BASE_URL}/Admin/adminGetAddress.php`)
    .then( (res) =>{
    
        let myRows1 = [];
        Array.isArray(res.data) && res.data.forEach((user)=>{
            myRows1 = [...myRows1, {lat: user['lat'], lon: user['lon'], address: user['addressName'],
                                    type: user['typ'], street: user['street'], buildingNr: user['buildingNr'],
                                    city: user['city'], plz: user['plz'],         
          }];
        });
          setAddress(myRows1);
          setErrors("");
      // setShowMessege(false);

    }).catch(err =>{
        console.log(err);
    });
  
  }, [refreshAddress, props.drawerNumber]);
  

// insert keyword
  const handleInsertKeyword = () => { 
    axios.defaults.headers.post['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.withCredentials= true;
    axios.defaults.headers['Content-Type']= 'application/json';

    axios.post(`${BASE_URL}/Admin/adminPostKeyword.php`, {keyword: keywordText})
    .then( (res) => { 
       if(res.data.valid){
         setRefreshKeywords(!refreshKeywords)
         setErrors("") 
         setShowMessege(true);
       } 
        else{
          setShowMessege(false);
          setErrors(res.data);
        } 
    })
    .catch(function (error) {
      console.log(error);
   
    });
  } 


  

// modify keyword
  const handleModify = (keyword, newKeyword) => {
    
    axios.defaults.withCredentials= true;
    axios.defaults.headers.put['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.put(`${BASE_URL}/Admin/adminUpdateKeyword.php`, {data: {keyword: keyword, newKeyword: newKeyword}})
    .then( (res) => { 
        if(res.data.valid){
          setRefreshKeywords(!refreshKeywords);
          setErrors("");
          setShowMessege(true);
        } 
         else{
           setShowMessege(false);
           setErrors(res.data);
         } 
    })
    .catch(function (error) {
      console.log(error);
   
    });
  }
  
  // delete keyword
  const handleDeleteKeyword = (keyword) => {
    axios.defaults.headers.delete['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.withCredentials= true;
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.delete(`${BASE_URL}/Admin/deleteKeyword.php?keyword=${keyword}`)
    .then( (res) => {
        if(res.data.valid){
          setRefreshKeywords(!refreshKeywords);
          setErrors("") 
          setShowMessege(true);
        } 
         else{
          setShowMessege(false);
           setErrors(res.data);

         } 
    })
    .catch(function (error) {
      console.log(error);
   
    });
  }
  
  

  const handleCleanUp = (howMany) => {
   
    axios.defaults.headers.post['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.withCredentials= true;
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.post(`${BASE_URL}/Admin/cleanUpNewUsers.php`, {how_many: howMany})
    .then(function (res) {
      if(res.data === 1){
        setRefreshTable(!refreshTable);
        setErrors("") 
        setShowMessege(true);
      } 
      else{
         setErrors(res.data);
         setShowMessege(false);
      }
      })
    .catch(function (error) {
      console.log(error);
   
    });
  }

  const handleDeleteUser = (uId) =>{
  
   
    axios.defaults.headers.delete['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.withCredentials= true;
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.delete(`${BASE_URL}/Admin/deleteUser.php?userId=${uId}`
    ).then(function (res){

        if(res.data.valid){
          setRefreshUsers(!refreshUsers);
          setErrors("") 
          setShowMessege(true);
        } 
        else{
          setErrors(res.data);
          setShowMessege(false);
        }
                      
      }).catch(function (error){
            console.log(error);     
      })
}

  
  const handleDelete = (uId) =>{
  
       
        axios.defaults.headers.delete['Anti-CSRF']= localStorage.getItem('token');
        axios.defaults.withCredentials= true;
        axios.defaults.headers['Content-Type']= 'application/json';

        axios.delete(`${BASE_URL}/Admin/deleteNewUser.php?userId=${uId}`
        ).then(function (res){   
            if ( res.data && res.data.valid)
            {
               setRefreshTable(!refreshTable) 
               setErrors("");
              setShowMessege(true);
              } 
              else{
                setShowMessege(false);
                setErrors(res.data);
              }
          }).catch(function (error){
                console.log(error);     
          })
  }
   
  const handleInsert = (uId) => {

   
    axios.defaults.headers.post['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.withCredentials= true;
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.post(`${BASE_URL}/Admin/insertNewUser.php`, {userId: uId})
    .then(function (res) {
     
      if(res.data === 1){
        setRefreshTable(!refreshTable);
        setShowMessege(true);
      } else{
        setShowMessege(false);
      }
  
    })
    .catch(function (error) {
      // console.log(error.response.data);
   
    });
  }


  // modify address
  const handleModifyAddress = (parameters, coordinates) => {
    let {lat, lon, street, streetNr, plz, place, schoolName, typ} = parameters;
   
    axios.defaults.withCredentials= true;
    axios.defaults.headers.put['Anti-CSRF']= localStorage.getItem('token');
    axios.defaults.headers['Content-Type']= 'application/json';
    axios.put(`${BASE_URL}/Admin/adminUpdateAddress.php`, {data: {lat: lat, lon: lon, street: street, streetNr: streetNr, plz: plz,
                  place: place, schoolName: schoolName, typ: typ, altLat: coordinates.lat, altLon: coordinates.lon }})
    .then( (res) => { 
     
      if (res.data && res.data.valid){
         setRefreshAddress(!refreshAddress);
         setErrors("");
         setShowMessege(true);
        }
        else{
            setErrors(res.data);
            setShowMessege(false);  
        } 
    })
    .catch(function (error) {
      console.log(error);
   
    });
  }
  
  // gets the choosen number from the drawer in the app bar (1 → for newUsers, 2 → for keywords, 3 → for users)
  const renderDrawerNumber = (drawerNumber) =>{
   


    switch (drawerNumber) {
      case 1:
        return userRequests && userRequests.length ? <AdminNewUsers 
        handleInsert={handleInsert}
        handleDelete={handleDelete}
        handleCleanUp={handleCleanUp}
        myRows={userRequests}/>  : <Alert severity="success">{"Noch keine Anfragen zu bearbeiten"}</Alert>
        
      case 2:
        return <AdminKeywords 
        myRows={keywords}
        handleInsertKeyword={handleInsertKeyword}   
        handleDeleteKeyword={handleDeleteKeyword}
        handleModify= {handleModify}
        setKeywordText={setKeywordText}/> 

        case 3:
          return <AdminAddress 
          myRows= {address}
          handleModifyAddress={handleModifyAddress}
          refreshInsertAddress={(value)=>setRefreshAddress(value)}
          /> 
      
      case 4:
        return users && <AdminUsers 
                          myRows= {users}
                          handleDeleteUser={handleDeleteUser}
                        /> 
      
      default: 
      return "";
    }

  }

    return ( <>
    

    <Container>
    
        <Typography paragraph>
          Hier können Sie neue Anfragen in der Tabelle ansehen.
           Beim Klicken auf eine Ziele wird ein Dialog gezeigt. Dabei können die Anfragen bestätigt oder gelöscht werden.
        </Typography>
        
        {errors && <Alert severity="error">{errors}</Alert>}
        {showMessege && <Alert severity="success">{"Der Befehl wurde erfolgreich ausgefuehrt :)"}</Alert>} 
        {/* using the drawer number setting by the AppBar and switching to: new requests, keywords, and users*/}
        {renderDrawerNumber(props.drawerNumber)}
    

    </Container>

    </> );
}
 
export default AdminContent;