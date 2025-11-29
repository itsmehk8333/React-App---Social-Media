import { useState } from "react";
import { FiHome, FiBell, FiBookmark, FiUser } from "react-icons/fi"; // yarn add react-icons
import "./Navbar.css"



function Navbar() {
    const [active, setActive] = useState("home");

    const items = [
        { id: "home", icon: FiHome },
        { id: "bell", icon: FiBell },
        { id: "bookmark", icon: FiBookmark },
        { id: "user", icon: FiUser },
    ];

    return (
        <header className="tm-header">
            <div className="tm-logo">TravelMedia.in</div>

            <nav className="tm-nav-pill">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.id;

                    return (
                        <button
                            key={item.id}
                            className={`tm-nav-icon ${isActive ? "tm-nav-icon--active" : ""}`}
                            onClick={() => setActive(item.id)}
                        >
                            <Icon className="tm-nav-icon-svg" />
                            {isActive && <span className="tm-nav-dot" />}
                        </button>
                    );
                })}
            </nav>
        </header>
    );
}

export default Navbar;
