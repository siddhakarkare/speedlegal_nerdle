// import logo from './icon.svg';
import './App.css';
import {Navbar, Nav, Container } from 'react-bootstrap'
import Settings from './Settings'
import GameGrid from './GameGrid';
import {  Route, BrowserRouter as Router, Routes } from 'react-router-dom'

function App() {
  
  return (
    <div className="App">
      <Router>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Nerdle ++</Navbar.Brand>
            
            <Nav className="me-auto">
              <Nav.Link to="/settings">Settings</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        

        <GameGrid>

        </GameGrid>


        <Routes>
          <Route path="/settings" component={Settings} ></Route> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
