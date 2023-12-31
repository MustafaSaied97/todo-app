// api.js
import axios from 'axios';


// Function to make a generic HTTP request
export async function callApi({ method, url, body = {}, headers = {}, withFiles = false }) {
  if (!url || !method) {
    console.error('Both the URL and the method must be provided.');
    return Promise.reject({
      data:{
        message:'Both the URL and the method must be provided.'
      }
    })
  }
  // check network
  if (!navigator.onLine) {
    // notify({ type: 'error', msg: 'not_online' });
    console.error('not_online');
    return Promise.reject({
      data:{
        message:'not_online'
      }
    });
  }

  return axios({
    method,
    url,
    // ...(body && { data: body }),
    // headers: {
    //   Accept: 'application/json',
    //   Platform: 'web',
    //   'Content-Type': withFiles ? 'multipart/form-data' : 'application/json',
    //   ...headers,
    // },
  })
    .then((response) => response.data)
    .catch((error) => {
      const errorResponse = error.response;
      switch (errorResponse?.status) {
        case 404: {
          break;
        }
        default:
          break; 
      }
      return Promise.reject(errorResponse);
    });
}


