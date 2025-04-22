import { ManagerContext } from "@context/ManagerContext";
import { TextField } from "@mui/material";
import { useContext, useEffect } from "react";

type SearchProps<T extends { name: string }> = {
    data: T[];
    onFilter: (filtered: T[]) => void;
};

export default function Search<T extends { name: string }>({ data, onFilter }: SearchProps<T>) {
    const { searchTerm, setSearchTerm } = useContext(ManagerContext);

    useEffect(() => {
        const filtered = data.filter((it) =>
            it.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        onFilter(filtered);
    }, [searchTerm, data]);

    return (
        <TextField
            className="search-input"
            variant="outlined"
            label="Buscar cliente"
            color='primary'
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{ marginBottom: '1rem' }}
        />
    );
}
