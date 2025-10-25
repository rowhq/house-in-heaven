export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-lg flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M10.8,3.9l-6,5.1C4.3,9.5,4,10.1,4,10.8V20c0,1.1,0.9,2,2,2h5v-7h2v7h5c1.1,0,2-0.9,2-2v-9.2 c0-0.6-0.3-1.2-0.8-1.6l-6-5.1C12.5,3.4,11.5,3.4,10.8,3.9z" />
            <path d="M12,1L3,9v2l9-7.7L21,11V9L12,1z" opacity="0.7" />
          </svg>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-xl font-semibold text-gray-900 leading-tight tracking-tight">
          Eternity Estates
        </span>
        <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
          Heavenly Real Estate
        </span>
      </div>
    </div>
  );
}
