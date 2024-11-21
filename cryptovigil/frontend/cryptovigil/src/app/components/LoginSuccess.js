import { useEffect, useState } from 'react';

const LoginSuccess = () => {
  const [progress, setProgress] = useState(0);

  // Simulate loading progress
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 50); // Increases the progress every 50ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '50vh',
      width: '50vw',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black background
      backdropFilter: 'blur(10px)', // Background blur effect
      color: '#fff', // White text
      fontFamily: 'Arial, sans-serif',
      border: '2px solid #fff', // White border
      borderRadius: '10px',
      padding: '3px' // Optional: Rounded corners for the border
    }}
  >
      {/* Left Side: Flipping Bitcoin Logo */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
        }}
      >
        <img
          src="/bitcoin3.png" // Replace with your own logo URL
          alt="Bitcoin Logo"
          style={{
            height: '150px',
            width: '150px',
            animation: 'flip 5s linear infinite', // Inline animation for flipping
          }}
        />
        <p
          style={{
            marginTop: '20px',
            fontSize: '18px',
            color: '#22c55e', // Green color for "Secured Access"
          }}
        >
          Secured Access
        
          Granted
        </p>
      </div>

      {/* Right Side: Login Success and Loading Bars */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '50%',
        }}
      >
       <h1
  style={{
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#22c55e', // Green color for "Login Successful"
    fontFamily: 'Consolas, Courier New, monospace', // Monospace font for a "hacking" feel
    textShadow: '0 0 10px rgba(34, 197, 94, 0.7), 0 0 20px rgba(34, 197, 94, 0.7)', // Green glow effect
    letterSpacing: '1px', // Slightly increased letter spacing for a clean look
    textAlign: 'center', // Centered text for better alignment
  }}
>
  Login Successful Redirecting to Workspace...
</h1>


        {/* Circular Progress */}
        <div
          style={{
            margin: '20px 20px',
            marginTop: '20px',
            position: 'relative',
            height: '100px',
            width: '100px',
            
          }}
        >
          <svg
            style={{
              transform: 'rotate(-180deg)', // Rotates the circle for proper progress
              
            }}
            height="100"
            width="100"
          >
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="rgba(255, 255, 255, 0.2)" // Background stroke
              strokeWidth="10"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="transparent"
              stroke="#22c55e" // Progress stroke
              strokeWidth="10"
              strokeDasharray="283" // Circumference of the circle
              strokeDashoffset={283 - (283 * progress) / 100} // Adjust based on progress
              strokeLinecap="round"
            />
          </svg>
          <span
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '16px',
              fontWeight: 'bold',
              color: '#fff',
              
            }}
          >
            {progress}%
          </span>
        </div>

        {/* Hacking/Loading Bar */}
        <div
          style={{
            position: 'relative',
            width: '300px',
            height: '10px',
            backgroundColor: '#333', // Dark gray bar background
            borderRadius: '5px',
            overflow: 'hidden',
            border: '2px solid #fff', // White border
      borderRadius: '10px',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: '0',
              left: '0',
              height: '10px',
              backgroundColor: '#22c55e', // Green for the progress bar
              width: `${progress}%`, // Dynamically updates width
              transition: 'width 0.05s linear',
            }}
          ></div>
        </div>
        <p className='mt-4'>
       Please Wait while we complete the setup for you on the other hand for smoother Experience
        </p>
      </div>

      {/* Inline Keyframes for the Bitcoin Flip Effect */}
      <style jsx>{`
        @keyframes flip {
          0% {
            transform: rotateY(0deg); // Start without flip
          }
          50% {
            transform: rotateY(180deg); // Flip halfway
          }
          100% {
            transform: rotateY(360deg); // Complete the flip
          }
        }
      `}</style>
    </div>
  );
};

export default LoginSuccess;
