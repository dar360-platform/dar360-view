import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is this a CRM?",
    answer: "Nope. CRMs track leads for your boss. Dar360 shows your work to owners. Big difference.",
  },
  {
    question: "Are digital signatures actually legal?",
    answer: "Yes. UAE Pass = government-recognized. OTP works for rentals under 10 years. Fully legal.",
  },
  {
    question: "What can owners actually see?",
    answer: "Only their property: viewings, inquiries, contract status. Not your other clients. Not your notes. Just their property.",
  },
  {
    question: "Do I have to verify my RERA license?",
    answer: "Yes — it takes 24 hours. This is what makes owners trust you.",
  },
  {
    question: "What's the catch with the free trial?",
    answer: "No catch. 14 days. Full access. No card. You decide after.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-secondary bg-noise">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-body text-sm font-medium mb-6 uppercase tracking-wider">
            Questions
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            Let's clear things up.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/30 rounded-xl px-6 data-[state=open]:shadow-soft overflow-hidden"
              >
                <AccordionTrigger className="font-display text-lg font-semibold text-foreground hover:text-accent hover:no-underline py-5 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};