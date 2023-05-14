import AutocompleteSelect from "@/components/autocompleteSelect";
import { useAvailableGames } from "@/hooks/useAvailableGames";
import { useChannel } from "@/hooks/useChannelData";
import { OptionLanguage, useLanguages } from "@/hooks/useLanguages";
import { Channel } from "@/repo/channelRepository";
import { AvailableGame } from "@/services/infoService";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Alert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import dayjs, { Dayjs } from "dayjs";
import Loading from "../layout/loading";

const ChannelForm = () => {
  const { availableGames, loading: loadingGames } = useAvailableGames();
  const { languages, loading: loadingLanguages } = useLanguages();
  const {
    channel,
    setChannel,
    loading: loadingChannel,
    modified,
    restoreChannel,
    saveChannel,
  } = useChannel();

  const loading = loadingChannel || loadingGames || loadingLanguages;

  const createHandler =
    <T extends any>(
      field: keyof Channel,
      transform: (value: T) => any = (v) => v
    ) =>
    (_: any, value: T | T[] | null) => {
      if (!value || !channel) return;

      const transformedValue = Array.isArray(value)
        ? value.map((v) => transform(v)).sort((a, b) => a - b)
        : transform(value);

      setChannel({ ...channel, [field]: transformedValue });
    };

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
          <AutocompleteSelect<AvailableGame>
            onChange={createHandler<AvailableGame>("games")}
            id="games-select"
            label="Games"
            placeholder="Games"
            limitTags={1}
            options={availableGames}
            value={channel?.games}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <TextField
            required
            fullWidth
            label="Title Template"
            helperText="*required"
            onChange={(event) =>
              setChannel({ ...channel!, titleTemplate: event.target.value })
            }
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
        <Grid xs={3}>
          <TimePicker
            label="Upload time"
            value={dayjs(channel?.date)}
            sx={{ width: "100%" }}
            ampm={false}
            onChange={(val) =>
              createHandler<Dayjs>("date", (value: Dayjs) => val?.toJSON())(
                null,
                val
              )
            }
          />
        </Grid>
        <Grid xs={3}>
          <TextField
            type="number"
            label="Number of videos"
            value={channel?.videoAmount || ""}
            onChange={(event) =>
              setChannel({
                ...channel!,
                videoAmount: parseInt(event.target.value),
              })
            }
          />
        </Grid>
        <Grid xs={6}>
          <AutocompleteSelect<OptionLanguage>
            id="language-select"
            label="languages"
            placeholder="Languages"
            limitTags={1}
            onChange={createHandler<OptionLanguage>(
              "languages",
              ({ id, ...language }) => language
            )}
            options={languages}
            value={(() => {
              if (!channel) return [];
              return channel?.languages.map((lang) => {
                let optionLang: OptionLanguage = { ...lang, id: lang.code };
                return optionLang;
              });
            })()}
          />
        </Grid>
        <Grid xs>
          <Collapse in={modified}>
            <Alert
              severity="warning"
              action={
                <>
                  <Button
                    color="inherit"
                    size="small"
                    sx={{ marginRight: 2 }}
                    onClick={restoreChannel}
                  >
                    Undo
                  </Button>
                  <Button
                    color="success"
                    size="small"
                    variant="outlined"
                    onClick={() => saveChannel()}
                  >
                    Save
                  </Button>
                </>
              }
            >
              You have unsaved changes to the channel configuration!
            </Alert>
          </Collapse>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ChannelForm;
