import React from "react";
import StatsCard from "./components/StatsCard";
import WelcomeSection from "./components/WelcomeSection";
import TipsSection from "./components/TipsSection";

const Dashboard = () => {

  
 return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <WelcomeSection />
        <TipsSection />
      </div>
   
  
  );
};

export default Dashboard;
