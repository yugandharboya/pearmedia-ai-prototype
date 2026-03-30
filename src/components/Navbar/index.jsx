import "./index.css";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="navbar">
      <h2 className="logo">Pear Media AI</h2>
      <div className="tabs">
        <button
          className={activeTab === "text" ? "active" : ""}
          onClick={() => setActiveTab("text")}
        >
          Text Workflow
        </button>
        <button
          className={activeTab === "image" ? "active" : ""}
          onClick={() => setActiveTab("image")}
        >
          Image Workflow
        </button>
      </div>
    </div>
  );
};

export default Navbar;
