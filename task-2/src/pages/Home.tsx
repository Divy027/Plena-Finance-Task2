import { ToastContainer } from "react-toastify";
import Header from "../components/Header";
import 'react-toastify/dist/ReactToastify.css';
import { CallSupply } from "../services";
const Home = () => {
    return (
        <>  
        <Header/>
        <ToastContainer/>
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-red-500 font-bold text-4xl mb-4">Aave Protocol(V3) Supply Caller on Polygon Mumbai testnet</h1>
            <button 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={async ()=>  await CallSupply()}
             >
                Supply 10 DAI
            </button>
        </div> 
        </>
    )
}
export default Home;