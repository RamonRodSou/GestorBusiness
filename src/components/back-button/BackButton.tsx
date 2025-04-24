import './back-button.scss'
import { Admin } from '@domain/user';
import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";

type props = {
    path?:  string;
}

export default function BackButton({path}: props) {
    const { userId } = useParams();
    const location = useLocation();
    const admin = location.state?.admin as Admin;
    const navigate = useNavigate();

    function nav (path: string) {
        navigate(`/dashboard/${userId}/${path}`, { state: { admin } })
    }

    const backOrNavigate = () => {
        nav( path ?? 'home')
    }

    return (
        <Tooltip title="Click to back page" className='back-button' >
            <IconButton onClick={() => backOrNavigate()}>
                <ArrowBack/>
            </IconButton>
        </Tooltip>
    )
}