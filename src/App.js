import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { StyledEngineProvider } from "@mui/material/styles";
import web3Context from "./Context/web3Context";
import { useRef, useState } from "react";
import Dashboard from "./pages/Dashboard";

function App() {
  const ref_address = useRef();
  const ref_connected = useRef();
  const ref_web3Enable = useRef();
  const ref_provider = useRef();
  const ref_explorer = useRef();
  const ref_encryptionPubKey = useRef();

  const [state_address,setAddress] = useState();
  const [state_connected,setConnected] = useState();
  const [state_web3Enable,setWeb3Enable] = useState();
  const [state_provider, setProvider] = useState();

  const web3state = {
    ref_address: ref_address,
    ref_connected: ref_connected,
    ref_web3Enable: ref_web3Enable,
    ref_provider: ref_provider,
    ref_explorer:ref_explorer,
    ref_encryptionPubKey: ref_encryptionPubKey,
    state_address: state_address,
    state_connected: state_connected,
    state_web3Enable: state_web3Enable,
    state_provider: state_provider,

    setAddress: setAddress,
    setConnected: setConnected,
    setWeb3Enable: setWeb3Enable,
    setProvider: setProvider,


  };

  return (
    <StyledEngineProvider injectFirst>
      <web3Context.Provider value={web3state}>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard></Dashboard>} />
          </Routes>
        </Router>
      </web3Context.Provider>
    </StyledEngineProvider>
  );
}

export default App;
