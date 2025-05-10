import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import ReTable from '../../components/tables/retable';
import { Typography, CircularProgress, Alert, Stack, Button } from '@mui/material';
import { getUsers } from '../../api/user';
import { EditButton,DeleteButton } from '../../components/buttons/actionButtons';


const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'username', headerName: 'Username' },
  { field: 'email', headerName: 'Email' },
];

export default function DashboardPage() {
  const [rows, setRows]       = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then(data => {
        setRows(data);
        setError(null);
      })
      .catch(err => setError(err.message || 'Error fetching users'))
      .finally(() => setLoading(false));
  }, []);
function RowActions({ row }) {
  return (
    <Stack direction="row" spacing={1}>
      <EditButton   onClick={r => console.log('Edit', r.id)}   row={row} />
      <DeleteButton onClick={r => console.log('Delete', r.id)} row={row} />
    </Stack>
  );
}

  return (
    <DashboardLayout>
      <Button><Typography variant="h4" gutterBottom>Users</Typography></Button>
      {loading && <CircularProgress />}
      {error   && <Alert severity="error">{error}</Alert>}
      {!loading && !error && <ReTable columns={columns} rows={rows} actions={RowActions}/>}
    </DashboardLayout>
  );
}
