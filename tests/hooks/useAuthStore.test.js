import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../../src/store";
import {
  initialState,
  authenticatedState,
  notAuthenticatedState,
} from "../fixtures/authStates";
import { useAuthStore } from "../../src/hooks";
import { testUserCredentials } from "../fixtures/testUser";
import { calendarApi } from "../../src/api";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe("Test de useAuthStore", () => {
  beforeEach(() => {
    //Limpiar localstorage por si otra prueba ha escrito algo en él
    localStorage.clear();
  });

  test("debe devolver los valores por defecto ", () => {
    // mockear el store para personalizar el valor inicial del store
    const mockStore = getMockStore({ ...initialState });

    //El 2º elemento es el provider necesario para usar useDispatch de redux
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: initialState.status,
      user: initialState.user,
      errorMessage: initialState.errorMessage,

      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
      checkAuthToken: expect.any(Function),
    });
  });

  test("startLogin debe camibar el status", async () => {
    // mockear el store para personalizar el valor inicial del store
    const mockStore = getMockStore({ ...notAuthenticatedState });

    //El 2º elemento es el provider necesario para usar useDispatch de redux
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { startLogin } = result.current;
    await act(async () => await startLogin({ ...testUserCredentials }));

    const { status, user, errorMessage } = result.current;
    const { uid, name } = authenticatedState.user;
    expect({ status, user, errorMessage }).toEqual({
      ...authenticatedState,
      user: { uid, name },
    });

    expect(localStorage.getItem("token")).toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startLogin debe fallar al autenticarse de forma errónea", async () => {
    // mockear el store para personalizar el valor inicial del store
    const mockStore = getMockStore({ ...notAuthenticatedState });

    //El 2º elemento es el provider necesario para usar useDispatch de redux
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { startLogin } = result.current;
    await act(async () => await startLogin({ email: "", password: "" }));

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      ...notAuthenticatedState,
      errorMessage: "Credenciales no válidas",
    });

    // waitFor(() => expect(result.current.errorMessage).toBeUndefined());

    expect(localStorage.getItem("token")).not.toEqual(expect.any(String));
    expect(localStorage.getItem("token-init-date")).not.toEqual(
      expect.any(String)
    );
  });

  test("startRegister debe crear el usuario", async () => {
    const newUser = {
      email: "hola@hola.es",
      password: "abcdefg",
      name: "Test Man",
    };

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    //Devolver un valor logueado para los post
    const spy = jest.spyOn(calendarApi, "post").mockReturnValue({
      data: {
        ok: true,
        uid: "uid",
        name: newUser.name,
        token: "test-token",
      },
    });
    const { startRegister } = result.current;
    await act(async () => await startRegister(newUser));

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      ...authenticatedState,
      user: { uid: "uid", name: newUser.name },
    });

    //Eliminar el espía por si afecta a otras pruebas
    spy.mockRestore();

    expect(localStorage.getItem("token")).toEqual("test-token");
    expect(localStorage.getItem("token-init-date")).toEqual(expect.any(String));
  });

  test("startRegister debe fallar al crear un usuario que ya existe", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { startRegister } = result.current;
    await act(async () => await startRegister(testUserCredentials));

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      ...notAuthenticatedState,
      errorMessage: "El usuario ya existe con ese email",
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("token-init-date")).toBeNull();
  });

  test("checkAuthToken debe fallar si no hay token", async () => {
    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { checkAuthToken } = result.current;
    await act(async () => await checkAuthToken());

    const { status, user, errorMessage } = result.current;
    expect({ status, user, errorMessage }).toEqual({
      ...notAuthenticatedState,
    });

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("token-init-date")).toBeNull();
  });

  test("checkAuthToken debe autenticar si hay token", async () => {
    //Logueo de forma normal para guardar el token
    const { data } = await calendarApi.post("/auth", testUserCredentials);
    localStorage.setItem("token", data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const { checkAuthToken } = result.current;
    await act(async () => await checkAuthToken());

    const { status, user, errorMessage } = result.current;
    const { uid, name } = authenticatedState.user;
    expect({ status, user, errorMessage }).toEqual({
      ...authenticatedState,
      user: { uid, name },
    });

    // expect(localStorage.getItem("token")).not.toEqual(expect.any(String));
    // expect(localStorage.getItem("token-init-date")).not.toEqual(
    //   expect.any(String)
    // );
  });
});
