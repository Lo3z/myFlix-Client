import {createRoot} from 'react-dom/client';

// Import statement to indicate './index.scss' will be bundled
import "./index.scss";

// Main component (will eventually use all the others)
const MyFlixApplication = () => {
  return (
    <div className="my-flix">
        <div>Good morning</div>
    </div>
  );
};

// Finds root of app
const container = document.querySelector("#root");
const root = createRoot(container);

//Tells React to render app in root DOM element
root.render(<MyFlixApplication/>);