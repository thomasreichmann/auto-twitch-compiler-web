import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export interface EnableChannelSwitchProps {
  value?: boolean;
  onChange(e: any, val: boolean): void;
}

const enableChannelSwitch = (props: EnableChannelSwitchProps) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <FormControlLabel
        control={<Switch checked={props.value} onClick={(e: any) => props.onChange(e, e.target.checked)} />}
        label="Enabled"
        labelPlacement="top"
      />
    </Box>
  );
};

export default enableChannelSwitch;
