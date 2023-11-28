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
import { useSnackbar } from "notistack";
import { useState } from "react";
import Loading from "../layout/loading";
import ChannelSwitch from "./channelSwitch";
import TitleTemplateModal from "./titleTemplateModal";

const ChannelForm = () => {
  const { availableGames, loading: loadingGames } = useAvailableGames();
  const { languages, loading: loadingLanguages } = useLanguages();
  const { enqueueSnackbar } = useSnackbar();
  const { channel, setChannel, loading: loadingChannel, modified, restoreChannel, saveChannel } = useChannel();

  const [templateModalOpen, setTemplateModalOpen] = useState(false);

  const loading = loadingChannel || loadingGames || loadingLanguages;

  const createHandler =
    <T extends any>(field: keyof Channel, transform: (value: T) => any = (v) => v) =>
    (_: any, value: T | T[] | null) => {
      if (value == null || !channel) return;

      const transformedValue = Array.isArray(value)
        ? value.map((v) => transform(v)).sort((a, b) => a - b)
        : transform(value);

      setChannel({ ...channel, [field]: transformedValue });
    };

  const onSaveChannel = (err?: Error) => {
    if (err) {
      console.error(err.message, err);
      enqueueSnackbar(`Failed to save channel: ${err.message}`, {
        variant: "error",
        autoHideDuration: 3500,
        style: { fontFamily: "sans-serif" },
      });
      restoreChannel();
    } else {
      enqueueSnackbar("Channel saved successfully", {
        variant: "success",
        autoHideDuration: 2500,
        style: { fontFamily: "sans-serif" },
      });
    }
  };

  return (
    <Paper elevation={1} sx={{ height: "100%", padding: 3, position: "relative" }}>
      <Grid container spacing={3}>
        <Grid xs={12}>
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
            limitTags={3}
            options={availableGames}
            value={channel?.games}
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            required
            fullWidth
            label="Title Template"
            helperText="*required"
            onChange={(event) => setChannel({ ...channel!, titleTemplate: event.target.value })}
            value={channel?.titleTemplate ?? ""}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="see title template help"
                    onClick={() => setTemplateModalOpen(true)}
                    edge="end"
                  >
                    <HelpOutlineIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TitleTemplateModal open={templateModalOpen} handleClose={() => setTemplateModalOpen(false)} />
        </Grid>
        <Grid xs={12}>
          <AutocompleteSelect<OptionLanguage>
            id="language-select"
            label="Languages"
            placeholder="Languages"
            limitTags={3}
            onChange={createHandler<OptionLanguage>("languages", ({ id, ...language }) => language)}
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
        <Grid xs="auto">
          <TimePicker
            label="Upload time"
            value={dayjs(channel?.date)}
            // sx={{ width: "100%" }}
            ampm={false}
            onChange={(val) => createHandler<Dayjs>("date", (value: Dayjs) => val?.toJSON())(null, val)}
          />
        </Grid>
        <Grid xs="auto">
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
        <Grid xs="auto" display="flex" justifyContent="center">
          <ChannelSwitch
            label="Upload"
            value={channel?.enableUploads}
            onChange={createHandler<boolean>("enableUploads")}
          />
        </Grid>
        <Grid xs="auto" display="flex" justifyContent="center">
          <ChannelSwitch label="Private" value={channel?.private} onChange={createHandler<boolean>("private")} />
        </Grid>
        <Grid xs={12}>
          <Collapse in={modified}>
            <Alert
              severity="warning"
              action={
                <>
                  <Button color="inherit" size="small" sx={{ marginRight: 2 }} onClick={restoreChannel}>
                    Undo
                  </Button>
                  <Button color="success" size="small" variant="outlined" onClick={() => saveChannel(onSaveChannel)}>
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
