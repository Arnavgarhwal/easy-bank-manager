import { useState } from "react";
import { motion } from "framer-motion";
import {
  HelpCircle,
  Search,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  Mail,
  Phone,
  FileText,
  ExternalLink,
  Send,
  CheckCircle,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    id: "1",
    question: "How do I transfer money to another account?",
    answer: "To transfer money, go to the Transfers page and click 'New Transfer'. Enter the recipient's details, the amount, and confirm the transfer. You can also use Quick Transfer from the dashboard for frequently used contacts.",
    category: "Transfers",
  },
  {
    id: "2",
    question: "How do I add a new card to my account?",
    answer: "Navigate to the Cards page and click 'Add New Card'. Fill in your card details including card number, expiration date, and CVV. You can also set spending limits for each card.",
    category: "Cards",
  },
  {
    id: "3",
    question: "How do I set up automatic bill payments?",
    answer: "Go to Bills & Payments, find the bill you want to automate, and toggle on 'Auto-pay'. Make sure you have sufficient funds in your account on the due date.",
    category: "Bills",
  },
  {
    id: "4",
    question: "How do I enable two-factor authentication?",
    answer: "Go to Settings > Security tab > Two-Factor Authentication. Toggle on the authenticator app option and follow the setup instructions to scan the QR code with your authenticator app.",
    category: "Security",
  },
  {
    id: "5",
    question: "How do I export my transaction history?",
    answer: "Go to the Transactions page, apply any filters you need (date range, category, etc.), and click the 'Export' button. Your transactions will be downloaded as a CSV file.",
    category: "Transactions",
  },
  {
    id: "6",
    question: "How do I update my profile information?",
    answer: "Navigate to Settings > Profile tab. You can update your name, email, phone number, and address. Don't forget to click 'Save Changes' when you're done.",
    category: "Account",
  },
  {
    id: "7",
    question: "How do I set savings goals?",
    answer: "Go to Savings Goals page and click 'New Goal'. Set your target amount, deadline, and monthly contribution. You can track your progress and add funds anytime.",
    category: "Savings",
  },
  {
    id: "8",
    question: "How do I lock a lost or stolen card?",
    answer: "Go to Cards page, find the affected card, and click the 'Lock Card' button. This immediately prevents any new transactions. Contact support for a replacement card.",
    category: "Cards",
  },
];

const documentationLinks = [
  {
    title: "Getting Started Guide",
    description: "Learn the basics of using Vault banking",
    url: "#",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Security Best Practices",
    description: "Keep your account safe and secure",
    url: "#",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "API Documentation",
    description: "For developers and integrations",
    url: "#",
    icon: <FileText className="w-5 h-5" />,
  },
  {
    title: "Privacy Policy",
    description: "How we handle your data",
    url: "#",
    icon: <FileText className="w-5 h-5" />,
  },
];

const HelpCenter = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [contactForm, setContactForm] = useState({
    name: "Arnav Garhwal",
    email: "arnav.garhwal@email.com",
    subject: "",
    category: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = [...new Set(faqs.map((faq) => faq.category))];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || faq.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleSubmitContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.subject || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setContactForm({
        ...contactForm,
        subject: "",
        category: "",
        message: "",
      });
      toast({
        title: "Message Sent",
        description: "We'll get back to you within 24 hours.",
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Help Center</h1>
            <p className="text-muted-foreground mt-1">Find answers and get support</p>
          </motion.div>

          {/* Search & Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="bg-gradient-to-r from-primary/10 to-primary/5">
              <CardContent className="p-6 md:p-8">
                <div className="max-w-2xl mx-auto text-center">
                  <HelpCircle className="w-12 h-12 mx-auto text-primary mb-4" />
                  <h2 className="text-xl font-semibold text-foreground mb-2">How can we help you?</h2>
                  <p className="text-muted-foreground mb-6">Search our FAQ or contact support</p>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search for answers..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-lg"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Options */}
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { icon: <MessageSquare className="w-5 h-5" />, title: "Live Chat", desc: "Chat with us now", action: "Start Chat" },
              { icon: <Mail className="w-5 h-5" />, title: "Email Support", desc: "support@vault.com", action: "Send Email" },
              { icon: <Phone className="w-5 h-5" />, title: "Phone Support", desc: "1-800-VAULT", action: "Call Now" },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-3">
                      {item.icon}
                    </div>
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                    <Button variant="outline" size="sm">
                      {item.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* FAQ Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>Frequently Asked Questions</CardTitle>
                      <CardDescription>Quick answers to common questions</CardDescription>
                    </div>
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="All Categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((cat) => (
                          <SelectItem key={cat} value={cat}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredFaqs.map((faq) => (
                    <motion.div
                      key={faq.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border border-border rounded-lg overflow-hidden"
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Badge variant="secondary" className="text-xs">
                            {faq.category}
                          </Badge>
                          <span className="font-medium text-foreground">{faq.question}</span>
                        </div>
                        {expandedFaq === faq.id ? (
                          <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      {expandedFaq === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          className="px-4 pb-4"
                        >
                          <p className="text-muted-foreground ml-[calc(theme(spacing.3)+60px)]">
                            {faq.answer}
                          </p>
                        </motion.div>
                      )}
                    </motion.div>
                  ))}

                  {filteredFaqs.length === 0 && (
                    <div className="text-center py-8">
                      <HelpCircle className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">No matching questions found</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Contact Form & Documentation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-6"
            >
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Contact Support</CardTitle>
                  <CardDescription>Send us a message</CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="text-center py-8">
                      <CheckCircle className="w-12 h-12 mx-auto text-emerald-500 mb-3" />
                      <h3 className="font-semibold text-foreground mb-2">Message Sent!</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        We'll respond within 24 hours
                      </p>
                      <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmitContact} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          placeholder="Brief description"
                          value={contactForm.subject}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, subject: e.target.value })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={contactForm.category}
                          onValueChange={(value) =>
                            setContactForm({ ...contactForm, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="technical">Technical Issue</SelectItem>
                            <SelectItem value="billing">Billing Question</SelectItem>
                            <SelectItem value="security">Security Concern</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          placeholder="Describe your issue or question..."
                          rows={4}
                          value={contactForm.message}
                          onChange={(e) =>
                            setContactForm({ ...contactForm, message: e.target.value })
                          }
                        />
                      </div>
                      <Button type="submit" className="w-full gap-2" disabled={isSubmitting}>
                        {isSubmitting ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>

              {/* Documentation Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>Helpful resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {documentationLinks.map((doc) => (
                    <a
                      key={doc.title}
                      href={doc.url}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                    >
                      <div className="p-2 bg-muted rounded-lg">{doc.icon}</div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                          {doc.title}
                        </p>
                        <p className="text-xs text-muted-foreground">{doc.description}</p>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground" />
                    </a>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HelpCenter;
