import { ToastContainer } from 'react-toastify';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Components/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { UserProvider } from './Context/UseAuth';


function App() {
    

    return (
        <UserProvider>
            <Navbar />
            <Outlet />
            <ToastContainer />
        </UserProvider>
    );
}

export default App;