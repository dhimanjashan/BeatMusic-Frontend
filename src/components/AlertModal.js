import React, { useEffect } from "react";

const AlertModal = ({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = "warning",
}) => {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        onCancel();
      }
    };

    document.addEventListener("keydown", handleEscKey);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
    };
  }, [onCancel]);

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="alert-modal-overlay" onClick={onCancel} style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    }}>
      <div className={`alert-modal-content ${type}`} onClick={handleModalClick} style={{
        position: 'relative',
        transform: 'none',
        margin: 'auto',
      }}>
        <div className="alert-modal-header">
          <div className={`alert-icon ${type}`} style={type === "warning" ? { color: "black" } : { backgroundColor: "black" }}>
            {type === "success" && <span>✓</span>}
            {type === "warning" && <span style={{ color: "white" }}>⚠</span>}
            {type === "error" && <span>✕</span>}
            {type === "info" && <span>ℹ</span>}
          </div>
          <h2>{title}</h2>
        </div>

        <div className="alert-modal-body">
          <p>{message}</p>
        </div>

        <div className="alert-modal-footer">
          {cancelText && (
            <button className={`alert-button cancel-button`} onClick={onCancel}>
              {cancelText}
            </button>
          )}
          <button
            className={`alert-button confirm-button ${type}`}
            onClick={onConfirm}
            style={type === "success" ? { color: "white" } : { color: "white" }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
