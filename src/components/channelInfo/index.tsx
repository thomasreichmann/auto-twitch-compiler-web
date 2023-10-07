import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

type Props = {};

const ChannelInfo = (props: Props) => {
  const handleClick = async () => {
    let res = await fetch("/api/channel/schedule", { method: "POST", body: JSON.stringify({ username: "thomas" }) });
    let data = await res.json();

    console.log(data);
  };

  return (
    <Paper elevation={1} sx={{ height: "100%", padding: 3 }}>
      <Button onClick={handleClick} variant="contained">
        create schedule
      </Button>
    </Paper>
  );
};

export default ChannelInfo;
