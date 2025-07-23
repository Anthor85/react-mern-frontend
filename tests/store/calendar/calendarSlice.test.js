import {
  calendarSlice,
  onAddNewEvent,
  onDeleteEvent,
  onLogoutCalendar,
  onSetActiveEvent,
  onUpdateEvent,
  setEvents,
} from "../../../src/store/calendar/calendarSlice";
import {
  calendarWithActiveEventState,
  calendarWithEventsState,
  events,
  initialState,
} from "../../fixtures/calendarStates";

describe("Pruebas de calendarSlice", () => {
  test("debe mostrar estado inicial ", () => {
    const state = calendarSlice.getInitialState();
    expect(state).toEqual(initialState);
  });

  test("debe mostrar el estado activo", () => {
    let state = calendarWithEventsState;
    state = calendarSlice.reducer(state, onSetActiveEvent(events[0]));
    expect(state).toEqual(calendarWithActiveEventState);
  });

  test("debe añadir un nuevo evento", () => {
    const newEvent = {
      id: "3",
      title: "Su cumpleaños",
      notes: "Invitar paletos",
      start: new Date("2024-11-21 14:00:00"),
      end: new Date("2026-11-21 16:00:00"),
    };
    let state = calendarWithEventsState;
    state = calendarSlice.reducer(state, onAddNewEvent(newEvent));
    expect(state.events).toEqual([...events, newEvent]);
  });

  test("debe actualizar evento", () => {
    const updatedEvent = {
      id: "1",
      title: "Puro cumpleaños",
      notes: "Invitar besugos",
      start: new Date("2024-11-21 14:00:00"),
      end: new Date("2026-11-21 16:00:00"),
    };
    let state = calendarWithEventsState;
    state = calendarSlice.reducer(state, onUpdateEvent(updatedEvent));
    expect(state.events).toContain(updatedEvent);
  });

  test("debe eliminar evento", () => {
    let state = calendarWithActiveEventState;
    state = calendarSlice.reducer(state, onDeleteEvent(events[0]));
    expect(state.activeEvent).toBeNull();
    expect(state.events).not.toContain(events[0]);
  });

  test("setEvents debe establecer los eventos", () => {
    let state = initialState;
    state = calendarSlice.reducer(state, setEvents(events));
    expect(state).toEqual(calendarWithEventsState);
  });

  test("onLogoutCalendar debe limpiar estado", () => {
    let state = calendarWithActiveEventState;
    state = calendarSlice.reducer(state, onLogoutCalendar());
    expect(state).toEqual(initialState);
  });
});
