import calendarApi from "../../src/api/calendarApi";

describe("Pruebas en el CalendarApi", () => {
  test("debe tener la configuración por defecto", () => {
    expect(calendarApi.defaults.baseURL).toBe(process.env.VITE_API_URL);
  });

  test("debe de tener el x-token en el header de las peticiones", async () => {
    const token = "aaaaa";

    localStorage.setItem("token", token);
    const res = await calendarApi.get("/auth");
    expect(res.config.headers["x-token"]).toBe(token);
  });
});
