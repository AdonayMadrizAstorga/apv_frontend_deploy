import axios from 'axios'; // Axios se usa para hacer la petición, por ejemplo, a la URL /.../veterinarios/confirmar/:token

const clienteAxios = axios.create({
    baseURL: `${ import.meta.env.VITE_BACKEND_URL }/api`
});

export default clienteAxios;
