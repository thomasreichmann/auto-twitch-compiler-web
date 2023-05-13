import AutocompleteSelect, { Option } from "@/components/autocompleteSelect";
import { useAvailableGames } from "@/hooks/useAvailableGames";
import { useChannelData } from "@/hooks/useChannelData";
import { OptionLanguage, useLanguages } from "@/hooks/useLanguages";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Loading from "../layout/loading";

const ChannelForm = () => {
  const { availableGames, loading: loadingGames } = useAvailableGames();
  const { languages, loading: loadingLanguages } = useLanguages();
  const {
    selectedGames,
    setSelectedGames,
    time,
    setTime,
    selectedLanguages,
    setSelectedLanguages,
    loading: loadingChannel,
  } = useChannelData();

  const loading = loadingChannel || loadingGames || loadingLanguages;

  const handleGamesChange = (_: any, value: Option | Option[] | null) => {
    if (!Array.isArray(value)) return;

    setSelectedGames(value);
  };

  const handleLanguagesChange = (
    _: any,
    value: OptionLanguage | OptionLanguage[] | null
  ) => {
    if (!Array.isArray(value)) return;

    // console.log(value, selectedLanguages);

    setSelectedLanguages(value);
  };

  // console.log(selectedLanguages);

  return (
    <Paper
      elevation={1}
      sx={{ height: "100%", padding: 3, position: "relative" }}
    >
      <Grid container>
        <Grid xs={12} md={6}>
          <Backdrop open={loading} sx={{ position: "absolute", zIndex: 1 }}>
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
        <Grid xs={6}>
          <AutocompleteSelect<OptionLanguage>
            id="language-select"
            label="languages"
            placeholder="Languages"
            limitTags={1}
            onChange={handleLanguagesChange}
            options={languages}
            value={(() => {
              let sel = selectedLanguages.map((lang) => {
                let opLang: OptionLanguage = { ...lang, id: lang.code };
                return opLang;
              });

              return sel;
            })()}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChannelForm;
