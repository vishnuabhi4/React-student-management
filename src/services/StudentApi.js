// API functions for student management
export const fetchStudents = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Failed to fetch students');
    const data = await response.json();
    return data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      website: user.website,
      company: user.company.name
    }));
  } catch (error) {
    throw new Error('Failed to load students');
  }
};

export const fetchStudentById = async (studentId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${studentId}`);
    if (!response.ok) throw new Error('Student not found');
    
    const userData = await response.json();
    return {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      website: userData.website,
      company: userData.company.name,
      address: `${userData.address.street}, ${userData.address.city}`,
      username: userData.username
    };
  } catch (error) {
    throw new Error('Failed to load student details');
  }
};