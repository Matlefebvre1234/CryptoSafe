import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { StyledEngineProvider } from "@mui/material/styles";
import web3Context from "./Context/web3Context";
import { useRef } from "react";

function App() {
  const address = useRef();
  const connected = useRef();
  const web3Enable = useRef();
  const provider = useRef();

  const web3state = {
    address: address,
    connected: connected,
    web3Enable: web3Enable,
    provider: provider,
  };

  return (
    <StyledEngineProvider injectFirst>
      <web3Context.Provider value={web3state}>
        <Router>
          <Routes>
            <Route path="/" element={<Home></Home>} />
          </Routes>
        </Router>
      </web3Context.Provider>
    </StyledEngineProvider>
  );
}

export default App;
