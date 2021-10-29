import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

export default function ComboBox(props) {
  return (
    <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={props.regionsArray}
      sx={{ width: 300 }}
      onChange={(_, newValue) => {
          props.onclicked(newValue);
        }}
      renderInput={(params) => <TextField {...params} label="Регион" />}
    />
  );
}