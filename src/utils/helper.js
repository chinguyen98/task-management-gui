import axios from "axios"

export const apiRequest = async (url, method, bodyParams) => {
  const response = await axios({
    method,
    url,
    params: bodyParams,
    responseType: 'json',
    headers: {
      'accept': 'application/json',
      "content-type": 'application/json',
    },
  })
  return await response.data;
}