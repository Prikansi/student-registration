import { decryptStudentData, encryptStudentData } from '../../../utils/crypto'
import API from '../axios'
// import { encryptStudentData } from '../utils/crypto'

// Register Student
export const registerStudent = async (studentData: any) => {
  const encryptedData = encryptStudentData(studentData)

  const response = await API.post('/api/register', encryptedData)

  return response.data
}

// Update Student
export const updateStudent = async (
  studentId: string,
  studentData: any
) => {
  const encryptedData = encryptStudentData(studentData)

  const response = await API.put(
    `/api/student/${studentId}`,
    encryptedData
  )

  return response.data
}




// Get All Students
export const getStudents = async () => {
  const response = await API.get('/api/students')

  return response.data.map((student: any) => {
    try {
      return decryptStudentData(student)
    } catch {
      return student
    }
  })
}

// Delete Student
export const deleteStudent = async (studentId: string) => {
  const response = await API.delete(
    `/api/student/${studentId}`
  )

  return response.data
}