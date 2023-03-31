import React, { memo, useState } from "react";
import { useDispatch } from "react-redux";
import { addEvent } from "./actions/eventActions";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import "react-datepicker/dist/react-datepicker.css";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { createStyles } from "@mui/styles";

const useStyles = makeStyles((theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      "& > *": {
        margin: theme.spacing(5),
      },
      selectEmpty: {
        marginTop: theme.spacing(2),
      },
      datePicker: {
        margin: theme.spacing(1),
      },
      "& #btn-sub": {
        marginTop: theme.spacing(0),
        marginLeft: "10px",
        height: "35px",
        background: "#1976d2",
        padding: "9px",
        textAlign: "center",
        borderRadius: "5px",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        color: "white",
        fontWeight: "500",
        lineHeight: "25px",
        textDecoration: "none",
        "&:hover": {
          background: "#1565c0",
        },
      },
      "& h2": { paddingLeft: "10px" },
      "& .link-div": {
        display: "unset",
      },
      "& a": {
        marginLeft: theme.spacing(6),
        height: "35px",
        background: "#1976d2",
        padding: "9px",
        textAlign: "center",
        borderRadius: "5px",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        color: "white",
        fontWeight: "500",
        lineHeight: "25px",
        textDecoration: "none",
        "&:hover": {
          background: "#1565c0",
        },
      },
    },
    myButton: {
      backgroundColor: "#4caf50",
      color: "#fff",
      "&:hover": {
        backgroundColor: "#388e3c",
      },
    },
    formControl: {
      "&.MuiFormControl-root": {
        minWidth: "85%",
        margin: "10px",
      },
    },
    menu: {
      "& .MuiMenu-paper": {
        maxHeight: "none",
        width: "43%",
        minWidth: "fit-content",
        maxWidth: "",
        padding: theme.spacing(1),
      },
      "& .MuiList-root": {
        maxWidth: "250px",
      },
      "& .MuiMenuItem-root": {
        padding: theme.spacing(1, 2),
        justifyContent: "center",
        width: "100%",
      },
    },
  })
);
const initialState = {
  name: "",
  type: "",
  startDate: null,
  endDate: null,
  description: "",
  handledBy: "",
  organization: "",
  numSubEvents: "",
};
function AddEventForm() {
  const dispatch = useDispatch();

  const classes = useStyles();

  const [eventData, setEventData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({
    name: "",
    type: "",
    startDate: null,
    endDate: null,
    description: "",
    handledBy: "",
    organization: "",
    numSubEvents: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // update form data
    setEventData((prevEvent) => ({ ...prevEvent, [name]: value }));

    // validate individual field
    const error = validateField(name, value);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const handleDateChange = (name, date) => {
    setEventData((prevEvent) => ({ ...prevEvent, [name]: date }));

    // validate individual field
    const error = validateField(name, date);
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const validateField = (fieldName, fieldValues) => {
    let error = "";
    switch (fieldName) {
      case "name":
        if (!fieldValues) {
          error = "Please enter your name";
        }
        break;
      case "type":
        if (!fieldValues) {
          error = "Please Select Type";
        }
        break;
      case "startDate":
        if (!fieldValues) {
          error = "Please select Start Date";
        }
        break;
      case "endDate":
        if (!fieldValues) {
          error = "Please enter end date";
        } else if (new Date(fieldValues) < new Date(eventData.startDate)) {
          error = "End date must be after start date";
        }
        break;
      case "description":
        if (!fieldValues) {
          error = "Please Enter Description";
        }
        break;
      case "handledBy":
        if (!fieldValues) {
          error = "Please Enter Handler name";
        }
        break;
      case "organization":
        if (!fieldValues) {
          error = "Please enter organization";
        }
        break;
      case "numSubEvents":
        if (!fieldValues) {
          error = "Please enter Number of SubEvent";
        }
        break;
      default:
        break;
    }
    return error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // validate entire form
    const errors = {};
    for (const [name, value] of Object.entries(eventData)) {
      const error = validateField(name, value);
      if (error) {
        errors[name] = error;
      }
    }
    if (formErrors === initialState) {
    }
    setFormErrors(errors);
    if (Object.keys(errors).length === 0) {
      //  submit form
      dispatch(addEvent(eventData));
    }

    setEventData(initialState);
  };
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Container>
        <Box
          className={classes.form}
          onSubmit={handleSubmit}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
          mt={6}
          mb={6}
          ml={50}
        >
          <Grid container justify="center">
            <Grid item xs={12} sm={10} md={8}>
              <h2>Add Events</h2>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Event name"
                  name="name"
                  value={eventData.name}
                  onChange={handleInputChange}
                  error={Boolean(!!formErrors.name)}
                  helperText={formErrors.name}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl
                  className={classes.formControl}
                  sx={{ m: 1, minWidth: 100 }}
                >
                  <InputLabel id="simple-select-label">Event type</InputLabel>
                  <Select
                    required
                    label="Event type"
                    id="simple-select-label"
                    name="type"
                    value={eventData.type}
                    onChange={handleInputChange}
                    error={Boolean(formErrors.type)}
                    helperText={formErrors.type}
                    MenuProps={{
                      classes: { paper: classes.menu },
                      getContentAnchorEl: null,
                      anchorOrigin: {
                        vertical: "bottom",
                        horizontal: "left",
                      },
                      transformOrigin: {
                        vertical: "top",
                        horizontal: "left",
                      },
                    }}
                  >
                    {eventTypes.map((type) => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  required
                  label="Event start date"
                  name="startDate"
                  value={eventData.startDate}
                  onChange={(date) => handleDateChange("startDate", date)}
                  format="dd/MM/yyyy"
                  inputVariant="outlined"
                  fullWidth
                  error={Boolean(formErrors.startDate)}
                  helperText={formErrors.startDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  required
                  label="Event end date"
                  name="endDate"
                  value={eventData.endDate}
                  onChange={(date) => handleDateChange("endDate", date)}
                  format="dd/MM/yyyy"
                  inputVariant="outlined"
                  error={Boolean(formErrors.endDate)}
                  helperText={formErrors.endDate}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Event description"
                  name="description"
                  value={eventData.description}
                  onChange={handleInputChange}
                  error={Boolean(formErrors.description)}
                  helperText={formErrors.description}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Enter name of person handling event"
                  name="handledBy"
                  value={eventData.handledBy}
                  onChange={handleInputChange}
                  error={Boolean(formErrors.handledBy)}
                  helperText={formErrors.handledBy}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  label="Enter event organisation"
                  name="organization"
                  value={eventData.organization}
                  onChange={handleInputChange}
                  error={Boolean(formErrors.organization)}
                  helperText={formErrors.organization}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  label="Number of Sub Events"
                  name="numSubEvents"
                  value={eventData.numSubEvents}
                  onChange={handleInputChange}
                  variant="outlined"
                  error={Boolean(formErrors.numSubEvents)}
                  helperText={formErrors.numSubEvents}
                />
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                id="btn-sub"
                className={classes.myButton}
              >
                Save
              </Button>
              <Button
                component={Link}
                to="/event-list"
                variant="contained"
                color="primary"
              >
                Event List
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </MuiPickersUtilsProvider>
  );
}

export default memo(AddEventForm);

const eventTypes = [
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "music",
    label: "Music",
  },
  {
    value: "general",
    label: "General",
  },
  {
    value: "children",
    label: "Children",
  },
  {
    value: "school",
    label: "School",
  },
];
