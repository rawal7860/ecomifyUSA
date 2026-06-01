import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItemProps {
  question: string;
  answer: string;
}

// Light-system accordion: hairline card, gold rule on the open answer, blue chevron.
export default function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `faq-${question.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 40)}`;
  return (
    <div
      className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
        isOpen ? "border-blue-300 shadow-lg shadow-blue-100" : "border-hairline hover:border-blue-200 hover:shadow-md"
      }`}
    >
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span className="text-lg font-semibold text-slate-900 pr-4">{question}</span>
        <div className={`w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-blue-100" : ""}`}>
          <ChevronDown className="w-5 h-5 text-blue-600" aria-hidden="true" />
        </div>
      </button>
      <div id={panelId} className={`transition-all duration-300 ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-5 pt-0">
          <div className="pl-4 border-l-2 border-gold">
            <p className="text-slate-600 leading-relaxed">{answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
