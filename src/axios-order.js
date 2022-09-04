import axios  from "axios";

const instance = axios.create({
    baseURL:'https://react-burger-app-748b3-default-rtdb.firebaseio.com/'
});
export default instance;