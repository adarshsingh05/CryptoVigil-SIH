import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose }) => {
  const code = "1234";

  // Inline styles
  const modalStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(10px)",
    position: "fixed",
    inset: "0",
    borderRadius: "10px",
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    width: "60%",
    height: "50%",
    margin: "150px auto",
    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.25)",
    overflow: "hidden",
  };

  const hackingBackgroundStyle = {
    position: "absolute",
    inset: "0",
    overflow: "hidden",
    zIndex: -1,
  };

  const hackingSpanStyle = {
    position: "absolute",
    color: "rgba(0, 255, 0, 0.8)", // Bright green
    fontSize: "1.5rem",
    whiteSpace: "nowrap",
    animation: "hackingRain 1s linear infinite", // Increased speed
  };

  // Keyframes added via React's `style` prop
  const keyframesStyle = `
    @keyframes hackingRain {
      0% {
        transform: translateY(-100%);
        opacity: 1;
      }
      80% {
        opacity: 1;
      }
      100% {
        transform: translateY(calc(100% + 300px)); /* Go beyond the bottom of the modal */        opacity: 0;
      }
    }
  `;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 40,
            }}
            onClick={onClose}
          ></motion.div>

          {/* Modal */}
          <motion.div
          className="border-2 border-gray-400"
            initial={{
              opacity: 0,
              scale: 0,
              x: "4rem",
              y: "4rem",
            }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0,
              x: "4rem",
              y: "4rem",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
            style={modalStyle}
          >
            {/* Inject keyframes */}
            <style>{keyframesStyle}</style>

            {/* Hacking Effect Background */}
            <div style={hackingBackgroundStyle}>
              {Array.from({ length: 300 }).map((_, i) => (
                <span
                  key={i}
                  style={{
                    ...hackingSpanStyle,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                  }}
                >
                  {Math.random() > 0.5 ? "0" : "1"}
                </span>
              ))}
            </div>

            {/* Modal Content */}
            <div
            
  style={{
    textAlign: "center",
    fontSize: "24px",
    marginTop: "10px",
    color: "black",
  }}
>
  <p className="bg-gray-400 text-2xl font-semibold"
    style={{
      display: "inline-block", // Ensures the background wraps tightly around the text
       // Black background
      padding: "5px 10px", // Add a small padding for aesthetics
      borderRadius: "4px", // Optional: Rounded corners
    }}
  >
    Transaction Tracking (Law Enforcement)
  </p>
</div>

            <button
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                color: "#A3A3A3",
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
              onClick={onClose}
            >
              ✖
            </button>
            <div
              style={{
                textAlign: "center",
                fontSize: "20px",
                margin: "20px 0",
              }}
            >
              Verify Your Identity To Proceed
            </div>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "400px" }}>
                <input
                  type="password"
                  id="codeInput"
                  className="mb-2"
                  style={{
                    width: "100%",
                    padding: "10px",
                    border: "1px solid #D1D5DB",
                    borderRadius: "5px",
                    outline: "none",
                    color: "black",
                  }}
                  placeholder="Enter your 16 digits code"
                />
                <button
                className="mt-[1px]"
                  type="button"
                  style={{
                    position: "absolute",
                    top: "0",
                    right: "0",
                    padding: "10px",
                    backgroundColor: "#6B7280",
                    color: "black",
                    borderRadius: "0 5px 5px 0",
                    border: "none",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const input = document.getElementById("codeInput");
                    input.type = input.type === "password" ? "text" : "password";
                  }}
                >
                  👁️
                </button>
              </div>
              <button
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  backgroundColor: "#34D399",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  border: "none",
                }}
                onClick={() => {
                  const input = document.getElementById("codeInput");
                  if (input.value === code) {
                    alert("Identity Verified");
                    window.location.href = "policeDashboard";
                    onClose();
                  } else {
                    alert("Invalid Code");
                  }
                }}
              >
                Submit
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
