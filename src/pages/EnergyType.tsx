import { useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon, Cog6ToothIcon, InformationCircleIcon, HomeIcon } from '@heroicons/react/24/outline';
import solarImage from '../assets/solar.png';
import windImage from '../assets/wind.png';


const EnergyType = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      {/* Cabeçalho */}
      <div className="relative z-10 flex flex-col items-start gap-10"
      style={{ paddingTop: "3rem", paddingLeft: '4rem' }}
      >
        <h1 className="text-white text-3xl md:text-4xl font-normal font-helvetica leading-20 [text-shadow:-5px_3px_0px_rgb(0_0_0/_1.00)] text-left">
          Choose Your Energy Source
        </h1>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-30">
          {/* Botão Wind */}
          <button
            onClick={() => navigate("/data", { state: { energyType: "wind" } })}
            className="bg-yellow-400 text-black font-bold w-[300px] h-[150px] rounded-md hover:bg-yellow-300 transition flex items-center justify-between text-xl"
          >
            <span style={{ marginLeft: "4rem"}}>Wind</span>
            <img src={windImage} alt="wind energy" className="right-4 h-30" />
          </button>

          {/* Botão Solar */}
          <button
            onClick={() => navigate("/data", { state: { energyType: "solar" } })}
            className="bg-yellow-400 text-black font-bold w-[300px] h-[150px] rounded-md hover:bg-yellow-300 transition flex items-center justify-between text-xl"
          >
            <span style={{ marginLeft: "4rem"}}>Solar</span>
            <img src={solarImage} alt="solar energy" className="right-4 h-30" />
          </button>
        </div>
      </div>

      {/* Menu inferior */}
      <footer className="bg-black py-3 flex justify-around items-center fixed bottom-0 left-0 w-full">
        <button onClick={() => navigate(-1)}>
          <ArrowLongLeftIcon className="w-10 h-10 text-white hover:text-yellow-400 transition" />
        </button>
        <button onClick={() => navigate("/settings")}>
          <Cog6ToothIcon className="w-6 h-6 text-white hover:text-yellow-400 transition" />
        </button>
        <button onClick={() => navigate("/profile")}>
          <InformationCircleIcon className="w-6 h-6 text-white hover:text-yellow-400 transition" />
        </button>
        <button onClick={() => navigate("/home")}>
          <HomeIcon className="w-6 h-6 text-white hover:text-yellow-400 transition" />
        </button>
      </footer>
    </div>
  );
};

export default EnergyType;
