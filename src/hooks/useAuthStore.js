import { useDispatch, useSelector } from 'react-redux';

import calendarApi from '../api/calendarApi';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

export const useAuthStore = () => {

  const { status, user, errorMessage } = useSelector( state => state.auth );
  const dispatch = useDispatch();

  // Login
  const startLogin = async ({ email, password }) => {

    // Dejo la app en un estado de "carga" mientras hace el login
    dispatch( onChecking() );

    try {

      // Si los datos ingresados en el formulario del login son correctos me traigo la data del usuario
      const { data } = await calendarApi.post('/auth', { email, password });

      // Seteo en local el token del usuario
      localStorage.setItem('token', data.token );

      // Seteo en local la fecha de inicio de cuando se seteo el token, de esta manera puedo calcular el tiempo de duracion del token, que en el backend lo setee de 2 horas
      localStorage.setItem('token-init-date', new Date().getTime() );

      // "Grabo" en el estado de la app los datos del usuario extraidos de la consulta al backend, al hacer esto, en el estado el "status" cambia a "authenticated" y en el usuario se agrega la siguiente informacion:
      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch ( error ) {

      // Si los datos ingresados en el formulario del login son incorrectos, seteo el mensaje de error
      dispatch( onLogout('Credenciales incorrectas') );

      // Despues de algunos milisegundos el mensaje de error es eliminado, esto se hace para que siempre se pueda setear un mensaje de error cuando ocurra un error, se usa "setTimeout" para que en esos milisegundos el mensaje de error sea capturado y lo pueda mostrar SweetAlert configurado en LoginPage.jsx
      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);

    }
  }

  // Registro
  const startRegister = async ({ name, email, password }) => {

    // Dejo la app en un estado de "carga" mientras hace el login
    dispatch( onChecking() );

    try {

      const { data } = await calendarApi.post('/auth/new', { name, email, password });

      localStorage.setItem('token', data.token );

      localStorage.setItem('token-init-date', new Date().getTime() );

      dispatch( onLogin({ name: data.name, uid: data.uid }) );

    } catch ( error ) {

      dispatch( onLogout( error.response.data?.msg || '--') );

      setTimeout(() => {
        dispatch( clearErrorMessage() );
      }, 10);

    }
  }

  return {
    // Propiedades
    status,
    user,
    errorMessage,

    // Metodos
    startLogin,
    startRegister

  }
}
