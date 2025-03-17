export function WelcomeMessage() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
      <svg
        className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
      <h2 className="text-xl font-semibold mb-2">Welcome to PIC Designer</h2>
      <p className="max-w-md">
        Start by describing your PIC circuit requirements. Our AI will help you design and optimize your circuit.
      </p>
    </div>
  );
} 