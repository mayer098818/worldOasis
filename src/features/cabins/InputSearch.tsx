import { IconButton, InputBase, Paper } from "@mui/material"
import { SearchIcon } from "lucide-react"

const InputSearch = () => {
    return (
        <Paper
            component="form"
            sx={{
                p: '4px 8px',
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
            />
            <IconButton>
                <SearchIcon />
            </IconButton>
        </Paper>
    )
}
export default InputSearch