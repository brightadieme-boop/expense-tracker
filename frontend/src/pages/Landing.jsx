import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div style={styles.container}>
      {/* --- HERO SECTION --- */}
      <div style={styles.heroSection}>
        <div style={styles.heroContent}>
          <h1 style={{ ...styles.title, ...styles.fadeInUp }}>
            Discover Your Net Worth <br />
            <span style={styles.highlight}>Plan Wiser Without Stress.</span>
          </h1>
          <p style={{ ...styles.subtitle, ...styles.fadeInUpDelay }}>
            Track every penny, set budgets, and watch your savings grow.
            Simple, secure, and built for you.
          </p>
          
          <div style={{ ...styles.buttonGroup, ...styles.fadeInUpDelay2 }}>
            <Link to="/register" style={styles.primaryBtn}>Start Now!</Link>
            <Link to="/login" style={styles.secondaryBtn}>Login</Link>
          </div>
        </div>
      </div>

      {/* --- FEATURES SECTION --- */}
      <div style={styles.featuresSection}>
        <h2 style={styles.sectionTitle}>Why MoniTrackr?</h2>
        <div style={styles.featureGrid}>
          <div style={styles.featureCard}>
            <div style={styles.icon}>🚀</div>
            <h3>Fast & Simple</h3>
            <p>Log expenses in seconds. No complicated menus.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.icon}>🔒</div>
            <h3>Secure Data</h3>
            <p>Your financial data is yours. We keep it safe.</p>
          </div>
          <div style={styles.featureCard}>
            <div style={styles.icon}>📊</div>
            <h3>Smart Analytics</h3>
            <p>See exactly where your money goes every month.</p>
          </div>
        </div>
      </div>

      {/* --- FOOTER --- */}
      <footer style={styles.footer}>
        <p>&copy; 2025 MoniTrackr. Built by Bright.</p>
      </footer>

      {/* INJECT ANIMATION STYLES */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </div>
  );
};

// --- STYLES ---
const styles = {
  container: {
    fontFamily: "'Inter', sans-serif",
    color: "#333",
    overflowX: "hidden",
  },
  // Hero
  heroSection: {
    background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)", // Dark modern gradient
    color: "white",
    height: "80vh", // Takes up 80% of the screen
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
  },
  heroContent: { maxWidth: "800px" },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    marginBottom: "20px",
    lineHeight: "1.2",
    animation: "fadeInUp 0.8s ease-out forwards",
  },
  highlight: { color: "#34d399" }, // Money Green
  subtitle: {
    fontSize: "1.25rem",
    color: "#9ca3af",
    marginBottom: "40px",
    opacity: 0, // Start hidden for animation
    animation: "fadeInUp 0.8s ease-out 0.3s forwards", // 0.3s delay
  },
  buttonGroup: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    opacity: 0,
    animation: "fadeInUp 0.8s ease-out 0.6s forwards", // 0.6s delay
  },
  primaryBtn: {
    padding: "15px 30px",
    backgroundColor: "#34d399",
    color: "#1f2937",
    fontWeight: "bold",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.1rem",
    transition: "transform 0.2s",
  },
  secondaryBtn: {
    padding: "15px 30px",
    border: "2px solid #374151",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "1.1rem",
  },
  
  // Features
  featuresSection: {
    padding: "80px 20px",
    backgroundColor: "#f9fafb",
    textAlign: "center",
  },
  sectionTitle: { fontSize: "2.5rem", marginBottom: "50px", color: "#1f2937" },
  featureGrid: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    flexWrap: "wrap",
  },
  featureCard: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
    width: "300px",
    textAlign: "left",
  },
  icon: { fontSize: "3rem", marginBottom: "15px" },
  
  // Footer
  footer: {
    padding: "20px",
    textAlign: "center",
    backgroundColor: "#111827",
    color: "#6b7280",
    fontSize: "0.9rem",
  },
  
  // Animation Helper Objects
  fadeInUp: { animation: "fadeInUp 0.8s ease-out forwards" },
  fadeInUpDelay: { animation: "fadeInUp 0.8s ease-out 0.3s forwards" },
  fadeInUpDelay2: { animation: "fadeInUp 0.8s ease-out 0.6s forwards" },
};

export default LandingPage;