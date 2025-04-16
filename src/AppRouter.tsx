import Dashboard from "@components/dashboard/Dashboard";
import Login from "@components/login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login/>} />
                <Route path="/dashboard/:userId" element={<Dashboard/>} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter
