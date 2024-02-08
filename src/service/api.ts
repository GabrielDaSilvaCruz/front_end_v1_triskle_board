import axios from "axios";

function createFetch(urlBase: string) {
    return async  (endpoint: string, options = {}) => {
      try {
        const url = new URL(endpoint, urlBase);
        // Adicione configurações comuns aqui, se necessário
        // options.headers = { 'Authorization': 'Bearer token' };

        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        throw new Error(`HTTP error! Status: ${error}`);
      }
    };
  }
  
  export const api_fetch = createFetch('http://127.0.0.1:8000');
  


  export const api_axios = axios.create({
    baseURL: 'http://0.0.0.0:8000',
  })