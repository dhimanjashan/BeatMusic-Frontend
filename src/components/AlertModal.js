import React, { useEffect } from 'react';

const AlertModal = ({ 
  title, 
  message, 
  confirmText, 
  cancelText,
  onConfirm, 
  onCancel,
  type = 'warning' // Can be 'success', 'warning', 'error', 'info'
}) => {
  
  // Close modal when Escape key is pressed
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    
    // Prevent scrolling of background content
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'auto';
    };
  }, [onCancel]);
  
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };
  
  return (
    <div className="alert-modal-overlay" onClick={onCancel}>
      <div className={`alert-modal-content ${type}`} onClick={handleModalClick}>
        <div className="alert-modal-header">
          <div className={`alert-icon ${type}`}>
            {type === 'success' && <span>✓</span>}
            {type === 'warning' && <span>⚠</span>}
            {type === 'error' && <span>✕</span>}
            {type === 'info' && <span>ℹ</span>}
          </div>
          <h2>{title}</h2>
        </div>
        
        <div className="alert-modal-body">
          <p>{message}</p>
        </div>
        
        <div className="alert-modal-footer">
          {cancelText&&(
          <button 
            className={`alert-button cancel-button`} 
            onClick={onCancel}
          >
            {cancelText}
          </button>)}
          <button 
            className={`alert-button confirm-button ${type}`} 
            onClick={onConfirm}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;