import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext'; 
import StudentList from '../components/StudentList';

const StudentListPage = () => {
  const navigate = useNavigate();
  const { dispatch } = useStudents();

  const handleViewStudent = (id) => {
    navigate(`/student/${id}`);
  };

  const handleAddStudent = () => {
    navigate('/form'); 
  };

  const handleEditStudent = (student) => {
    navigate('/form', { state: student }); 
  };

  return (
    <StudentList
      onViewStudent={handleViewStudent}
      onAddStudent={handleAddStudent}
      onEditStudent={handleEditStudent}
    />
  );
};

export default StudentListPage;
