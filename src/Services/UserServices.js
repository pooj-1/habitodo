import axios from 'axios'

export const createUser = async (todo) => {
    const response = await axios.post("/.netlify/functions/createUser", todo);
    return response.data
  };

 export const updateUser = async (todo) => {
    const response = await axios.post("/.netlify/functions/updateUser", todo);
    return response.data
  };

  export const authenticate = async (todo) => {
    const response = await axios.post("/.netlify/functions/authenticate", todo);
    return response.data
  };
  export const getTodos = async (todo) => {
    const response = await axios.post("/.netlify/functions/getTodos", todo);
    return response.data
  };

  export const createTodos = async (todo) => {
    const response = await axios.post("/.netlify/functions/createTodo", todo);
    return response.data
  };


