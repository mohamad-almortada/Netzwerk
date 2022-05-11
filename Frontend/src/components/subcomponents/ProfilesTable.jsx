import {useState} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom";


const BASE_URL = "http://localhost/react-getstarted/Backend";

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
    backgroundColor: '#D7FCAE',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function ProfilesTable(props) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  



  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  let navigate = useNavigate();


  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
  
      <TableContainer  sx={{maxHeight: 500}}> 
      {/* sx={{maxHeight: 440}} */}
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.myColumns.map((column, index) => (
                <TableCell
                  key={index}
                  align={column.align}
                  style={{ maxWidth: column.maxWidth }}
                  
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.myRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <StyledTableRow  hover role="checkbox" tabIndex={-1} key={props.profiles ? row["newUserId"]: index}>
                    {props.myColumns.map((column) => {
                      const value = row[column.id]; 
                      return (
                        <StyledTableCell key={column.id} align={column.align}
                        onClick={() => {
                         
                          navigate(`/profile/${row['userId'] && row['userId']}/${row['firstname'] && row['firstname']}-${row['lastname'] &&row['lastname']}`);
                         } }
                        >
                           {column.id=== "Photo"  ? 
                          <Avatar sx={{  width: 56, height: 56 }} 
                          // alt={ row["lastname"][0].toUpperCase() } 
                          src={row["imageSrc"] && `${BASE_URL}/uploads/${row["imageSrc"]}`}
                           /> 
                          : column.id=== "typ" ? value === "Uni" ? "Hochschule" : value 
                          : column.id === "name" ? row['name'] && row['name']  : value } 
                        </StyledTableCell>
                      );
                    })}
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
      labelRowsPerPage=''
        rowsPerPageOptions={[10, 50]}
        component="div"
        count={props.myRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
    </Paper>
  );
}