import { memo } from "react";


function ContentSection( {title, icon, children} ) {
  return (
    <div className="mb-12">
      <div className="flex justify-between items-center text-white mb-8">
        <h1 className="text-2xl font-extrabold flex items-center"> {icon} {title}</h1>
        <div className="bg-slate-600 h-px grow mx-4"></div>
        <h4 className="text-sm text-slate-300">See More</h4>
      </div>
      {children}
    </div>
  );
}

export default memo(ContentSection);