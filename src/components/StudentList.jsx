import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { useStudents } from '../context/studentContext';
import { fetchStudents } from '../services/StudentApi';
import { LoadingSpinner, ErrorMessage, ConfirmationModal } from '../UI';

const StudentList = ({ onViewStudent, onAddStudent, onEditStudent }) => {
  const { state, dispatch } = useStudents();
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, studentId: null });

  useEffect(() => {
    const loadStudents = async () => {
      dispatch({ type: 'SET_LOADING', payload: true });
      try {
        const students = await fetchStudents();
        dispatch({ type: 'SET_STUDENTS', payload: students });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: error.message });
      }
    };
    
    if (state.students.length === 0) {
      loadStudents();
    }
  }, [dispatch, state.students.length]);

  const filteredStudents = state.students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (studentId) => {
    setDeleteModal({ isOpen: true, studentId });
  };

  const confirmDelete = () => {
    dispatch({ type: 'DELETE_STUDENT', payload: deleteModal.studentId });
    setDeleteModal({ isOpen: false, studentId: null });
  };

  const retryLoad = async () => {
    dispatch({ type: 'SET_LOADING', payload: true });
    try {
      const students = await fetchStudents();
      dispatch({ type: 'SET_STUDENTS', payload: students });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message });
    }
  };

  if (state.loading) return <LoadingSpinner />;
  if (state.error) return <ErrorMessage message={state.error} onRetry={retryLoad} />;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Student Management Portal</h1>
        <button 
          onClick={onAddStudent}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Student
        </button>
      </div>

      <div className="mb-6 relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="grid gap-4">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{student.name}</h3>
                <div className="flex items-center text-gray-600 mb-2">
                  <Mail className="w-4 h-4 mr-2" />
                  <span>{student.email}</span>
                </div> 
                <div className="flex items-center text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  <span>{student.phone}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onViewStudent(student.id)}
                  className="bg-blue-100 text-blue-700 px-3 py-2 rounded hover:bg-blue-200 flex items-center"
                >
                  <User className="w-4 h-4 mr-1" />
                  View
                </button>
                <button
                  onClick={() => onEditStudent(student)}
                  className="bg-green-100 text-green-700 px-3 py-2 rounded hover:bg-green-200 flex items-center"
                >
                  <Edit2 className="w-4 h-4 mr-1" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(student.id)}
                  className="bg-red-100 text-red-700 px-3 py-2 rounded hover:bg-red-200 flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && !state.loading && (
        <div className="text-center py-12">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No students found</p>
        </div>
      )}

      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, studentId: null })}
        onConfirm={confirmDelete}
        title="Delete Student"
        message="Are you sure you want to delete this student? This action cannot be undone."
      />
    </div>
  );
};

export default StudentList;
