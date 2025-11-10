import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLongLeftIcon,
  HomeIcon,
  ArrowUpTrayIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import { toPng } from "html-to-image";

interface LocationState {
  energyType: "wind" | "solar";
  region: string;
  costPerKWh: number;
  avgConsumption: number;
  electricCostPerKWh: number;
  period: number;
  electricBillMonthly: number;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stateData, setStateData] = useState<LocationState | null>(null);
  const [loading, setLoading] = useState(true);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (location.state) {
      setStateData(location.state as LocationState);
      setLoading(false);
    } else {
      setLoading(false);
      navigate("/home");
    }
  }, [location.state, navigate]);

  if (loading) return <div>Carregando...</div>;
  if (!stateData) return null;

  const {
    energyType = "solar",
    region = "",
    costPerKWh = 0,
    electricCostPerKWh = 0,
    electricBillMonthly = 0,
    period = 1,
  } = stateData;

  const calculatedMonthlyConsumption = electricBillMonthly / electricCostPerKWh;
  const energyBillMonthlyValue = calculatedMonthlyConsumption * costPerKWh;
  const monthlySavings = electricBillMonthly - energyBillMonthlyValue;
  const validMonthlySavings = monthlySavings > 0 ? monthlySavings : 0;
  const totalSavings = validMonthlySavings * period * 12;
  const annualSavings = validMonthlySavings * 12;

  const handleDownloadPNG = async () => {
    const element = document.getElementById("content-to-pdf");
    if (!element) return;

    try {
      const scale = 3;
      const dataUrl = await toPng(element, {
        cacheBust: true,
        quality: 1,
        backgroundColor: "#000000",
        pixelRatio: scale,
      });
      const link = document.createElement("a");
      link.download = `savings-${new Date().toISOString().split("T")[0]}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Erro ao gerar imagem:", err);
    }
  };

  const handleShareWhatsApp = () => {
    const message = `Veja suas economias com energia renovável!
Total savings: R$ ${totalSavings.toFixed(1)}
Monthly savings: R$ ${validMonthlySavings.toFixed(2)}
Annual savings: R$ ${annualSavings.toFixed(2)}.`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleShareEmail = () => {
    const subject = "Savings Renewable Energy";
    const body = `Aqui estão as informações sobre seus gastos com energia renovável:

Total savings: R$ ${totalSavings.toFixed(1)}
Monthly savings: R$ ${validMonthlySavings.toFixed(2)}
Annual savings: R$ ${annualSavings.toFixed(2)}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const toggleOptions = () => setShowOptions(!showOptions);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      {/* Conteúdo a ser capturado */}
      <div
        id="content-to-pdf"
        style={{
          paddingTop: "3rem",
          paddingBottom: "2.5rem",
          paddingLeft: "4rem",
          paddingRight: "4rem",
          backgroundColor: "black",
        }}
      >
        <div className="flex flex-col items-start gap-10">
          <h1 className="text-white text-3xl md:text-4xl font-normal leading-20">
            Energy Savings Overview
          </h1>
          <span className="text-yellow-400 text-sm">
            <strong>{region}</strong>
          </span>
          <span className="italic text-gray-600 text-sm" style={{marginTop:"-2rem"}}>
            *Values are approximate and may vary
          </span>
        </div>

        <div className="flex flex-col items-center justify-center gap-6" style={{ marginTop: "1.5rem" }}>
          <div className="bg-yellow-400 w-full max-w-md rounded-md text-black flex flex-col gap-2 shadow-lg" style={{paddingTop:"1rem", paddingBottom:"1rem"}}>
            <span className="text-center font-bold">
              Total savings ({period} {period > 1 ? "years" : "year"}):
            </span>
            <span className="text-center text-blue-900 text-6xl font-extrabold">
              R${totalSavings.toFixed(1)}
            </span>
            <span className="text-gray-700 text-center">
              Monthly savings: R${validMonthlySavings.toFixed(2)}
            </span>
            <span className="text-gray-700 text-center">
              Annual savings: R${annualSavings.toFixed(2)}
            </span>
          </div>

          <div
            className="bg-black w-full max-w-3xl rounded-md text-white flex flex-col gap-6 shadow-lg mx-auto"
            style={{ padding: "1.5rem" }}
          >
            <table className="w-200 justify-center table-auto text-center">
              <thead>
                <tr>
                  <th className="border-b-2 border-white"></th>
                  <th className="text-yellow-400 border-b-2 border-white">Cost (R$/kWh)</th>
                  <th className="text-yellow-400 border-b-2 border-white">Bill (monthly)</th>
                  <th className="text-yellow-400 border-b-2 border-white">Bill ({period} years)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-yellow-400 border-b-2 border-white">Electricity energy</td>
                  <td className="border-b-2 border-white">R$ {electricCostPerKWh.toFixed(2)}</td>
                  <td className="border-b-2 border-white">R$ {electricBillMonthly.toFixed(2)}</td>
                  <td className="border-b-2 border-white">R$ {(electricBillMonthly * 12 * period).toFixed(2)}</td>
                </tr>
                <tr>
                  <td className="text-yellow-400">{energyType === "solar" ? "Solar Energy" : "Wind Energy"}</td>
                  <td>R$ {costPerKWh.toFixed(2)}</td>
                  <td>R$ {energyBillMonthlyValue.toFixed(2)}</td>
                  <td>R$ {(energyBillMonthlyValue * 12 * period).toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Botão Save centralizado fora da captura */}
      <div className="flex justify-center" style={{ marginTop: "1.5rem", marginBottom: "6rem" }}>
        <button
          onClick={() => navigate(-1)}
          className="w-50 h-12 bg-blue-900 text-white font-bold rounded-full hover:bg-green-300 transition"
        >
          Save
        </button>
      </div>

      {/* Rodapé fixo */}
      <footer className="bg-black py-3 flex justify-around items-center fixed bottom-0 left-0 w-full z-20">
        <button onClick={() => navigate(-1)}>
          <ArrowLongLeftIcon className="w-12 h-12 text-white hover:text-yellow-400 transition" />
        </button>
        <button onClick={() => navigate("/home")}>
          <HomeIcon className="w-10 h-10 text-white hover:text-yellow-400 transition" />
        </button>

        <div className="relative">
          <button onClick={toggleOptions}>
            <ArrowUpTrayIcon className="w-10 h-10 text-white hover:text-yellow-400 transition" />
          </button>

          {showOptions && (
            <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 p-4 rounded-lg shadow-lg z-30">
              <div className="flex flex-col gap-4">
                <button onClick={handleDownloadPNG} className="text-white hover:text-yellow-400 transition">
                  Download PNG
                </button>
                <button onClick={handleShareWhatsApp} className="text-white hover:text-yellow-400 transition">
                  Share WhatsApp
                </button>
                <button onClick={handleShareEmail} className="text-white hover:text-yellow-400 transition">
                  Share Email
                </button>
              </div>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
};

export default Results;
