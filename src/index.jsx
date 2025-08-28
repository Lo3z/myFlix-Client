import {createRoot} from 'react-dom/client';
import {MainView} from "./Components/MainView/main-view";
import Container from "react-bootstrap/Container";

// Import statement to indicate './index.scss' will be bundled
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <Container>
      <MainView/>
    </Container>
  );
};

// Finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render app in root DOM element
root.render(<MyFlixApplication/>);