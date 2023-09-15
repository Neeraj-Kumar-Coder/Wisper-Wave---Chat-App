import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage";

function App() {
    return (
        <div className="app">
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<LandingPage />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
