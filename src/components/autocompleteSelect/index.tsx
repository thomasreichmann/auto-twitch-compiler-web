import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderInputParams,
} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Paper, SxProps } from "@mui/material";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export interface AutocompleteSelectProps<
  T extends Option = Option,
  Multiple extends boolean | undefined = true | false,
  DisableClearable extends boolean | undefined = undefined,
  FreeSolo extends boolean | undefined = undefined
> extends Omit<
    AutocompleteProps<T, Multiple, DisableClearable, FreeSolo>,
    "renderInput"
  > {
  options: T[];
}

export type Option = {
  id: string;
  name: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteSelect = ({
  options,
  id,
  ...rest
}: AutocompleteSelectProps) => {
  return (
    <Autocomplete
      id={id}
      options={options}
      multiple
      disableCloseOnSelect
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
      {...rest}
    />
  );
};

export default AutocompleteSelect;
