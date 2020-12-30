import React from "react";
import { useParams } from "react-router-dom";
import { Button, Container, makeStyles, CssBaseline } from "@material-ui/core";
import axios from "axios";
import { production, development } from "../config";
const URL = process.env.NODE_ENV === "production" ? production : development;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const UserPage = () => {
  const classes = useStyles();
  const { name } = useParams();
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [message, setMessage] = React.useState("");

  React.useEffect(() => {
    axios
      .get(`${URL}/user/${name}`)
      .then((res) => {
        setLoading(false);
        setUser(res.data.message);
      })
      .catch((e) => {
        if (e) {
          setLoading(false);
          setMessage(e.response.data.message);
        }
      });
  }, [name, user]);

  const buttonShare = () => {
    console.log(`share link for ${name}`);
  };

  if (loading) return null;
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {user ? (
          <>
            <p>{user}</p>
            <Button
              fullWidth
              onClick={buttonShare}
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Share
            </Button>
          </>
        ) : (
          <>
            <p>{message}</p>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              disabled
              className={classes.submit}
            >
              Share
            </Button>
          </>
        )}
      </div>
    </Container>
  );
};

export default UserPage;
