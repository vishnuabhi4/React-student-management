import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import StudentForm from '../components/StudentForm';

const StudentFormPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useStudents();

  const student = location.state || null; // received when editing

  const handleSaveStudent = (studentData) => {
    if (student && student.id) {
      dispatch({ type: 'UPDATE_STUDENT', payload: studentData });
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: studentData });
    }
    navigate('/'); // back to list
  };

  return (
    <StudentForm
      student={student}
      onSave={handleSaveStudent}
      onCancel={() => navigate('/')}
    />
  );
};

export default StudentFormPage;
