import React from 'react'
import { Button } from "@mui/material";
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Image from '../Image/Image';
import CommonEmptyStatus from '../CommonEmptyStatus/CommonEmptyStatus';
function ProfileTooltip({ image, name, children, isActive = true }) {
    //g params: image, name, children to cover with, isActive

    const HtmlTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: "transparent",
            color: 'rgba(0, 0, 0, 0.87)',
            maxWidth: 220,
            fontSize: theme.typography.pxToRem(12),
            // border: '1px solid #dadde9',
        },
    }));
    return (
        <>
            <HtmlTooltip

                placement="top"
                title={
                    <>
                        {isActive ? <div className="flex items-center bg-white shadow-md p-s10 rounded-br10">
                            <Image className="rounded-full h-s44 w-s44" src={image} />
                            <div className="font-semibold text-fs16 px-s10">{name ?? 
                            <CommonEmptyStatus size="text-fs16"fontWeight="font-semibold"   />}</div>
                        </div> : ""}
                    </>
                }
            >
                <Button>{children}</Button>
            </HtmlTooltip>
        </>
    )
}

export default ProfileTooltip