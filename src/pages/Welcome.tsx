import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg-welcome.png";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div
      className="
      relative 
      min-h-screen 
      bg-cover 
      bg-center
      "
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="
      absolute 
      inset-0 
      bg-black/30">
      </div>

      {/* conteúdo canto superior-esquerdo */}
      <div className="
      relative 
      z-10 
      flex 
      flex-col 
      items-start 
      gap-6
      " 
      style={{ paddingTop: '5rem', paddingLeft: '4rem' }}
      >
      
    <div className="flex flex-col gap-30 max-w-[12ch]">
        
      {/* título */}
        <h1
          className="
            text-white
            text-6xl md:text-5xl lg:text-7xl
            font-black
            font-helvetica
            leading-20
            [text-shadow:-5px_3px_0px_rgb(0_0_0/_1.00)]
            text-left
          "
        >
          Renewable Energy Savings Calculator
        </h1>

        {/* botão centralizado horizontalmente */}
          <button
            onClick={() => navigate("/energy-type")}
            className="
              bg-yellow-400
              text-black
              font-bold
              text-[24px]
              w-[300px]
              h-[50px]
              rounded-[50px]
              flex
              items-center
              justify-center
              hover:bg-black
              hover:text-yellow-400
              transition-colors
              duration-300
            "
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
