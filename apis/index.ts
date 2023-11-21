import axios from 'axios'

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    auth: process.env.NEXT_PUBLIC_HEADER_AUTH
  }
})


const getSubjectList = async (param: {
  sentence
  : string
}) => {
  const res = await instance.post(`/prompt`, param)
  return res.data
}

const APIs = {
  getSubjectList
}

export default APIs