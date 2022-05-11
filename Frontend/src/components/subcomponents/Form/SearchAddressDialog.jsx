
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import SearchAdderss from './SearchAddress'

export default function FormDialog({sendAddressUp, handleCloseDialog, openDialog}) {


  return (
    <div>
    
    
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Suche nach Schulen</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Geben Sie bitte den Namen der Schule sowie die Addresse hier ein, um die Schule auf der Karte zu zeigen.
          </DialogContentText>
          

        <SearchAdderss sendAddressUp={sendAddressUp} />
      
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Abbrechen</Button>
         
        </DialogActions>
      </Dialog>
    </div>
  );
}
