import './back-button.scss'
import { Admin } from "@domain/admin";
import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type props = {
    isToHome?: boolean
}

export default function BackButton({isToHome = true}: props) {
    const { userId } = useParams();
    const location = useLocation();
    const admin = location.state?.admin as Admin;
    const navigate = useNavigate();

    function nav (path: string) {
        navigate(`/dashboard/${userId}/${path}`, { state: { admin } })
    }

    const backOrNavigate = () => {
        isToHome
            ? nav('home')
            : nav('clients');
    }

    return (
        <Tooltip className='back-button' title="Click to back page">
            <IconButton onClick={() => backOrNavigate()}>
                <ArrowBack/>
            </IconButton>
        </Tooltip>
    )
}