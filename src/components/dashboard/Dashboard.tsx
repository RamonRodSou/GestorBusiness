import { Menu as MenuIcon } from "@mui/icons-material";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import "./dashboard.scss";

import { Admin } from "@domain/admin";
import {
    AppBar,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useState } from "react";
import { menuItems } from "./Menu";

export default function Dashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const admin = location.state?.admin as Admin;
    const { userId } = useParams();

    const [mobileOpen, setMobileOpen] = useState(false);
    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

    function handleListItemClick(path: string): void {
        navigate(`/dashboard/${userId}/${path}`, { state: { admin } });
        if (isMobile) setMobileOpen(false);
    }
    
    const isActive = (path: string) => location.pathname === `/dashboard/${userId}/${path}`;
    const mobileMarginTop = isMobile ? 64 : 0;

    const drawerContent = (
        <div className="menu-content">
            <Divider sx={{ backgroundColor: "rgba(255,255,255,0.3)", mb: 2 }}/>
            <List>
                {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <ListItemButton
                            selected={isActive(item.path)}
                            onClick={() => handleListItemClick(item.path)}
                            sx={{ color: "white" }}
                        >
                            <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <div className="user-info" style={{ marginTop: "auto", padding: "1rem" }}>
                <Typography variant="body2">{admin?.name || "Usuário"}</Typography>
                <Typography variant="caption">
                    {admin?.email || "email@exemplo.com"}
                </Typography>
            </div>
        </div>
    );

    return (
        <div className="dashboard-container" style={{ display: "flex" }}>
            {isMobile && (
                <AppBar position="fixed" sx={{ zIndex: 1201 }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant="h6" noWrap>
                            Painel de Controle
                        </Typography>
                    </Toolbar>
                </AppBar>
            )}

            <Drawer
                variant={isMobile ? "temporary" : "permanent"}
                open={isMobile ? mobileOpen : true}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    "& .MuiDrawer-paper": {
                        width: 240,
                        backgroundColor: "#1976d2",
                        color: "white",
                        boxSizing: "border-box",
                        },
                    }}
            >
                {drawerContent}
            </Drawer>
            <div
                className="dashboard-content"
                style={{
                    marginTop: mobileMarginTop
                }}
            >
                <Outlet
                    context={{ admin }}
                />
            </div>
        </div>
    );
}
