import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ArrowLongLeftIcon,
  Cog6ToothIcon,
  InformationCircleIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";

interface AvgData {
  [key: string]: {
    [region: string]: { costPerKWh: number };
  };
}

// Valores aproximados por estado
const avgElectricData: { [state: string]: number } = {
  Acre: 0.791,
  Alagoas: 0.863,
  Amapá: 0.808,
  Amazonas: 0.857,
  Bahia: 0.821,
  Ceará: 0.722,
  "Distrito Federal": 0.743,
  "Espírito Santo": 0.682,
  Goiás: 0.745,
  Maranhão: 0.711,
  "Mato Grosso": 0.847,
  "Mato Grosso do Sul": 0.870,
  "Minas Gerais": 0.796,
  Pará: 0.938,
  Paraíba: 0.588,
  Paraná: 0.629,
  Pernambuco: 0.744,
  Piauí: 0.829,
  "Rio de Janeiro": 0.870,
  "Rio Grande do Norte": 0.722,
  "Rio Grande do Sul": 0.701,
  Rondônia: 0.727,
  Roraima: 0.661,
  "Santa Catarina": 0.618,
  "São Paulo": 0.671,
  Sergipe: 0.666,
  Tocantins: 0.823,
};

/// Dados por tipo de energia (eólica e solar) - valores ajustados para o preço final ao consumidor
const avgData: AvgData = {
  wind: {
    Acre: { costPerKWh: 0.55 },
    Alagoas: { costPerKWh: 0.60 },
    Amapá: { costPerKWh: 0.56 },
    Amazonas: { costPerKWh: 0.60 },
    Bahia: { costPerKWh: 0.58 },
    Ceará: { costPerKWh: 0.50 },
    "Distrito Federal": { costPerKWh: 0.52 },
    "Espírito Santo": { costPerKWh: 0.48 },
    Goiás: { costPerKWh: 0.52 },
    Maranhão: { costPerKWh: 0.50 },
    "Mato Grosso": { costPerKWh: 0.59 },
    "Mato Grosso do Sul": { costPerKWh: 0.61 },
    "Minas Gerais": { costPerKWh: 0.56 },
    Pará: { costPerKWh: 0.69 },
    Paraíba: { costPerKWh: 0.41 },
    Paraná: { costPerKWh: 0.44 },
    Pernambuco: { costPerKWh: 0.52 },
    Piauí: { costPerKWh: 0.58 },
    "Rio de Janeiro": { costPerKWh: 0.61 },
    "Rio Grande do Norte": { costPerKWh: 0.50 },
    "Rio Grande do Sul": { costPerKWh: 0.49 },
    Rondônia: { costPerKWh: 0.51 },
    Roraima: { costPerKWh: 0.47 },
    "Santa Catarina": { costPerKWh: 0.43 },
    "São Paulo": { costPerKWh: 0.47 },
    Sergipe: { costPerKWh: 0.46 },
    Tocantins: { costPerKWh: 0.58 },
  },
  solar: {
    Acre: { costPerKWh: 0.59 },
    Alagoas: { costPerKWh: 0.65 },
    Amapá: { costPerKWh: 0.61 },
    Amazonas: { costPerKWh: 0.64 },
    Bahia: { costPerKWh: 0.62 },
    Ceará: { costPerKWh: 0.54 },
    "Distrito Federal": { costPerKWh: 0.56 },
    "Espírito Santo": { costPerKWh: 0.50 },
    Goiás: { costPerKWh: 0.56 },
    Maranhão: { costPerKWh: 0.53 },
    "Mato Grosso": { costPerKWh: 0.60 },
    "Mato Grosso do Sul": { costPerKWh: 0.62 },
    "Minas Gerais": { costPerKWh: 0.58 },
    Pará: { costPerKWh: 0.70 },
    Paraíba: { costPerKWh: 0.44 },
    Paraná: { costPerKWh: 0.47 },
    Pernambuco: { costPerKWh: 0.56 },
    Piauí: { costPerKWh: 0.58 },
    "Rio de Janeiro": { costPerKWh: 0.61 },
    "Rio Grande do Norte": { costPerKWh: 0.54 },
    "Rio Grande do Sul": { costPerKWh: 0.50 },
    Rondônia: { costPerKWh: 0.61 },
    Roraima: { costPerKWh: 0.63 },
    "Santa Catarina": { costPerKWh: 0.50 },
    "São Paulo": { costPerKWh: 0.53 },
    Sergipe: { costPerKWh: 0.50 },
    Tocantins: { costPerKWh: 0.61 },
  },
};


const DataInput = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { energyType?: "wind" | "solar" };

  if (!state?.energyType) {
    navigate("/home");
    return null;
  }

  const { energyType } = state;
  const [region, setRegion] = useState("Rio de Janeiro");

  const { costPerKWh } = avgData[energyType][region];
  const electricCostPerKWh = avgElectricData[region];

  const [formData, setFormData] = useState({
    electricBillMonthly: "",
    period: "",
    monthlyConsumption: "",
  });

  const handleInputChange = (key: string, value: string) => {
    if (/^\d*\.?\d*$/.test(value)) {
      setFormData((prev) => ({ ...prev, [key]: value }));
    }
  };

 const handleCalculate = () => {
  if (!formData.electricBillMonthly || !formData.period) {
    alert("Please fill in the monthly cost and the period.");
    return;
  }

  const electricBill = parseFloat(formData.electricBillMonthly);
  const period = parseInt(formData.period, 10);

  if (isNaN(electricBill) || isNaN(period)) {
    alert("Please enter valid numeric values for the monthly cost and period.");
    return;
  }

  if (!costPerKWh || !electricCostPerKWh) {
    alert("Missing required data for calculation.");
    return;
  }

  navigate("/results", {
    state: {
      energyType,
      costPerKWh,
      electricBillMonthly: electricBill, // Passando o valor correto
      period: period,
      electricCostPerKWh,
      monthlyConsumption: formData.monthlyConsumption,
    },
  });
};

  const inputFields = [
    { key: "electricBillMonthly", label: "Monthly electricity cost (R$)", placeholder: "Enter the monthly cost", required: true },
    { key: "period", label: "Period (years)", placeholder: "Enter the period", required: true },
    { key: "monthlyConsumption", label: "Monthly Consumption", placeholder: "Enter monthly consumption (optional)", required: false },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-black text-white relative">
      <div className="relative z-10 flex flex-col items-start gap-10" style={{ paddingTop: "3rem", paddingLeft: '4rem', paddingBottom:'3rem' }}>
        <h1 className="text-white text-3xl md:text-4xl font-normal font-helvetica leading-20 [text-shadow:-5px_3px_0px_rgb(0_0_0/_1.00)] text-left" style={{ marginBottom: '-15px'}}>
          Input Your Energy Information
        </h1>
      </div>

      <div className="flex flex-col md:flex-row gap-6" style={{ paddingLeft: "4rem", paddingBottom: "1rem" }}>
        <div className="flex flex-col gap-6 w-full md:w-1/2">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="p-2 rounded-md bg-neutral-900 text-yellow-400 w-48 h-10"
          >
            {Object.keys(avgData[energyType]).map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-10 w-full z-10 relative" style={{marginTop: "40px"}} >
        {inputFields.map((field) => (
          <div key={field.key} className="w-full max-w-md flex flex-col items-center bg-yellow-400 rounded-md p-2">
            <label className="text-center text-black font-bold mb-1">{field.label}</label>
            <input
              type="text"
              placeholder={field.placeholder}
              value={formData[field.key as keyof typeof formData]}
              onChange={(e) => handleInputChange(field.key, e.target.value)}
              className="w-full h-10 p-3 rounded-md text-black text-center"
              style={{ outline: "none" }}
            />
          </div>
        ))}

        <button
          onClick={handleCalculate}
          className="w-50 h-10 bg-gray-800 text-white font-bold py-3 rounded-[50px] hover:bg-green-300 transition mt-6"
        >
          Calculate
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

export default DataInput;
