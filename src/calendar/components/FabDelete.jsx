import { useCalendarStore } from "../../hooks";

export const FabDelete = () => {
  const { hasEventSelected, deleteEvent, activeEvent } = useCalendarStore();

  const handleClickDelete = async () => {
    hasEventSelected && (await deleteEvent(activeEvent));
  };

  return (
    <button
      aria-label="btn-delete"
      className="btn btn-danger fab-danger"
      onClick={handleClickDelete}
      style={{
        display: hasEventSelected ? "" : "none",
      }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  );
};
