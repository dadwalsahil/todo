import React from "react";
import { Container, Navbar } from "react-bootstrap";
function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="http://localhost:3000/login">
            JOSHTALKS (Create your own TODO List){" "}
          </Navbar.Brand>
          <button className="white_btn" onClick={handleLogout}>
            Logout
          </button>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
