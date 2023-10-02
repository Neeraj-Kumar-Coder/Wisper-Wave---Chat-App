import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import ChatProvider from "./contexts/ChatProvider";
import Chats from "./components/Chats";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <ChatProvider>
                    <Routes>
                        <Route exact path="/" element={<LandingPage />}></Route>
                        <Route exact path="/chats" element={<Chats />}></Route>
                    </Routes>
                </ChatProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
