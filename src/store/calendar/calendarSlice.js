import { createSlice } from "@reduxjs/toolkit";
// import { addHours } from "date-fns";

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    isLoadingEvents: true,
    events: [],
    // events: [
    //   {
    //     _id: new Date().getTime(),
    //     title: "Mi cumpleaños",
    //     notes: "Invitar inútiles",
    //     start: new Date(),
    //     end: addHours(new Date(), 2),
    //     bgColor: "#fafafa",
    //     user: {
    //       _id: "123",
    //       name: "Fernando",
    //     },
    //   },
    // ],
    activeEvent: null,
  },
  reducers: {
    onSetActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onUpdateEvent: (state, { payload }) => {
      state.events = state.events.map((event) => {
        if (event.id === payload.id) {
          return payload;
        }
        return event;
      });
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(
          (event) => event.id !== state.activeEvent.id
        );
        state.activeEvent = null;
      }
    },
    setEvents: (state, { payload = [] }) => {
      state.isLoadingEvents = false;
      //   state.events = payload;
      console.log("payload", payload);

      payload.map((event) => {
        const exists = state.events.some((dbEvent) => dbEvent.id === event.id);
        if (!exists) {
          state.events.push(event);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents = true;
      state.events = [];
      state.activeEvent = null;
    },
  },
});

export const {
  onSetActiveEvent,
  onAddNewEvent,
  onUpdateEvent,
  onDeleteEvent,
  setEvents,
  onLogoutCalendar,
} = calendarSlice.actions;
