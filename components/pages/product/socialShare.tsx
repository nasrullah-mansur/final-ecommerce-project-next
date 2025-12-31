"use client";

import {
    FacebookIcon,
    FacebookShareButton,
    LinkedinShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    XIcon,
} from "react-share";

const shareUrl = "http://github.com";

export default function SocialShare() {
    return (
        <div className="flex items-center gap-x-2">
            <span>Share: </span>
            <div>

                <FacebookShareButton
                    url={shareUrl}
                >
                    <FacebookIcon size={32} round />
                </FacebookShareButton>
            </div>

            <div>
                <TwitterShareButton
                    url={shareUrl}
                    title={"this is title"}
                >
                    <XIcon size={32} round />
                </TwitterShareButton>
            </div>
        </div>
    )
}
