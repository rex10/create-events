import {
  FETCH_EVENTS_FAILURE,
  FETCH_EVENTS_REQUEST,
  FETCH_EVENTS_SUCCESS,
} from "./actionType";

export const addEvent = (event) => ({
  type: "ADD_EVENT",
  payload: event,
});
export const fetchEventsRequest = () => ({
  type: FETCH_EVENTS_REQUEST,
});

export const fetchEventsSuccess = (events) => ({
  type: FETCH_EVENTS_SUCCESS,
  payload: events,
});

export const fetchEventsFailure = (error) => ({
  type: FETCH_EVENTS_FAILURE,
  payload: error,
});

export const fetchEvents = () => {
  return async (dispatch) => {
    dispatch(fetchEventsRequest());

    try {
      const response = await fetch("/api/events");
      const events = await response.json();
      dispatch(fetchEventsSuccess(events));
    } catch (error) {
      dispatch(fetchEventsFailure(error.message));
    }
  };
};
