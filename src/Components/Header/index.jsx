import { Button } from "@mui/material";
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import React from "react";
import { FaRegBell } from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


const Header = () => {
    return (
        <><header className='w-full h-[50px] pl-52 pr-7 bg-[#f1f1f1] flex items-center justify-between'>
            <div className='part1'>
                <Button className="!w-[40px] !h-[40px] !rounded-full !min-w-[40px] !text-[rgba(0,0,0,0.8)]">
                    <RiMenu2Line className="text-[18px] text-[rgba(0,0,0,0.8)]" />
                </Button>
            </div>


            <div className='part2 w-[40%] flex items-center justify-end gap-3'>
                <IconButton aria-label="cart">
                    <StyledBadge badgeContent={4} color="secondary">
                        <FaRegBell />
                    </StyledBadge>
                </IconButton>

                <div className="rounded-full w-[30px] h-[40px] overflow-hidden cursor-pointer">
                    <img src="data:image/jpeg;base64,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" className="w-full h-full object-cover" />
                </div>
            </div>
        </header>
        </>
    )
}

export default Header;