import { fireEvent, render, screen } from "@testing-library/react";
import { FabDelete } from "../../../src/calendar/components/FabDelete";
import { useCalendarStore } from "../../../src/hooks";
// import { Provider } from "react-redux";
// import { store } from "../../../src/store";

jest.mock("../../../src/hooks/useCalendarStore");

describe("Pruebas en FabDelete", () => {
  const mockDeleteEvent = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test("debe de mostrar el componente correctamente", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: false,
    });

    render(
      // <Provider store={store}>
      <FabDelete />
      // </Provider>
    );

    const btn = screen.getByLabelText("btn-delete");
    expect(btn.classList.toString()).toContain("btn");
    expect(btn.classList.toString()).toContain("btn-danger");
    expect(btn.classList.toString()).toContain("fab-danger");
    expect(btn.style.display).toBe("none");
    // screen.debug();
  });

  test("debe de mostrar el botón si hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
    });

    render(
      // <Provider store={store}>
      <FabDelete />
      // </Provider>
    );

    const btn = screen.getByLabelText("btn-delete");
    expect(btn.style.display).toBe("");
  });
  test("debe de llamar startDeletingEvent si hay un evento activo", () => {
    useCalendarStore.mockReturnValue({
      hasEventSelected: true,
      deleteEvent: mockDeleteEvent,
    });

    render(
      // <Provider store={store}>
      <FabDelete />
      // </Provider>
    );

    const btn = screen.getByLabelText("btn-delete");
    fireEvent.click(btn);

    expect(mockDeleteEvent).toHaveBeenCalled();
  });
});
