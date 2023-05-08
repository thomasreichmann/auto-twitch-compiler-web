import Autocomplete, {
  AutocompleteProps,
  AutocompleteRenderGroupParams,
  createFilterOptions,
} from "@mui/material/Autocomplete";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import Paper from "@mui/material/Paper";
import CircularProgress from "@mui/material/CircularProgress";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export type Option = {
  id: string;
  name: string;
  group?: string;
};

const MAX_RESULTS = 50;

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

type AutocompleteSelectProps = Omit<
  AutocompleteProps<Option, boolean, boolean, false> & { label?: string },
  "renderInput"
>;

const AutocompleteSelect = (props: AutocompleteSelectProps) => {
  const theme = useTheme();
  const boxRef = useRef(null);
  const growRef = useRef(null);

  const [boxHeight, setBoxHeight] = useState(0);

  useEffect(() => {
    if (!growRef.current) return; // wait for the elementRef to be available
    const resizeObserver = new ResizeObserver(() => {
      let height = (growRef.current as any).clientHeight as any;
      setBoxHeight(height);
    });
    resizeObserver.observe(growRef.current);
    return () => resizeObserver.disconnect(); // clean up
  }, []);

  return (
    <Box
      sx={{
        height: boxHeight,
        transition: theme.transitions.create("height", {
          duration: theme.transitions.duration.short,
          easing: theme.transitions.easing.easeOut,
        }),
      }}
      ref={boxRef}
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
          const filtered = createFilterOptions<Option>({ limit: MAX_RESULTS })(
            options,
            params
          );
          console.log(filtered.length);
          if (filtered.length >= MAX_RESULTS) {
            let arr = [
              ...filtered
                .slice(0, MAX_RESULTS)
                .map((option) => ({ ...option, group: "visible" })),
              ...filtered
                .slice(MAX_RESULTS - 1)
                .map((option) => ({ ...option, group: "hidden" })),
            ];
            console.log(arr);
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
      />
    </Box>
  );
};

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

export default AutocompleteSelect;
