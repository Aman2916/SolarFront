import React from "react";
import { Container, Row, Col, Nav, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartBar, faCog } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import InteractiveMap from "./svg.jsx";
import WorldMap from "./WorldMap";
import WeatherIrradiance from "./WeatherIrradiance";
function SideBar() {
  return (
    <Container fluid>
      <Row>
        {/* Sidebar Column */}
        <Col xs={2} className="p-0">
          <div
            className="sidebar vh-100 p-3"
            style={{ backgroundColor: "#17193b" }}
          >
            <h5 className="text-white mb-4">
              <FontAwesomeIcon className="me-2" icon={faHome} />
              Dashboard
            </h5>
            <Nav className="flex-column">
              <Nav.Item className="mb-3">
                <Nav.Link href="/dashboard" className="sidebar-item text-white">
                  <FontAwesomeIcon icon={faHome} className="me-2" /> Dashboard
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-3">
                <Nav.Link href="/analytics" className="sidebar-item text-white">
                  <FontAwesomeIcon icon={faChartBar} className="me-2" />{" "}
                  Analytics
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className="mb-3">
                <Nav.Link href="/settings" className="sidebar-item text-white">
                  <FontAwesomeIcon icon={faCog} className="me-2" /> Settings
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </Col>

        {/* Main Content Column */}
        <Col
          xs={10}
          className="content-area"
          style={{ backgroundColor: "#17193b" }}
        >
          <div className="p-4">
            <h2>Welcome to the Dashboard</h2>
            <WorldMap />
            <WeatherIrradiance />
            {/* You can add more content here */}
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default SideBar;
