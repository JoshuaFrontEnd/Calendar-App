// Archivos con estados "falsos" que emulan casos "reales" para usar en el testing
export const initialState = {
  status: 'checking',
  user: {},
  errorMessage: undefined
}

export const authenticatedState = {
  status: 'authenticated',
  user: {
    uid: 'abc',
    name: 'Joshua'
  },
  errorMessage: undefined
}

export const notAuthenticatedState = {
  status: 'not-authenticated',
  user: {},
  errorMessage: undefined
}