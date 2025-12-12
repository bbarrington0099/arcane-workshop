"use client";
import React, { useState, useEffect } from 'react';

const NotFound = () => {
  const [glitchActive, setGlitchActive] = useState<boolean>(false);
  const [consoleLines, setConsoleLines] = useState<string[]>([]);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    const messages = [
      '> Searching for route...',
      '> Error: Route not found',
      '> Checking your code...',
      '> Found the problem: It\'s between the chair and keyboard',
      '> Suggestion: Maybe check your parameter handling? 🤔'
    ];

    const timeouts: NodeJS.Timeout[] = [];
    messages.forEach((msg, i) => {
      const timeout = setTimeout(() => {
        setConsoleLines(prev => [...prev, msg]);
      }, i * 800);
      timeouts.push(timeout);
    });

    return () => {
      clearInterval(glitchInterval);
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, []);

  return (
    <>
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .container {
          min-height: 100vh;
          background-color: #111827;
          color: #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          font-family: 'Courier New', monospace;
          overflow: hidden;
          position: relative;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          opacity: 0.1;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(#4ade80 1px, transparent 1px), 
                            linear-gradient(90deg, #4ade80 1px, transparent 1px);
          background-size: 50px 50px;
          animation: moveGrid 20s linear infinite;
        }

        @keyframes moveGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .content {
          position: relative;
          z-index: 10;
          max-width: 48rem;
          width: 100%;
        }

        .main-section {
          text-align: center;
          margin-bottom: 2rem;
        }

        .error-code {
          font-size: 6rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #4ade80;
          text-shadow: 0 0 20px rgba(74, 222, 128, 0.5);
          animation: float 3s ease-in-out infinite;
        }

        .error-code.glitch {
          animation: glitch 0.3s ease-in-out, float 3s ease-in-out infinite;
        }

        .main-heading {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #d1d5db;
        }

        .sub-text {
          font-size: 1.25rem;
          color: #9ca3af;
          margin-bottom: 2rem;
        }

        .console {
          background-color: #000;
          border: 1px solid #4ade80;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 10px 25px rgba(74, 222, 128, 0.2);
        }

        .console-header {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #374151;
        }

        .console-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }

        .dot-red { background-color: #ef4444; }
        .dot-yellow { background-color: #eab308; }
        .dot-green { background-color: #22c55e; }

        .console-title {
          margin-left: 0.5rem;
          font-size: 0.875rem;
          color: #6b7280;
        }

        .console-output {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .console-line {
          color: #4ade80;
          font-size: 0.875rem;
        }

        .cursor-line {
          display: flex;
          align-items: center;
          color: #4ade80;
          font-size: 0.875rem;
        }

        .cursor {
          margin-left: 0.25rem;
          display: inline-block;
          width: 8px;
          height: 16px;
          background-color: #4ade80;
          animation: blink 1s step-end infinite;
        }

        .button-group {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          justify-content: center;
          align-items: center;
        }

        @media (min-width: 640px) {
          .button-group {
            flex-direction: row;
          }
          .error-code {
            font-size: 8rem;
          }
          .main-heading {
            font-size: 2.5rem;
          }
        }

        .btn {
          padding: 0.75rem 1.5rem;
          font-weight: 600;
          border-radius: 0.5rem;
          transition: all 0.3s;
          text-decoration: none;
          font-family: 'Courier New', monospace;
          cursor: pointer;
          border: none;
          font-size: 1rem;
        }

        .btn-primary {
          background-color: #4ade80;
          color: #111827;
          box-shadow: 0 10px 25px rgba(74, 222, 128, 0.3);
        }

        .btn-primary:hover {
          background-color: #22c55e;
          transform: scale(1.05);
        }

        .btn-secondary {
          background-color: transparent;
          border: 2px solid #4ade80;
          color: #4ade80;
        }

        .btn-secondary:hover {
          background-color: #4ade80;
          color: #111827;
        }

        .footer {
          margin-top: 3rem;
          text-align: center;
          color: #6b7280;
          font-size: 0.875rem;
        }

        .footer p {
          margin-bottom: 0.5rem;
        }

        .code-snippet {
          background-color: #1f2937;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          color: #4ade80;
        }
      `}</style>

      <div className="container">
        <div className="bg-grid">
          <div className="grid-pattern" />
        </div>

        <div className="content">
          <div className="main-section">
            <h1 className={`error-code ${glitchActive ? 'glitch' : ''}`}>
              404
            </h1>
            <h2 className="main-heading">
              Oops! You made a typo... again
            </h2>
            <p className="sub-text">
              Classic developer move. We've all been there.
            </p>
          </div>

          <div className="console">
            <div className="console-header">
              <div className="console-dot dot-red"></div>
              <div className="console-dot dot-yellow"></div>
              <div className="console-dot dot-green"></div>
              <span className="console-title">terminal</span>
            </div>
            <div className="console-output">
              {consoleLines.map((line, i) => (
                <div key={i} className="console-line">
                  {line}
                </div>
              ))}
              {consoleLines.length > 0 && (
                <div className="cursor-line">
                  <span>{'>'}</span>
                  <span className="cursor" />
                </div>
              )}
            </div>
          </div>

          <div className="button-group">
            <a href="/" className="btn btn-primary">
              Go Home (The Safe Choice)
            </a>
            <button
              onClick={() => window.history.back()}
              className="btn btn-secondary"
            >
              Back to Debugging
            </button>
          </div>

          <div className="footer">
            <p>💡 Pro tip: <code className="code-snippet">Just Blame Next.js</code> We won't tell.</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;