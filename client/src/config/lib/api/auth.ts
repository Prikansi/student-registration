import { encryptData } from '../../../utils/crypto'
import API from '../axios'
// import { encryptData } from '../utils/crypto'

export const loginStudent = async (email: string, password: string) => {
  // Encrypt email before sending
  const encryptedEmail = encryptData(email)

  const response = await API.post('/api/login', {
    email: encryptedEmail,
    password
  })

  return response.data
}