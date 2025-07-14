import React from 'react';
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom';
import { StudentProvider,useStudents } from './context/studentContext';
import StudentList from './components/StudentList';
import StudentListPage from './pages/StudentListPage';
import StudentDetail from './components/StudentDetail';
import StudentDetailPage from './pages/StudentDetailPage';
import StudentForm from './components/StudentForm';
import StudentFormPage from './pages/StudentFormPage';



const StudentListWrapper = () => {
  const navigate = useNavigate();
  const { dispatch } = useStudents();

  const handleViewStudent = (id) => navigate(`/student/${id}`);
  const handleAddStudent = () => navigate('/form');
  const handleEditStudent = (student) => navigate('/form', { state: student });

  return (
    <StudentList
      onViewStudent={handleViewStudent}
      onAddStudent={handleAddStudent}
      onEditStudent={handleEditStudent}
    />
  );
};

const StudentDetailWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return <StudentDetail studentId={id} onBack={() => navigate('/')} />;
};

const StudentFormWrapper = () => {
  const { state } = useLocation(); 
  const navigate = useNavigate();
  const { dispatch } = useStudents();

  const handleSaveStudent = (studentData) => {
    if (state && state.id) {
      dispatch({ type: 'UPDATE_STUDENT', payload: studentData });
    } else {
      dispatch({ type: 'ADD_STUDENT', payload: studentData });
    }
    navigate('/');
  };

  return (
    <StudentForm
      student={state}
      onSave={handleSaveStudent}
      onCancel={() => navigate('/')}
    />
  );
};


const App = () => {
  return (
    <StudentProvider>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<StudentListPage />} />
          <Route path="/student/:id" element={<StudentDetailPage />} />
          <Route path="/form" element={<StudentFormPage />} />
        </Routes>
      </div>
    </StudentProvider>
  );
};

export default App;
