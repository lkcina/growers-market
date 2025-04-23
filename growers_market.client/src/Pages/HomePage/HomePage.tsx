import React from 'react';
import "./HomePage.css";
import { Link } from 'react-router-dom';


const HomePage: React.FC = () => {
    return (
        <div id="home-page">
            <video src="/src/assets/Videos/Growers_Market_Hero.mp4" controls={false} autoPlay loop muted></video>
            <h2>Trade. Share. Grow.</h2>
            <p>Join a community of plant enthusiasts today!</p>
            <Link to="/register">Get Started</Link>
        </div>
    );
};

export default HomePage;