import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';

import axiosWrapper from '../../lib/axiosWrapper';

const columns = ['Name', 'Description', 'View', 'Edit', 'Delete'];

function Playlists() {
  const [data, setData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const playlists = await axiosWrapper({
        method: 'GET',
        url: '/playlists',
        params: {
          id: 1,
        },
      });

      setData(playlists);
    };
    fetchData();
  }, []);

  return data.length ? (
    <>
      <p>{JSON.stringify(data)}</p>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {columns.map((col) => <TableCell>{col}</TableCell>)}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.spotify_id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell>{row.description}</TableCell>
                <TableCell>
                  <IconButton aria-label="view" color="blue" component={Link} to={`${location.pathname}/${row.id}`}>
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="edit" color="warning">
                    <EditIcon />
                  </IconButton>
                </TableCell>
                <TableCell>
                  <IconButton aria-label="delete" color="danger">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  ) : <p>chargement...</p>;
}

export default Playlists;
