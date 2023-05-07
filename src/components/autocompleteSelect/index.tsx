import Autocomplete, {
  AutocompleteProps,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";

export type Option = {
  id: string;
  name: string;
};

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const AutocompleteSelect = (
  props: Omit<
    AutocompleteProps<Option, boolean, boolean, false> & { label?: string },
    "renderInput"
  >
) => {
  // console.log(props.options.length);
  return (
    <Autocomplete
      loading
      disableCloseOnSelect
      multiple
      PaperComponent={(props) => <Paper {...props} elevation={2} />}
      getOptionLabel={(option) => option.name}
      filterOptions={createFilterOptions({ limit: 10 })}
      renderOption={(props, option, { selected, inputValue }) => {
        const matches = match(option.name, inputValue, { insideWords: true });
        const parts = parse(option.name, matches);

        return (
          <li {...props} key={option.id}>
            <Checkbox
              icon={icon}
              checkedIcon={checkedIcon}
              style={{ marginRight: 8 }}
              checked={selected}
              key={option.id + "checkbox"}
            />
            <div key={option.id + "div"}>
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
        <TextField
          {...params}
          label={props.label}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {!props.options.length ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      {...props}
    />
  );
};

export default AutocompleteSelect;
