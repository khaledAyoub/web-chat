import Profile from "@/components/profileSection/Profile.jsx";
import "./settings.css";
import Sidebar from "@/components/mainSections/SideBar";

const Settings = () => {
  return (
    <div className="body">
      <main>
        <Sidebar />
        <Profile />
      </main>
    </div>
  );
};

export default Settings;
