import Autocomplete from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { SxProps } from "@mui/material";

export interface AutocompleteSelectProps {
  id: string;
  options: Option[];
  sx?: SxProps;
}

export type Option = {
  id: string;
  name: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteSelect = ({ options, id }: AutocompleteSelectProps) => {
  return (
    <Autocomplete
      id={id}
      options={options}
      disableCloseOnSelect
      multiple
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Games" />
      )}
    />
  );
};

export default AutocompleteSelect;
