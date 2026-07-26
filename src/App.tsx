import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { FormDataProvider } from "./components/FormDataContext";

import Navigation from "./components/Navigation";
import Home from "./components/Home";
import Paralelas from "./components/Paralelas";
import LegalDocs from "./components/Legal";
import Learn from "./components/Recursos";
import Enquiry from "./components/Contacto";
import Footer from "./components/Footer";
import ResultsPage from "./components/ResultsPage";
import StepTwo from "./components/StepTwo";
import KnownCourseForm from "./components/KnownCourseForm";
import VocationalQuizForm from "./components/VocationalQuizForm";
import Terms from "./components/terms";
import axios from "axios";
import CookieConsent from "./components/CookieConsent";
import NewsDetail from "./components/NewsDetail";
import ScholarshipDetail from "./components/ScholarshipDetail";
import NotFound from "./components/404";
import PaymentSuccess from "./components/PaymentSuccess";

const token = localStorage.getItem("authToken");
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const pageWrapper =
  "relative isolate min-h-[calc(100vh-10rem)]";

function AppRoutes() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <section className={pageWrapper}>
            <Home />
          </section>
        }
      />

      <Route
        path="/contact"
        element={
          <section className={pageWrapper}>
            <Enquiry />
          </section>
        }
      />

      <Route
        path="/terms"
        element={
          <section className={pageWrapper}>
            <Terms />
          </section>
        }
      />

      <Route
        path="/news/:id"
        element={
          <section className={pageWrapper}>
            <NewsDetail />
          </section>
        }
      />

      <Route
        path="/scholarships/:id"
        element={
          <section className={pageWrapper}>
            <ScholarshipDetail />
          </section>
        }
      />

      <Route
        path="/paralelas"
        element={
          <section className={pageWrapper}>
            <Paralelas />
          </section>
        }
      />

      <Route
        path="/legal"
        element={
          <section className={pageWrapper}>
            <LegalDocs />
          </section>
        }
      />

      <Route
        path="/recursos"
        element={
          <section className={pageWrapper}>
            <Learn />
          </section>
        }
      />

      <Route
        path="/known-course"
        element={
          <section className={pageWrapper}>
            <KnownCourseForm />
          </section>
        }
      />

      <Route
        path="/vocational-quiz"
        element={
          <section className={pageWrapper}>
            <VocationalQuizForm />
          </section>
        }
      />

      <Route
        path="/escolher-teste"
        element={
          <section className={pageWrapper}>
            <StepTwo />
          </section>
        }
      />

      <Route
        path="/results"
        element={
          <section className={pageWrapper}>
            <ResultsPage />
          </section>
        }
      />

      <Route
        path="/payment-success"
        element={
          <section className={pageWrapper}>
            <PaymentSuccess />
          </section>
        }
      />

      <Route
        path="*"
        element={
          <section className={pageWrapper}>
            <NotFound />
          </section>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <ThemeProvider>
      <FormDataProvider>
        <Router>
          <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-gray-900 transition-colors duration-300 dark:bg-gray-950 dark:text-white">
            {/* Global background */}
            <div className="pointer-events-none absolute inset-0 -z-10">
              <div className="absolute left-[-120px] top-0 h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl dark:bg-cyan-500/10" />
              <div className="absolute right-[-100px] top-40 h-96 w-96 rounded-full bg-blue-200/20 blur-3xl dark:bg-blue-500/10" />
              <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl dark:bg-indigo-500/10" />
            </div>

            <Navigation />
            
            <main className="relative flex-1">
              <AppRoutes />
            </main>

            <Footer />
            <CookieConsent />
          </div>
        </Router>
      </FormDataProvider>
    </ThemeProvider>
  );
}

export default App;