import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '@components/login/Login';
import Dashboard from '@components/dashboard/Dashboard';
import { JSX } from '@emotion/react/jsx-runtime';
import { AuthService } from '@service/auth-service';
import Home from '@components/dashboard/pages/home/Home';
import Preferences from '@components/dashboard/pages/preferences/Preferences';
import ClientDetails from '@components/dashboard/pages/client-data/client-details/ClientDetails';
import ClientData from '@components/dashboard/pages/client-data/Client-data';
import FinancialData from '@components/dashboard/pages/financial-data/FinancialData';
import FinancialDetails from '@components/dashboard/pages/financial-data/financial-details/financial-details';
import ServiceOrderData from '@components/dashboard/pages/service-order-data/ServiceOrderData';
import ServiceOrderDetails from '@components/dashboard/pages/service-order-data/service-order-details/ServiceOrderDetails';
import CollaboratorData from '@components/dashboard/pages/collaborator-data/CollaboratorData';
import CollaboratorDetails from '@components/dashboard/pages/collaborator-data/collaborator-details/CollaboratorDetails';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/dashboard/:userId" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}>
                    <Route path="home" element={<Home/>}/>
                    <Route path="clients" element={<ClientData/>}/>
                    <Route path="collaborator" element={<CollaboratorData/>}/>
                    <Route path="new-collaborator" element={<CollaboratorDetails/>}/>
                    <Route path="new-client" element={<ClientDetails/>}/>
                    <Route path="financial" element={<FinancialData/>}/>
                    <Route path="add-financial" element={<FinancialDetails/>}/>
                    <Route path="service-order" element={<ServiceOrderData/>}/>
                    <Route path="add-service" element={<ServiceOrderDetails/>}/>
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