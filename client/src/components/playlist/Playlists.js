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
import Tooltip from '@mui/material/Tooltip';

import axiosWrapper from '../../lib/axiosWrapper';
import { useAuthState } from '../../context/auth';

const columns = ['Name', 'View', 'Edit', 'Delete'];

function Playlists() {
  const [data, setData] = useState([]);
  const location = useLocation();
  const authState = useAuthState();

  useEffect(() => {
    const fetchData = async () => {
      const playlists = await axiosWrapper({
        method: 'GET',
        url: '/playlists',
        params: {
          id: authState.id,
        },
      });

      setData(playlists.data);
    };
    fetchData();
  }, []);

  return data.length ? (
    <TableContainer component={Paper} sx={{ m: 4 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((col) => <TableCell key={col}>{col}</TableCell>)}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell>
                <Tooltip title="View">
                  <IconButton aria-label="view" color="blue" component={Link} to={`${location.pathname}/${row.id}`}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Edit">
                  <IconButton aria-label="edit" color="warning" component={Link} to={`${location.pathname}/${row.id}/edit`}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell>
                <Tooltip title="Delete">
                  <IconButton aria-label="delete" color="danger" component={Link} to={`${location.pathname}/${row.id}/delete`}>
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  ) : <p>chargement...</p>;
}

export default Playlists;
