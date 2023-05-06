import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Paper from "@mui/material/Paper";

export type Option = {
  id: string;
  name: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteSelect = (
  props: Omit<AutocompleteProps<Option, boolean, boolean, false>, "renderInput">
) => {
  return (
    <Autocomplete
      disableCloseOnSelect
      multiple
      PaperComponent={(props) => <Paper {...props} elevation={2} />}
      getOptionLabel={(option) => option.name}
      renderOption={(props, option, { selected, inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li {...props}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
      renderInput={(params) => (
        <TextField {...params} label="Checkboxes" placeholder="Games" />
      )}
      {...props}
    />
  );
};

export default AutocompleteSelect;
