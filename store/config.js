import axios from 'axios'

export const api = 'https://lt-shoes-shop.herokuapp.com/api'

export const getApi = (url, options) => {
  return axios(url, {
    ...options,
    headers: {
      ...options.headers,
    },
  })
    .then((res) => res)
    .catch((e) => console.log(e))
}

export const getApiWithToken = (url, options) => {
  const token = localStorage.getItem('token')
  return axios(url, {
    ...options,
    headers: {
      ...options,
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res)
    .catch((e) => console.log(e))
}
