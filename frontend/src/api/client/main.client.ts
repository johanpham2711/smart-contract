import axios from 'axios'

export const getMainClient = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API || '',
    timeout: 30000
  })

  instance.interceptors.request.use(
    function (config) {
      return config
    },
    function (error) {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error)
    }
  )

  return instance
}
