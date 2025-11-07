import { useNavigate } from "react-router-dom";
 
const Login = () => {
  const navigate = useNavigate();

  return (
  // Tela com fundo escuro
    <div className="
    min-h-screen 
    flex 
    flex-col 
    items-center 
    justify-center 
    bg-black 
    text-white 
    p-6
    "
    >
      
    {/* Título */}
      <h1 className="
      text-3xl 
      font-bold 
      mb-8 
      text-center">
        Renewable Energy Savings Calculator
      </h1>

      {/* Caixa de login */}
      <div className="
      w-full 
      max-w-sm 
      space-y-4
      "
      >

      {/* Campo de email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-md text-gray-900"
        />
        {/* Campo de senha */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-md text-gray-900"
        />
        {/* Botão principal */}
        <button
          className="w-full bg-yellow-400 text-gray-900 py-3 rounded-md font-bold hover:bg-yellow-300 transition"
          onClick={() => navigate("/energy-type")}
        >
          LOGIN
        </button>

        {/* Botões de login social */}
        <div className="flex flex-col gap-2 mt-6">
          <button className="bg-white text-gray-900 py-2 rounded-md hover:bg-gray-100 transition">
            Continue with Google
          </button>
          <button className="bg-blue-600 py-2 rounded-md hover:bg-blue-500 transition">
            Continue with Facebook
          </button>
          <button className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition">
            Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;