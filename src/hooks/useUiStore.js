import { useDispatch, useSelector } from "react-redux";
import { onCloseDateModal, onOpenDateModal } from "../store/index.js";

export const useUiStore = () => {
  const dispatch = useDispatch();
  const { isDateModalOpen } = useSelector((state) => state.ui);

  const openDateModal = () => {
    dispatch(onOpenDateModal());
  };

  const closeDateModal = () => {
    dispatch(onCloseDateModal());
  };

  const toogleDateModal = () => {
    isDateModalOpen ? closeDateModal() : openDateModal();
  };

  return {
    isDateModalOpen,

    openDateModal,
    closeDateModal,
    toogleDateModal,
  };
};
