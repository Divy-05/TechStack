import { useState } from "react";
import { CheckCircle, ChevronRight, ChevronLeft, BarChart, Users, Calendar, FileText, Loader, Mail, User, Phone } from "lucide-react";

const demoSteps = [
  {
    title: "Welcome to TeechTrack!",
    description: "Your all-in-one tuition management solution. Simplify administration, enhance learning, and track progress with ease.",
    icon: <CheckCircle className="w-12 h-12 text-green-500" />,
  },
  {
    title: "Manage Students & Teachers",
    description: "Easily enroll students, assign teachers, and manage classes efficiently in one place.",
    icon: <Users className="w-12 h-12 text-blue-500" />,
  },
  {
    title: "Track Attendance & Fees",
    description: "Automate attendance tracking and fee collection, reducing manual workload.",
    icon: <Calendar className="w-12 h-12 text-yellow-500" />,
  },
  {
    title: "Powerful Reports & Insights",
    description: "Generate detailed reports on student performance, attendance, and finances.",
    icon: <BarChart className="w-12 h-12 text-purple-500" />,
  },
  {
    title: "Secure & Cloud-Based",
    description: "Access your data anytime, anywhere with secure cloud storage and real-time updates.",
    icon: <FileText className="w-12 h-12 text-red-500" />,
  },
];

const Demo = () => {
  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleNext = () => {
    if (step < demoSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 2000);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center p-6 transition-colors duration-300"
      style={{ backgroundColor: "var(--background-color)", color: "var(--text-color)" }}
    >
      {/* Progress Indicator */}
      <div className="mb-4 flex gap-2">
        {demoSteps.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-8 rounded-full transition-all ${
              index <= step ? "bg-[var(--primary-color)]" : "bg-[var(--border-color)]"
            }`}
          ></div>
        ))}
      </div>

      {/* Demo Card */}
      <div
        className="shadow-lg rounded-2xl p-8 max-w-lg w-full transition-transform transform hover:scale-105 duration-300"
        style={{
          backgroundColor: "var(--card-bg)",
          borderColor: "var(--border-color)",
          boxShadow: `0px 4px 10px var(--shadow-color)`,
        }}
      >
        {/* Icon with Animation */}
        <div className="animate-fadeIn mb-4">{demoSteps[step].icon}</div>

        <h2 className="text-2xl font-bold mb-3">{demoSteps[step].title}</h2>
        <p className="text-lg" style={{ color: "var(--secondary-color)" }}>
          {demoSteps[step].description}
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handlePrevious}
            className={`px-6 py-3 flex items-center gap-2 font-semibold rounded-lg transition-all duration-300 ${
              step === 0 ? "opacity-50 cursor-default" : "hover:bg-[var(--hover-bg)]"
            }`}
            disabled={step === 0}
          >
            {step > 0 && <ChevronLeft className="w-5 h-5" />} Previous
          </button>

          <button
            onClick={handleNext}
            className="px-6 py-3 flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300"
            style={{
              backgroundColor: step === demoSteps.length - 1 ? "var(--accent-color)" : "var(--button-bg)",
              color: "var(--button-text)",
              cursor: step === demoSteps.length - 1 ? "default" : "pointer",
              opacity: step === demoSteps.length - 1 ? 0.7 : 1,
            }}
            disabled={step === demoSteps.length - 1}
          >
            {step === demoSteps.length - 1 ? "Request Demo" : "Next"}
            {step < demoSteps.length - 1 && <ChevronRight className="w-5 h-5" />}
          </button>
        </div>

        {/* Demo Request Form */}
        {step === demoSteps.length - 1 && !isSubmitted && (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div className="flex items-center gap-2 bg-[var(--input-bg)] p-3 rounded-lg border border-[var(--input-border)]">
              <User className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-2 bg-[var(--input-bg)] p-3 rounded-lg border border-[var(--input-border)]">
              <Mail className="w-5 h-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <div className="flex items-center gap-2 bg-[var(--input-bg)] p-3 rounded-lg border border-[var(--input-border)]">
              <Phone className="w-5 h-5 text-gray-400" />
              <input
                type="tel"
                name="phone"
                placeholder="Your Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full bg-transparent focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full px-6 py-3 flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-300"
              style={{
                backgroundColor: "var(--button-bg)",
                color: "var(--button-text)",
              }}
              disabled={isLoading}
            >
              {isLoading ? <Loader className="w-5 h-5 animate-spin" /> : "Submit Request"}
            </button>
          </form>
        )}

        {/* Success Message */}
        {isSubmitted && (
          <div className="mt-8 p-6 bg-green-50 rounded-lg">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2">Demo Requested Successfully!</h3>
            <p className="text-lg">Our team will contact you shortly to schedule your demo.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Demo;