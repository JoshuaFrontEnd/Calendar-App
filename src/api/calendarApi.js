import axios from 'axios';
import { getEnvVariables } from '../helpers';

const { VITE_API_URL } = getEnvVariables();

const calendarApi = axios.create({
  baseURL: VITE_API_URL
});

// TODO: configurar interceptores
// Los interceptores en Axios, permiten interceptar las peticiones que van hacia el backend y las que regresan, en este caso usaremos interceptores en las peticiones "request" para añadir la configuración especifica de los headers

// Acá por ejemplo, antes de que se haga la solicitud (request) se usara el interceptor, para añadir a la peticion un header personalizado llamado "x-token"
calendarApi.interceptors.request.use( config => {

  config.headers = {
    // En esta linea rescato todo los headers que existen y los añado a la configuración
    ...config.headers,

    // Y acá ademas de los headers que ya existen añado el personalizado
    'x-token': localStorage.getItem('token'),
  }

  return config;
});

export default calendarApi;