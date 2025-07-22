//Fab => Fade in action button
import { useUiStore, useCalendarStore, useAuthStore } from "../../hooks";
import { addHours } from "date-fns";

export const FabAddNew = () => {
  const { openDateModal } = useUiStore();
  const { user } = useAuthStore();
  const { setActiveEvent } = useCalendarStore();

  const handleClickNew = () => {
    setActiveEvent({
      title: "",
      notes: "",
      start: new Date(),
      end: addHours(new Date(), 2),
      bgColor: "#fafafa",
      user,
    });
    openDateModal();
  };

  return (
    <button className="btn btn-primary fab" onClick={handleClickNew}>
      <i className="fas fa-plus"></i>
    </button>
  );
};
