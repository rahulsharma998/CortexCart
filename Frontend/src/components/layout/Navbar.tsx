import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
      <h1 className="font-semibold text-lg">CortexCart</h1>

      <button
        onClick={() => navigate("/auth")}
        className="text-sm bg-primary text-primary-foreground px-4 py-1.5 rounded-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
