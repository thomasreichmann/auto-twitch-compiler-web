import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";

type TitleTemplateModalProps = {
  open: boolean;
  handleClose: () => void;
};

const TitleTemplateModal = (props: TitleTemplateModalProps) => {
  return (
    <Dialog open={props.open} onClose={props.handleClose}>
      <DialogTitle>Title Template info</DialogTitle>
      <DialogContent>
        <Typography>
          This field determines how the video title is going to be created,
          where the "&#123;x&#125;" will be replaced with some dynamic info from
          the video. The available fields are:
        </Typography>
        <br />
        <Typography>
          &#123;0&#125; - list with the name of the first 4 clip's creators
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default TitleTemplateModal;
