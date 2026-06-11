import { Link, useNavigate } from "react-router-dom";

const Fallback = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-primary mb-3">Coming Soon</h1>
        <p className="text-gray-500 text-lg">This page is under construction. Check back later.</p>
        <Link
          to="#"
          onClick={(e) => { e.preventDefault(); navigate(-1); }}
          className="group mt-8 inline-flex items-center gap-1.5 text-primary font-medium"
        >
          <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
            &#8592;
          </span>
          <span className="inline-block transition-transform duration-300 ease-out group-hover:scale-[1.2]">
            Go Back
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Fallback;
