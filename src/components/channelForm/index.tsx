import AutocompleteSelect, { Option } from "@/components/autocompleteSelect";
import { Channel } from "@/services/channelService";
import { AvailableGame } from "@/services/infoService";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import { SyntheticEvent, useEffect, useState } from "react";
import Loading from "../layout/loading";

type Game = {
  id: string;
  name: string;
};

// const StyledPaper = withStyles({
//   root: {
//     height: 200,
//     position: "relative",
//   },
// })(Paper);
// const LimitedBackdrop = withStyles({
//   root: {
//     position: "absolute",
//     zIndex: 1,
//   },
// })(Backdrop);

const ChannelForm = () => {
  const [selectedGames, setSelectedGames] = useState<Game[]>([]);
  const [availableGames, setAvailableGames] = useState<AvailableGame[]>([]);
  const [time, setTime] = useState<Dayjs | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/info/games")
      .then((res) => res.json())
      .then((data) => setAvailableGames(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch("/api/channel")
      .then((res) => res.json())
      .then((data) => {
        let channel = data as Channel;
        setSelectedGames(channel.games);
        setTime(dayjs(channel.date));
      })
      .finally(() => setLoading(false));
  }, []);

  const handleGamesChange = (
    _: SyntheticEvent<Element, Event>,
    value: Option | Option[] | null
  ) => {
    if (!Array.isArray(value)) return;

    setSelectedGames(value);
  };

  return (
    <Paper
      elevation={1}
      sx={{ height: "100%", padding: 3, position: "relative" }}
    >
      <Grid container>
        <Grid xs={12} md={6}>
          <Backdrop open={false} sx={{ position: "absolute", zIndex: 1 }}>
            <Loading sx={{ alignItems: "center" }} />
            {/* TODO: make this only show on loading, make it darker, and try to make this a generic "loading backdrop" */}
            {/* TODO: also, I think think this component is in the wrong place, it should be right bellow Paper */}
          </Backdrop>
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
