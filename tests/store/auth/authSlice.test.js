import {
  authSlice,
  clearErrorMessage,
  onChecking,
  onLogin,
  onLogout,
  onRegister,
} from "../../../src/store/auth/authSlice";
import {
  authenticatedState,
  initialState,
  notAuthenticatedState,
} from "../../fixtures/authStates";
import { testUserCredentials } from "../../fixtures/testUser";

describe("Pruebas en authSlice", () => {
  test("debe devolver el estado inicial", () => {
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test("debe haberse autenticado", () => {
    let state = initialState;
    state = authSlice.reducer(state, onLogin(testUserCredentials));
    expect(state).toEqual(authenticatedState);
  });

  test("debe desautenticarse", () => {
    let state = authenticatedState;
    state = authSlice.reducer(state, onLogout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test("debe desautenticarse con mensaje de error", () => {
    let state = authenticatedState;
    state = authSlice.reducer(state, onLogout("cerrado"));
    expect(state).toEqual({
      ...notAuthenticatedState,
      errorMessage: "cerrado",
    });
  });

  test("debe registrar un nuevo usuario", () => {
    let state = initialState;
    state = authSlice.reducer(state, onRegister(testUserCredentials));
    expect(state).toEqual(authenticatedState);
  });

  test("debe limpiar el mensaje de error", () => {
    const errorMessage = "Erroraco";
    const state = authSlice.reducer(
      { ...initialState, errorMessage },
      clearErrorMessage()
    );
    expect(state.errorMessage).toBeUndefined();
  });

  test("debe hacer el onChecking bien", () => {
    let state = initialState;
    state = authSlice.reducer(state, onChecking());
    expect(state).toEqual(initialState);
  });
});
