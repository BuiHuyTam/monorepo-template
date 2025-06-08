export default function Logo() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-full p-3 mb-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#c24742" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-white">Pomofocus</h1>
    </div>
  );
} 