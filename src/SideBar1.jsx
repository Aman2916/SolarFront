import React from "react";
import { Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faChartBar,
  faCog,
  faCloud,
} from "@fortawesome/free-solid-svg-icons";
import "./App.scss"; // Custom styles

function Sidebar() {
  return (
    <div
      className="sidebar d-flex flex-column vh-100 p-3"
      style={{ backgroundColor: "#17193b" }}
    >
      <h4 className="text-white mb-4">
        <FontAwesomeIcon className="me-2" icon={faHome} />
        Dashboard
      </h4>
      <Nav className="flex-column">
        <Nav.Item className="mb-3" style={{ width: "180px" }}>
          <Nav.Link href="/dashboard" className="sidebar-item white-shade">
            <FontAwesomeIcon className="me-2" icon={faCloud} /> Weather
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-3" style={{ width: "180px" }}>
          <Nav.Link href="/analytics" className="sidebar-item white-shade">
            <FontAwesomeIcon icon={faChartBar} className="me-2" /> Analytics
          </Nav.Link>
        </Nav.Item>
        <Nav.Item className="mb-3" style={{ width: "180px" }}>
          <Nav.Link href="/settings" className="sidebar-item white-shade">
            <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </div>
  );
}

export default Sidebar;
