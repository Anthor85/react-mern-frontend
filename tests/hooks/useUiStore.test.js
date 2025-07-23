import { act, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks";
import { /* store, */ uiSlice } from "../../src/store";

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe("Tests de useUiStore", () => {
  test("Debe devolver valores por defecto", () => {
    // mockear el store para personalizar el valor inicial del store
    const mockStore = getMockStore({ isDateModalOpen: false });

    //El 2º elemento es el provider necesario para usar useDispatch de redux
    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    expect(result.current).toEqual({
      isDateModalOpen: false,
      openDateModal: expect.any(Function),
      closeDateModal: expect.any(Function),
      toogleDateModal: expect.any(Function),
    });
  });

  test("openDateModal debe poner isDateModalOpen a true", () => {
    const mockStore = getMockStore({ isDateModalOpen: false });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { openDateModal } = result.current;

    act(() => openDateModal());

    const { isDateModalOpen } = result.current;
    expect(isDateModalOpen).toBeTruthy();
  });

  test("closeDateModal debe poner isDateModalOpen a false", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });
    const { closeDateModal } = result.current;

    act(() => closeDateModal());

    const { isDateModalOpen } = result.current;
    expect(isDateModalOpen).toBeFalsy();
  });

  test("toogleDateModal debe cambiar isDateModalOpen", () => {
    const mockStore = getMockStore({ isDateModalOpen: true });

    const { result } = renderHook(() => useUiStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    act(() => result.current.toogleDateModal());
    expect(result.current.isDateModalOpen).toBeFalsy();

    act(() => result.current.toogleDateModal());
    expect(result.current.isDateModalOpen).toBeTruthy();
  });
});
