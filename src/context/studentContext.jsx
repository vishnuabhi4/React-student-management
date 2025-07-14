import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  students: [],
  loading: false,
  error: null,
  currentStudent: null
};

// Reducer function
const studentReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_STUDENTS':
      return { ...state, students: action.payload, loading: false, error: null };
    case 'ADD_STUDENT':
      return { 
        ...state, 
        students: [...state.students, { ...action.payload, id: Date.now() }] 
      };
    case 'UPDATE_STUDENT':
      return {
        ...state,
        students: state.students.map(student =>
          student.id === action.payload.id ? action.payload : student
        )
      };
    case 'DELETE_STUDENT':
      return {
        ...state,
        students: state.students.filter(student => student.id !== action.payload)
      };
    case 'SET_CURRENT_STUDENT':
      return { ...state, currentStudent: action.payload };
    default:
      return state;
  }
};

// Context creation
const StudentContext = createContext();

// Provider component
export const StudentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(studentReducer, initialState);
  
  return (
    <StudentContext.Provider value={{ state, dispatch }}>
      {children}
    </StudentContext.Provider>
  );
};

// Custom hook
export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};