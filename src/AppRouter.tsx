import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@components/login/Login';
import Dashboard from '@components/dashboard/Dashboard';
import { JSX } from '@emotion/react/jsx-runtime';
import { AuthService } from '@service/auth-service';
import Home from '@components/dashboard/pages/home/Home';
import Financial from '@components/dashboard/pages/financial/Financial';
import ServiceOrder from '@components/dashboard/pages/service-order/ServiceOrder';
import Preferences from '@components/dashboard/pages/preferences/Preferences';
import ClientDetails from '@components/dashboard/pages/client-data/client-details/ClientDetails';
import ClientData from '@components/dashboard/pages/client-data/Client-data';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard/:userId" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                    <Route path="home" element={<Home/>}/>
                    <Route path="clients" element={<ClientData/>}/>
                    <Route path="new-client" element={<ClientDetails/>}/>
                    <Route path="financial" element={<Financial/>}/>
                    <Route path="service-order" element={<ServiceOrder/>}/>
                    <Route path="preferences" element={<Preferences/>}/>
                </Route>
                <Route path="*" element={<Navigate to="/login"/>}/>
            </Routes>
        </BrowserRouter>
    );
}

function ProtectedRoute({ children }: { children: JSX.Element }) {
    if (!AuthService.isAuthenticated()) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

export default AppRouter;