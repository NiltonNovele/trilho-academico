import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Building2,
  Wallet,
  CheckCircle2,
  Info,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

export interface CourseCardData {
  title?: string;
  name?: string;
  university?: string;
  country?: string;
  city?: string;
  pricePerYear?: string;
  requirements?: string[] | string;
  accommodation?: {
    needed?: boolean;
    details?: string;
  };
  visaAndLegal?: string;
  whyThisFits?: string;
  description?: string;
  link?: string;
}

const StudyPlanCard: React.FC<{ data: CourseCardData }> = ({ data }) => {
  const [expanded, setExpanded] = useState(false);

  const requirementsList = Array.isArray(data.requirements)
    ? data.requirements
    : data.requirements
    ? [data.requirements]
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group rounded-[2rem] border border-gray-200 bg-white p-5 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.25)] transition-all sm:p-6"
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
          <GraduationCap className="h-6 w-6" />
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-black text-gray-900 leading-tight">
            {data.title || data.name}
          </h3>

          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-500">
            {data.university && (
              <span className="flex items-center gap-1">
                <Building2 className="h-4 w-4" />
                {data.university}
              </span>
            )}

            {data.country && (
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {data.country}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <div className="grid grid-cols-2 gap-3 text-sm mb-4">
        <InfoBox label="Cidade" value={data.city || "N/A"} />
        <InfoBox label="Custo / ano" value={data.pricePerYear || "N/A"} />
      </div>

      {/* Description */}
      {data.description && (
        <p className="text-sm text-gray-600 leading-6 mb-4">
          {data.description}
        </p>
      )}

      {/* Why fits */}
      {data.whyThisFits && (
        <div className="rounded-2xl bg-cyan-50 p-4 mb-4">
          <p className="text-xs font-bold uppercase text-gray-500 mb-1">
            Por que se adequa a ti
          </p>
          <p className="text-sm text-gray-700">{data.whyThisFits}</p>
        </div>
      )}

      {/* Expand Button */}
      <button
        onClick={() => setExpanded((prev) => !prev)}
        className="flex items-center justify-between w-full mt-2 px-4 py-2 rounded-2xl bg-gray-50 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition"
      >
        <span>{expanded ? "Menos detalhes" : "Ver mais detalhes"}</span>
        <ChevronDown
          className={`h-4 w-4 transition ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Expand Content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-4">
              {/* Requirements */}
              {requirementsList.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">
                    Requisitos
                  </p>
                  <ul className="space-y-2">
                    {requirementsList.map((req, i) => (
                      <li
                        key={i}
                        className="flex gap-2 text-sm text-gray-600"
                      >
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Accommodation */}
              <div>
                <p className="text-sm font-bold text-gray-900 mb-1">
                  Alojamento
                </p>
                <p className="text-sm text-gray-600">
                  {data.accommodation?.needed
                    ? data.accommodation.details || "Necessário"
                    : "Não necessário"}
                </p>
              </div>

              {/* Visa */}
              {data.visaAndLegal && (
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">
                    Vistos & Legalidades
                  </p>
                  <p className="text-sm text-gray-600">
                    {data.visaAndLegal}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA */}
      {data.link && (
        <a
          href={data.link}
          target="_blank"
          rel="noreferrer"
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg hover:-translate-y-0.5 hover:shadow-xl transition"
        >
          Ver curso
          <ExternalLink className="h-4 w-4" />
        </a>
      )}
    </motion.div>
  );
};

const InfoBox = ({ label, value }: { label: string; value: string }) => (
  <div className="rounded-2xl bg-gray-50 p-3">
    <p className="text-xs font-bold uppercase text-gray-500">{label}</p>
    <p className="text-sm font-semibold text-gray-900 mt-1">{value}</p>
  </div>
);

export default StudyPlanCard;