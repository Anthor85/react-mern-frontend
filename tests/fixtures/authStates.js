import { testUserCredentials } from "./testUser";

export const initialState = {
  status: "checking", // 'checking', 'authenticated', 'not-authenticated'
  user: {},
  errorMessage: undefined,
};

export const authenticatedState = {
  status: "authenticated",
  user: testUserCredentials,
  errorMessage: undefined,
};

export const notAuthenticatedState = {
  status: "not-authenticated",
  user: {},
  errorMessage: undefined,
};
