export default function RightArrowIcon({ color = "white", size = 20 }) {

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.5391 1L18.9999 9.46087L10.5391 17.9217" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1.00009 9.46086L19 9.46086" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}