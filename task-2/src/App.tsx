import { Route, Routes } from "react-router-dom";
import { WagmiConfig, createConfig, configureChains, mainnet } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import Home from './pages/Home';
const { publicClient, webSocketPublicClient } = configureChains(
  [mainnet],
  [publicProvider()]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

function App() {

  return (
    <>
    <WagmiConfig config={config}>
       <Routes>
           <Route path="/" element={<Home/>} />
       </Routes>
     </WagmiConfig>
   </>
  )
}

export default App
