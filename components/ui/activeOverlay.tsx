

export default function ActiveOverlay({ isActive, onClick }: { isActive: boolean, onClick: () => void; }) {
    return (
        <>
            {isActive && <div onClick={onClick} className="w-full h-screen fixed top-0 left-0 z-1 " />}
        </>
    )
}
