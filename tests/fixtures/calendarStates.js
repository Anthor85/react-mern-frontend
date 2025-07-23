export const events = [
  {
    id: "1",
    title: "Mi cumpleaños",
    notes: "Invitar inútiles",
    start: new Date("2025-11-21 10:00:00"),
    end: new Date("2025-11-21 12:00:00"),
  },
  {
    id: "2",
    title: "Tu cumpleaños",
    notes: "Invitar idiotas",
    start: new Date("2022-11-21 11:00:00"),
    end: new Date("2022-11-21 13:00:00"),
  },
];

export const initialState = {
  isLoadingEvents: true,
  events: [],
  activeEvent: null,
};

export const calendarWithEventsState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: null,
};

export const calendarWithActiveEventState = {
  isLoadingEvents: false,
  events: [...events],
  activeEvent: { ...events[0] },
};
