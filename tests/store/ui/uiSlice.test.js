import {
  onOpenDateModal,
  onCloseDateModal,
  uiSlice,
} from "../../../src/store/ui/uiSlice";

describe("Pruebas en uiSlice", () => {
  test("Debe devolver el estado por defecto", () => {
    expect(uiSlice.getInitialState()).toEqual({
      isDateModalOpen: false,
    });
  });

  test("debe de cambiar el isDateModalOpen", () => {
    let state = uiSlice.getInitialState();
    state = uiSlice.reducer(state, onOpenDateModal());
    expect(state.isDateModalOpen).toBeTruthy();
    state = uiSlice.reducer(state, onCloseDateModal());
    expect(state.isDateModalOpen).toBeFalsy();
  });
});
