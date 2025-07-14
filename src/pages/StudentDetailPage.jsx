import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentDetail from '../components/StudentDetail';

const StudentDetailPage = () => {
  const { id } = useParams(); // get student ID from the URL
  const navigate = useNavigate();

  return (
    <StudentDetail
      studentId={id}
      onBack={() => navigate('/')} // go back to list
    />
  );
};

export default StudentDetailPage;
