import React, { useState, useEffect } from "react";
import DashboardLayout from "../../../components/layouts/DashboardLayout.jsx";
import ReTable from "../../../components/tables/retable.jsx";
import { Typography, CircularProgress, Alert, Stack } from "@mui/material";
import { getUsers } from "../../../api/user.js";
import { EditButton, DeleteButton } from "../../../components/buttons/actionButtons.jsx";

export default function UsersPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getUsers()
      .then(data => { setRows(data); setError(null); })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function RowActions({ row }) {
    return (
      <Stack direction="row" spacing={1}>
        <EditButton row={row} onClick={r => console.log("Edit", r.id)} />
        <DeleteButton row={row} onClick={r => console.log("Delete", r.id)} />
      </Stack>
    );
  }

  return (
    <DashboardLayout>
      <Typography variant="h4" gutterBottom>Users</Typography>
      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}
      {!loading && !error && (
        <ReTable columns={[
          { field: "id", headerName: "ID" },
          { field: "username", headerName: "Username" },
          { field: "email", headerName: "Email" }
        ]} rows={rows} actions={RowActions} />
      )}
    </DashboardLayout>
  );
}
