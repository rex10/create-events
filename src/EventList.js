import React, { memo, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEvents } from "./actions/eventActions";
import Table from "@mui/material/Table";
import {
  Box,
  Input,
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
} from "@mui/material";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";


const EventsList = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("name");
  const events = useSelector((state) => state.events);
  const loading = useSelector((state) => state.events.loading);
  const dispatch = useDispatch();


  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase();
    const filteredEvents =
      events &&
      events.filter(
        (event) =>
          event.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          event.type.toLowerCase().includes(searchValue.toLowerCase()) ||
          JSON.stringify(event.startDate).toLowerCase().includes(searchValue.toLowerCase()) ||
          JSON.stringify(event.endDate).toLowerCase().includes(searchValue.toLowerCase()) ||
          event.handledBy.toLowerCase().includes(searchValue.toLowerCase()) ||
          event.organization.toLowerCase().includes(searchValue.toLowerCase()) ||
          event.numSubEvents.includes(searchValue)
      );
    setFilteredData(filteredEvents);
  };

  const handleSort = (column) => {
    const isAsc = sortColumn === column && sortDirection === "asc";
    setSortDirection(isAsc ? "desc" : "asc");
    setSortColumn(column);
    const sortedData = [...events].sort((a, b) => {
      if (a[column] < b[column]) {
        return isAsc ? -1 : 1;
      }
      if (a[column] > b[column]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
    setFilteredData(sortedData);
  };

  const dataToRender = filteredData.length > 0 ? filteredData : events;
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Container >
      <Box mt={6} mb={6} ml={10} >
        <Input type="text" placeholder="Search" onChange={handleSearch} />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div>
            <h1>Events</h1>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "name"}
                        direction={sortDirection}
                        onClick={() => handleSort("name")}
                      >
                        Name
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "type"}
                        direction={sortDirection}
                        onClick={() => handleSort("type")}
                      >
                        Type
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "startDate"}
                        direction={sortDirection}
                        onClick={() => handleSort("startDate")}
                      >
                        Start Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "endDate"}
                        direction={sortDirection}
                        onClick={() => handleSort("endDate")}
                      >
                        End Date
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "description"}
                        direction={sortDirection}
                        onClick={() => handleSort("description")}
                      >
                        Description
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "handledBy"}
                        direction={sortDirection}
                        onClick={() => handleSort("handledBy")}
                      >
                        HandledBy
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "organization"}
                        direction={sortDirection}
                        onClick={() => handleSort("organization")}
                      >
                        organization
                      </TableSortLabel>
                    </TableCell>
                    <TableCell>
                      <TableSortLabel
                        active={sortColumn === "numSubEvents"}
                        direction={sortDirection}
                        onClick={() => handleSort("numSubEvents")}
                      >
                        Number of Sub Event
                      </TableSortLabel>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataToRender &&
                    dataToRender.map((event,index) => (
                      <TableRow key={event.name+index}>
                        <TableCell>{event.name}</TableCell>
                        <TableCell>{event.type}</TableCell>
                        <TableCell>{JSON.stringify(event.startDate)}</TableCell>
                        <TableCell>{JSON.stringify(event.endDate)}</TableCell>
                        <TableCell>{event.description}</TableCell>
                        <TableCell>{event.handledBy}</TableCell>
                        <TableCell>{event.organization}</TableCell>
                        <TableCell>{event.numSubEvents}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Link to="/">Add Event</Link>
          </div>
        )}
      </Box>
    </Container>
    </MuiPickersUtilsProvider>
  );
};

export default memo(EventsList);
