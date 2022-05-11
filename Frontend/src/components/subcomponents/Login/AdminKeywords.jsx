


import {useState} from 'react';

import AdminTable from './AdminTable';

import {TextField, Button } from '@material-ui/core';
import AdminKeywordsDialog from './AdminKeywordsDialog';



const myColumns = [
    { id: 'keyword_id', label: 'Schlagwort-ID',  maxWidth: 200, align: 'left'},
    { id: 'keyword', label: 'Schlagwort',  maxWidth: 200, align: 'left'} 
  ];
  


const AdminKeywords = (props) => {

    const [open, setOpen] = useState(false);
    const [keyword, setKeyword] = useState("");

    const handleKeywords = (k) =>{
        setKeyword(k);
    }

return ( <>

  

      <TextField 
      style={{marginBottom: "10%", marginTop: "3%"}}
            name="keyword"
            placeholder="Neues Schlagwort eingeben"
            label="Neues Schlagwort"
            required
            value={props.keywordText}
            onChange={(e)=>props.setKeywordText(e.target.value)}
            variant="filled"
            fullWidth
            InputProps={{endAdornment: <Button 
                onClick={ (event)=>{event.preventDefault();
                    props.handleInsertKeyword();
                }}
                type="submit"
                
                variant="contained"
                color="primary"
                > Schlagwort Einfügen
        </Button>}}
        />
    


      <AdminTable 
       myColumns={myColumns} 
       myRows={props.myRows}
       isOpen={(e)=>{setOpen(e)}} 
       getKeyword={handleKeywords}
       />

        <AdminKeywordsDialog open={open} 
        handleClose={()=>{setOpen(false)}} 
        handleDelete={props.handleDeleteKeyword}
        handleModify= {props.handleModify}
        keyword= {keyword}
        />
        
      
    
    
    </> );
}
 
export default AdminKeywords;