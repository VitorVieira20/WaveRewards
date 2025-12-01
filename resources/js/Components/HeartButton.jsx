import HeartIconFilled from "./Icons/HeartIconFilled";
import HeartIconOutline from "./Icons/HeartIconOutlined";

export default function HeartButton({ isLiked, onClick }) {
    return (
        <button 
            onClick={onClick} 
            className="hover:scale-110 transition-transform duration-200 cursor-pointer"
        >
            {isLiked ? <HeartIconFilled /> : <HeartIconOutline />}
        </button>
    );
}