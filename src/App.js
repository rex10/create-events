import React, { memo } from "react";
import { BrowserRouter,Route, Routes } from "react-router-dom";
import AddEventForm from "./AddEventForm";
import EventsList from "./EventList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<AddEventForm />} />
          <Route path="/event-list" element={<EventsList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default memo(App);
