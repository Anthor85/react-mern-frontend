import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  onAddNewEvent,
  onDeleteEvent,
  onSetActiveEvent,
  onUpdateEvent,
  setEvents,
} from "../store";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";

export const useCalendarStore = () => {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);

  const setActiveEvent = (calendarEvent) => {
    dispatch(onSetActiveEvent(calendarEvent));
  };

  const startSavingEvent = async (calendarEvent) => {
    try {
      if (calendarEvent.id) {
        const { data } = await calendarApi.put(
          `/events/${calendarEvent.id}`,
          calendarEvent
        );

        //Actualizar
        dispatch(onUpdateEvent({ ...calendarEvent, id: data.evento.id }));
      } else {
        const { data } = await calendarApi.post("/events", calendarEvent);

        //Insertar
        dispatch(onAddNewEvent({ ...calendarEvent, id: data.evento.id }));
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Error al guardar", error.response.data.msg, "error");
    }
  };

  const deleteEvent = async (calendarEvent) => {
    try {
      const { data } = await calendarApi.delete(
        `/events/${calendarEvent.id}`,
        calendarEvent
      );
      dispatch(onDeleteEvent(data));
    } catch (error) {
      console.log("No se ha borrado");
    }
  };

  const startLoadingEvents = async () => {
    try {
      const { data } = await calendarApi.get("/events");
      const events = convertEventsToDateEvents(data.eventos);
      dispatch(setEvents(events));
    } catch (error) {
      console.log("Error cargando eventos", error);
    }
  };

  return {
    events,
    activeEvent,
    hasEventSelected: !!activeEvent,

    setActiveEvent,
    startSavingEvent,
    deleteEvent,
    startLoadingEvents,
  };
};
