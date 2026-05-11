import { Download } from "lucide-react";

const ResultsHeader = ({ count = 0, onDownload }) => {
  return (
    <div className="flex items-center justify-between mb-4 mt-2">
      <div className="text-[14px] text-gray-700 font-medium">
        Search results ({count})
      </div>
      {onDownload && (
        <div 
          onClick={onDownload}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#1EB04C] hover:text-white hover:border-[#1EB04C] transition-all cursor-pointer shadow-sm"
        >
          <Download size={16} />
        </div>
      )}
    </div>
  );
};

export default ResultsHeader;
