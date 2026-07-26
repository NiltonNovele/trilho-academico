import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const test = params.get("test");

  useEffect(() => {
    const timer = setTimeout(() => {
      if (test === "/known-course") {
        navigate("/known-course");
      } else if (test === "/vocational-quiz") {
        navigate("/vocational-quiz");
      } else {
        navigate("/");
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [test, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Floating circles background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>

      {/* Success card */}
      <div className="bg-white shadow-xl rounded-2xl px-8 py-10 text-center relative z-10 max-w-md">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 rounded-full p-4 animate-bounce">
            <CheckCircle2 className="text-green-500 w-12 h-12" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Pagamento efetuado com sucesso! 🎉
        </h1>
        <p className="text-gray-600 mb-6">
          Obrigado por apoiares o Trilho Académico.
          <br />
          Estamos a preparar a tua próxima etapa...
        </p>

        <div className="flex justify-center items-center gap-2 text-sm text-gray-500">
          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <span>A redirecionar...</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
