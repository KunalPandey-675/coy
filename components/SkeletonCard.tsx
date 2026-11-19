'use client';

export default function SkeletonCard() {
  return (
    <div className="w-full h-full bg-white rounded-[2.2rem] border-2 border-gray-200 shadow-lg overflow-hidden flex flex-col animate-pulse">
      {}
      <div className="relative h-[320px] w-full bg-gray-200 flex-shrink-0" />

      {}
      <div className="flex-1 p-5 space-y-3">
        {}
        <div className="h-7 bg-gray-200 rounded-lg w-2/3" />
        
        {}
        <div className="h-4 bg-gray-200 rounded w-1/2" />
        
        {}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded w-full" />
          <div className="h-3 bg-gray-200 rounded w-4/5" />
        </div>
        
        {}
        <div className="flex flex-wrap gap-2 pt-2">
          <div className="h-6 w-16 bg-gray-200 rounded-full" />
          <div className="h-6 w-20 bg-gray-200 rounded-full" />
          <div className="h-6 w-24 bg-gray-200 rounded-full" />
        </div>
      </div>
    </div>
  );
}
