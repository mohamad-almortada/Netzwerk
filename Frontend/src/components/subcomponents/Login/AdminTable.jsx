
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import {Typography } from '@material-ui/core';

const BASE_URL = process.env.REACT_APP_NEDICHE_API;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#ABCDEF',
  },
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function AdminTable(props) {


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <Chip label={props.myRows && props.myRows.length} variant="outlined" style={{float: 'right', marginRight: "2%"}}/>

      <TableContainer  
      sx={{maxHeight: 500}}
      > 
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.myColumns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ minWidth: column.width, whiteSpace: 'nowrap' }}
                  
                >
                {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.myRows && props.myRows
              .map((row, index) => {
                return (
                  <StyledTableRow  hover  tabIndex={-1} key={ index}>
                    { props.myColumns.map((column) => {
                      const value = row[column.id]; 
                      return (
                        <StyledTableCell key={column.id} align={column.align} style={{wordBreak: "break-all"}}
                        onClick={() => {  
                         
                          props.isOpen(true); 
                          row["newUserId"] && props.getUserId(row["newUserId"]);
                          row["userId"] && props.getUserId(row["userId"]);
                          row["email"] && props.getUserEmail(row["email"]); 
                          row["keyword_id"] && props.getKeyword(  row["keyword"]  );
                          row["lat"] && row["lon"] && row["address"] && props.getAddress( row["address"]);
                          row["lat"] && row["lon"] && row["address"] && props.getAddressObject(row);
                        } }
                        >

                          {column.id === "Photo" ? 
                          <Avatar sx={{  width: 56, height: 56 }} 
                          alt={ row["lastname"][0].toUpperCase() } 
                      
                          src={row["imageSrc"] &&  `${BASE_URL}/${row["imageSrc"]}`} /> 
                          : column.id === "fieldsOfResearch" || column.id=== "activities" ? <Typography paragraph component="div"
                          style={{width: "50rem"}}
                          >{value}</Typography> : value}
                         
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
     
      
    </Paper>
  );
}