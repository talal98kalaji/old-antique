import React from 'react';
import { Button, Stack } from '@mui/material';

export function EditButton({ onClick, row }) {
  return (
    <Button
      size="small"
      variant="outlined"
      onClick={() => onClick(row)}
    >
      Edit
    </Button>
  );
}

export function DeleteButton({ onClick, row }) {
  return (
    <Button
      size="small"
      color="error"
      variant="outlined"
      onClick={() => onClick(row)}
    >
      Delete
    </Button>
  );
}

export function AddButton({ onClick }) {
  return (
    <Button
      size="small"
      color="success"
      variant="contained"
      onClick={onClick}
    >
      Add New
    </Button>
  );
}
