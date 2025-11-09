import { AiOutlineProduct } from "react-icons/ai";

export default function Header() {
  
  return (
    <div className="bg-purple-200 flex items-center justify-center gap-2 h-[124px]"style={{ backgroundColor: "#240046" }}>
      <AiOutlineProduct fontSize="40px" style={{color : "#FFB703" }} />
      <span className="text-4xl font-bold text-center"
      style={{ color: "#FFB703" }}>Product</span>
    </div>
  );
}
