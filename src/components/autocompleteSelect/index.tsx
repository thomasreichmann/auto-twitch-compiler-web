import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { Typography } from "@mui/material";
import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderGroupParams,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";
import React, { useEffect, useRef, useState } from "react";

export type Option = {
  id: string;
  name: string;
  group?: string;
};

const MAX_RESULTS = 50;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type AtProps<T extends Option> = Omit<
  AutocompleteProps<T, boolean, boolean, false> & { label?: string },
  "renderInput"
>;

type SelectAutocompleteProps<T extends Option> = AtProps<T>;

const AutocompleteSelect = <T extends Option>(
  props: SelectAutocompleteProps<T>
) => {
  const theme = useTheme();
  const growRef = useRef<HTMLElement | null>(null);

  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {
    if (!growRef.current) return; // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(() => {
      if (!growRef.current) return;
      let height = growRef.current.clientHeight;
      setBoxHeight(height);
    });
    resizeObserver.observe(growRef.current);
    return () => {
      if (growRef.current) resizeObserver.unobserve(growRef.current);
      resizeObserver.disconnect();
    }; // clean up
  }, []);

  let optionsSelected: T[] = [];

  console.log(props.value && Array.isArray(props.value));
  if (props.value && Array.isArray(props.value)) {
    for (const val of props.value) {
      for (const option of props.options) {
        if (val.id == option.id) optionsSelected?.push(option);
      }
    }
  }

  const renderGroup = (params: AutocompleteRenderGroupParams) => {
    const isLastGroup = params.group === "hidden";
    return (
      <React.Fragment key={params.key}>
        {params.children}
        {isLastGroup && (
          <Paper sx={{ padding: 1, margin: 1 }}>
            <Typography textAlign="center" variant="body1">
              Limiting to {MAX_RESULTS} results. Search for more options.
            </Typography>
          </Paper>
        )}
      </React.Fragment>
    );
  };

  return (
    <Box
      sx={{
        height: boxHeight,
        transition: theme.transitions.create("height", {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        }),
      }}
    >
      <Autocomplete
        loading
        disableCloseOnSelect
        multiple
        ref={growRef}
        loadingText="No games found"
        PaperComponent={(props) => <Paper {...props} elevation={2} />}
        getOptionLabel={(option) => option.name}
        filterOptions={(options, params) => {
          const filtered = createFilterOptions<T>({ limit: MAX_RESULTS })(
            options,
            params
          );

          if (filtered.length > MAX_RESULTS) {
            let arr = [
              ...filtered.slice(0, MAX_RESULTS).map((option) => {
                option.group = "visible";
                return option;
              }),
              ...filtered.slice(MAX_RESULTS - 1).map((option) => {
                option.group = "hidden";
                return option;
              }),
            ];
            return arr;
          }
          return filtered;
        }}
        groupBy={(option) => option.group ?? ""}
        renderGroup={renderGroup}
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
            placeholder={props.placeholder}
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
        value={optionsSelected}
      />
    </Box>
  );
};

export default AutocompleteSelect;
