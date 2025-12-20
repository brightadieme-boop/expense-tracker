import React from "react";
import { PieChartIcon, Wallet, ArrowRight } from "lucide-react";
import "./Landing.css";

import AnimatedBackground from "../components/AnimatedBackground";
import "../components/animatedBackground.css";

export default function Landing() {
    return (
      <>
     
        <div className="landing-container">

            {/* Floating icon  */}
            <div className="floating-icon icon1"></div>
            <div className="floating-icon icon2"><Wallet size={30} /></div>

            {/* Main Hero  */}
            <div className="landing-hero">
                <h1 className="landing-title">Stay On Track. Spend Responsibly.</h1>
                <p className="landing-subtitle">
                    Discover and manage your net worth starting TODAY!
                </p>
                <button
                  className="landing-btn"
                  onClick={() => (window.location.href = "/login")}
                >
                    Get Started <ArrowRight size={18} />
                </button>
            </div>
        </div>
      </>
    );
}