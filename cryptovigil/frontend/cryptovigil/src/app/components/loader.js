import React from 'react';

export default function LoaderModal({ isLoading, message }) {
    return (
      <>
        {isLoading && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="flex flex-col items-center p-6 bg-gray-400 rounded-lg shadow-lg">
              <div className="loader animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 mb-4"></div>
              <p className="text-lg text-white font-medium">{message || 'Processing... Please wait.'}</p>
            </div>
          </div>
        )}
        <style jsx>{`
          .loader {
            border: 4px solid rgba(255, 255, 255, 0.3);
            border-top-color: #1D4ED8; /* Blue color for the spinner */
            border-radius: 50%;
          }
        `}</style>
      </>
    );
  }
  
