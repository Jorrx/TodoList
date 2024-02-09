import { IconButton, Menu, MenuItem } from '@mui/material';
import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface IProp {
    onEdit: () => void
    onRemove: () => void
}

const TodoItemMenu = ({ onEdit, onRemove }: IProp) => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };



    return (
        <>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <MoreVertIcon />
            </IconButton>   
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={onRemove} sx={{color:"red"}}>
                    Delete
                </MenuItem>
                <MenuItem onClick={onEdit}>
                    Edit
                </MenuItem>
            </Menu>
        </>
    )
}

export default TodoItemMenu
