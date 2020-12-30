import React from "react";
import {
  Button,
  Container,
  TextField,
  makeStyles,
  CssBaseline,
  Typography,
} from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import { development, production } from "../config";
const URL = process.env.NODE_ENV === "production" ? production : development;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const AdminPage = () => {
  const { handleSubmit, register, errors, reset, setError } = useForm();
  const classes = useStyles();

  const newUser = async (name) => {
    const res = await axios.post(`${URL}/users`, name).catch((e) => {
      if (e) {
        const message = e.response.data.message;
        setError("name", { type: "manual", message });
      }
    });
    if (res) {
      reset();
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Create New User
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(newUser)}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={errors.name ? true : false}
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            inputRef={register({ required: true })}
            autoFocus
          />
          {errors.name && <p>{errors.name.message}</p>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default AdminPage;
