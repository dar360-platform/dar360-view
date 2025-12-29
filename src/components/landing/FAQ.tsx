import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Is Dar360 a CRM?",
    answer: "No. We're a rental lifecycle platform. Use us alongside your CRM. Dar360 focuses on the rental transaction and ongoing tenancy experience — listings, contracts, Ejari, and owner transparency — not lead management or marketing automation.",
  },
  {
    question: "Are digital signatures legal in UAE?",
    answer: "Yes. UAE Pass signatures are government-recognized. OTP is valid for rentals under 10 years per UAE Electronic Transactions Law. All contracts signed through Dar360 are legally binding.",
  },
  {
    question: "How does Ejari submission work?",
    answer: "After contract signing, click \"Submit Ejari\" — we handle the rest. Certificate delivered within 24 hours. Cost: AED 299. No more driving to typing centers or waiting in queues.",
  },
  {
    question: "Can owners see all my activity?",
    answer: "Only for their linked properties. They see viewings, shares, and contract status — proving your efforts without weekly calls. Your other clients' data remains private.",
  },
  {
    question: "Do I need to verify my RERA license?",
    answer: "Yes. We verify all agents to build trust with property owners. Your \"RERA Verified\" badge is displayed on your profile, instantly establishing credibility.",
  },
  {
    question: "Is there a free trial?",
    answer: "Yes! 14 days free, no credit card required. Full access to all features so you can see the difference Dar360 makes before committing.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            FAQ
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Everything you need to know about Dar360.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card border border-border/50 rounded-2xl px-6 data-[state=open]:shadow-soft"
              >
                <AccordionTrigger className="font-display text-lg font-semibold text-foreground hover:text-accent hover:no-underline py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground font-body leading-relaxed pb-6">
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
