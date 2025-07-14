import React from 'react';
import { AlertCircle, X } from 'lucide-react';

// Loading Component
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    <span className="ml-2 text-gray-600">Loading...</span>
  </div>
);

// Error Component
export const ErrorMessage = ({ message, onRetry }) => (
  <div className="flex items-center justify-center p-8 text-red-600">
    <AlertCircle className="w-5 h-5 mr-2" />
    <span>{message}</span>
    {onRetry && (
      <button 
        onClick={onRetry}
        className="ml-4 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
      >
        Retry
      </button>
    )}
  </div>
);

// Confirmation Modal
export const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};