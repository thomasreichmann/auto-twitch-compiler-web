import Paper from "@mui/material/Paper";
import AutocompleteSelect, { Option } from "@/components/autocompleteSelect";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { SyntheticEvent, useEffect, useState } from "react";
import { AvailableGame } from "@/services/infoService";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";

type Game = {
  id: string;
  name: string;
};

const ChannelForm = () => {
  let [selectedGames, setSelectedGames] = useState<Game[]>([]);
  let [availableGames, setAvailableGames] = useState<AvailableGame[]>([]);
  const [time, setTime] = useState<Dayjs | null>(dayjs("2022-04-17T15:30"));

  useEffect(() => {
    fetch("/api/info/games")
      .then((res) => res.json())
      .then((data) => setAvailableGames(data));
  }, []);

  useEffect(() => {
    console.log(time);
  }, [time]);

  const handleGamesChange = (
    _: SyntheticEvent<Element, Event>,
    value: Option | Option[] | null
  ) => {
    if (!Array.isArray(value)) return;

    setSelectedGames(value);
  };

  return (
    <Paper elevation={1} sx={{ height: "100%", padding: 3 }}>
      <Grid container>
        <Grid xs={12} md={6}>
          <AutocompleteSelect
            onChange={handleGamesChange}
            id="games-select"
            label="Games"
            placeholder="Games"
            limitTags={1}
            options={availableGames}
            value={selectedGames}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Title Template"
            helperText="*required"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    // aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    // TODO: modal with info on how the tittle template works
                    edge="end"
                  >
                    <HelpOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid xs={6}>
          <TimePicker
            label="Upload time"
            value={time}
            sx={{ width: "100%" }}
            onChange={(newValue) => setTime(newValue)}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChannelForm;
