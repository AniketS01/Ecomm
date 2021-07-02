import { makeStyles } from "@material-ui/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: 0,
    paddingTop: "56.25%",
  },
  button: {
    display: "flex",
    justifyContent: "flex-end",
  },
  content: {
    display: "flex",
    justifyContent: "space-between",
  },
}));
