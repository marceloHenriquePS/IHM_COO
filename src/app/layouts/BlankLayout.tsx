import { useState } from "react";
import { Outlet } from "react-router-dom";
import { ScreenNoticeModal } from "@/shared/components/ScreenNoticeModal/ScrennNoticeModal";

const SCREEN_NOTICE_KEY = "coo-screen-notice-seen";

export function BlankLayout() {
    const [noticeOpen, setNoticeOpen] = useState(
        () => localStorage.getItem(SCREEN_NOTICE_KEY) !== "true"
    );

    function closeNotice() {
        localStorage.setItem(SCREEN_NOTICE_KEY, "true");
        setNoticeOpen(false);
    }

    return (
        <>
            <Outlet />

            <ScreenNoticeModal
                open={noticeOpen}
                onClose={closeNotice}
            />
        </>
    );
}