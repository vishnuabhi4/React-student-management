import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, ArrowLeft, AlertCircle } from 'lucide-react';
import { useStudents } from '../context/StudentContext';
import { fetchStudentById } from '../services/StudentApi';
import { LoadingSpinner } from '../UI';


const StudentDetail = ({ studentId, onBack }) => {
  const { state } = useStudents();
  const [loading, setLoading] = useState(true);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const loadStudent = async () => {
      setLoading(true);
      
      // First try to find in local state
      const localStudent = state.students.find(s => s.id === parseInt(studentId));
      
      if (localStudent) {
        setStudent(localStudent);
        setLoading(false);
      } else {
        // Fetch from API if not found locally
        try {
          const studentData = await fetchStudentById(studentId);
          setStudent(studentData);
        } catch (error) {
          setStudent(null);
        }
        setLoading(false);
      }
    };

    loadStudent();
  }, [studentId, state.students]);

  if (loading) return <LoadingSpinner />;
  
  if (!student) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-12">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-red-500 text-lg">Student not found</p>
          <button 
            onClick={onBack}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Back to List
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <button 
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to List
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Student Details</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <User className="w-8 h-8 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{student.name}</h2>
            <p className="text-gray-600">Student ID: {student.id}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{student.email}</p>
              </div>
            </div>
            
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{student.phone}</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {student.website && (
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Website</p>
                  <p className="font-medium">{student.website}</p>
                </div>
              </div>
            )}
            
            {student.company && (
              <div className="flex items-center">
                <User className="w-5 h-5 text-gray-400 mr-3" />
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-medium">{student.company}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {student.address && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="font-medium">{student.address}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDetail;