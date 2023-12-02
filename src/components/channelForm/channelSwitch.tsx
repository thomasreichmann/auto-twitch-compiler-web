import FormControlLabel, { FormControlLabelProps } from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export interface ChannelSwitchProps extends Omit<FormControlLabelProps, "control"> {
  value: boolean;
  onChange(e: any, val: boolean): void;
}

const channelSwitch = (props: ChannelSwitchProps) => {
  return (
    <FormControlLabel
      {...(props as FormControlLabelProps)}
      control={<Switch checked={props.value} onClick={(e: any) => props.onChange(e, e.target.checked)} />}
      labelPlacement="start"
    />
  );
};

export default channelSwitch;
