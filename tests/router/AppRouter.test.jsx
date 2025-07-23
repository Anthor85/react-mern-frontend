import { render, screen } from "@testing-library/react";
import { useAuthStore } from "../../src/hooks";
import { AppRouter } from "../../src/router/AppRouter";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../src/hooks/useAuthStore");

//Mock de CalendarPage
jest.mock("../../src/calendar", () => ({
  CalendarPage: () => <h1>CalendarPage</h1>,
}));

describe("Pruebas de AppRouter", () => {
  const mockCheckAuthToken = jest.fn();
  // const mockErrorMessage = jest.fn();
  // const mockStartLogin = jest.fn();
  // const mockStartRegister = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("debe mostrar la pantalla de carga y llamar al checkAuthToken", () => {
    useAuthStore.mockReturnValue({
      status: "checking",
      checkAuthToken: mockCheckAuthToken,
    });
    render(<AppRouter />);

    //Daba un error en el Modal que se ha resuelto en CalendarModal
    expect(screen.getByText("Cargando...")).toBeTruthy();
    expect(mockCheckAuthToken).toHaveBeenCalled();
  });

  test("debe mostrar login en caso de no estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "not-authenticated",
      checkAuthToken: mockCheckAuthToken,
      //No es necesario probar esto
      // errorMessage: mockErrorMessage,
      // startLogin: mockStartLogin,
      // startRegister: mockStartRegister,
    });

    const { container } = render(
      <MemoryRouter initialEntries={["/auth/loquesea"]}>
        <AppRouter />
      </MemoryRouter>
    );
    expect(screen.getByText("Ingreso")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  test("debe mostrar el calendario en caso de estar autenticado", () => {
    useAuthStore.mockReturnValue({
      status: "authenticated",
      checkAuthToken: mockCheckAuthToken,
      //No es necesario probar esto
      // errorMessage: mockErrorMessage,
      // startLogin: mockStartLogin,
      // startRegister: mockStartRegister,
    });

    render(
      <MemoryRouter>
        <AppRouter />
      </MemoryRouter>
    );

    expect(screen.getByText("CalendarPage")).toBeTruthy();
  });
});
