

import {useState} from 'react';
import { Button } from '@material-ui/core';
import AdminTable from './AdminTable';

import AdminAddressDialog from './AdminAddressDialog';


const myColumns = [
    { id: 'lat', label: 'Latitude',  maxWidth: 200, align: 'left'},
    { id: 'lon', label: 'Längengrad',  maxWidth: 200, align: 'left'},
    { id: 'address', label: 'Name',  maxWidth: 200, align: 'left'},
    { id: 'type', label: 'Typ',  maxWidth: 200, align: 'left'},
    { id: 'street', label: 'Straße',  maxWidth: 200, align: 'left'},
    { id: 'buildingNr', label: 'Haus Nr.',  maxWidth: 200, align: 'left'},
    { id: 'plz', label: 'PLZ',  maxWidth: 200, align: 'left'},
    { id: 'city', label: 'Stadt',  maxWidth: 200, align: 'left'},
  ];
  

const AdminAddress = (props) => {

    const [open, setOpen] = useState(false);
    const [activateSearch, setActivateSearch] = useState(false);
    const [address, setAddress] = useState("");
    const [addressObject, setAddressObject] = useState();

    
    return ( <>
        


        <Button 
        onClick={ ()=> {
            setActivateSearch(true); 
            setOpen(true);
        }}
        type="submit"
        style={{marginLeft: "10%", marginBottom: '4%'}}
        variant="contained"
        color="primary"
        > Neue Address Hinzufügen  
      </Button>

    
    <AdminTable 
       myColumns={myColumns} 
       myRows={props.myRows}
       isOpen={(value)=>{setOpen(value)}} 
       getAddress= {(value)=>{setAddress(value)}}
       getAddressObject= {(value)=>setAddressObject(value)}
    //    getKeyword={handleAddress}        
       />
     
    {open && 
            <AdminAddressDialog open={open} 
            search={activateSearch}
            handleClose={()=>{setOpen(false); setActivateSearch(false)}} 
            handleDelete={props.handleDeleteKeyword}
            handleModify= {props.handleModifyAddress}
            address= {address}
            addressObject= {addressObject}
            setRefreshAddress={(value)=>props.refreshInsertAddress(value)}
            />
    }
    </> );
}
 
export default AdminAddress;