import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLongLeftIcon, HomeIcon, Cog6ToothIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

interface LocationState {
  energyType: "wind" | "solar";
  state: string;
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (location.state) {
      setStateData(location.state as LocationState);
      setLoading(false);  // Dados carregados, setar loading para false
    } else {
      setLoading(false);  // Se não houver dados, também deve parar o carregamento
      navigate("/home");  // Redireciona para a página inicial se não houver dados
    }
  }, [location.state, navigate]);

  if (loading) {
    return <div>Carregando...</div>;  // Exibe "Carregando..." enquanto aguarda os dados
  }

  if (!stateData) {
    return null;  // Se não houver dados, evita renderizar o componente
  }

  // Desestruturando os dados de 'stateData'
  const {
    energyType = "solar",
    state = "",
    costPerKWh = 0,
    avgConsumption = 0,
    electricCostPerKWh = 0,
    electricBillMonthly = 0,
    period = 1,  // Garantir que 'period' tenha valor padrão
  } = stateData;

  // Calcular o consumo mensal de energia caso o usuário não tenha informado
  const calculatedMonthlyConsumption = electricBillMonthly / electricCostPerKWh;
  const monthlyConsumption = avgConsumption || calculatedMonthlyConsumption;

  // Cálculos de faturas e economia
  const energyBillMonthlyValue = monthlyConsumption * costPerKWh;
  const monthlySavings = electricBillMonthly - energyBillMonthlyValue;
  const validMonthlySavings = monthlySavings > 0 ? monthlySavings : 0;
  const totalSavings = validMonthlySavings * period * 12;

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <div className="relative z-10 flex flex-col items-start gap-10" 
        style={{ paddingTop: "3rem", paddingLeft: "4rem" }}
      >
        <h1 className="text-white text-3xl md:text-4xl font-normal font-helvetica leading-20 [text-shadow:-5px_3px_0px_rgb(0_0_0/_1.00)] text-left">
          Energy Savings Overview
        </h1>
        <span className="italic text-yellow-400 text-sm">
          State: <strong>{state}</strong>
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center gap-6 mt-6 px-6">
        <div className="bg-yellow-400 w-full max-w-md rounded-md p-4 text-black flex flex-col gap-2 shadow-lg">
          <span>
            Typical cost per kWh (Electricity): <strong>R${electricCostPerKWh.toFixed(2)}</strong>
          </span>
          <span>
            Typical cost per kWh ({energyType}): <strong>R${costPerKWh.toFixed(2)}</strong>
          </span>
          <span>
            Electricity bill (Monthly): <strong>R${electricBillMonthly.toFixed(2)}</strong>
          </span>
          <span>
            {energyType === "solar" ? "Solar Energy" : "Wind Energy"} bill (Monthly): <strong>R${energyBillMonthlyValue.toFixed(2)}</strong>
          </span>
          <span>
            Estimated monthly savings: <strong>R${validMonthlySavings.toFixed(2)}</strong>
          </span>

          <div className="flex flex-col mt-4">
            <label htmlFor="period" className="text-sm font-semibold">
              Period:
            </label>
            <span className="mt-2 text-black font-semibold">
              {period} {period > 1 ? "years" : "year"}
            </span>
          </div>

          <span className="mt-3">
            Estimated total savings ({period} {period > 1 ? "years" : "year"}):{" "}
            <strong>R${totalSavings.toFixed(2)}</strong>
          </span>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="w-50 h-12 bg-green-400 text-gray-900 font-bold py-3 rounded-[50px] hover:bg-green-300 transition mt-4"
          aria-label="Voltar para a página anterior"
        >
          Back
        </button>
      </div>

      <footer className="bg-black py-3 flex justify-around items-center fixed bottom-0 left-0 w-full z-20">
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

export default Results;
