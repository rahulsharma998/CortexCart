import { Rocket, ShieldCheck, Zap, Globe } from "lucide-react";

const LandingAbout = () => {
  const features = [
    {
      icon: <Rocket className="w-6 h-6 text-orange-500" />,
      title: "Lightning Fast Performance",
      description: "Built on a modern stack ensuring sub-second load times and seamless navigation."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-green-500" />,
      title: "Enterprise Grade Security",
      description: "Your data is protected with state-of-the-art encryption and secure payment gateways."
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-500" />,
      title: "Real-time Analytics",
      description: "Instant insights into your sales, inventory, and user behavior powered by our advanced engine."
    },
    {
      icon: <Globe className="w-6 h-6 text-blue-500" />,
      title: "Global Reach",
      description: "Scale your business effortlessly across borders with our multi-currency and multi-language support."
    }
  ];

  return (
    <section id="about" className="py-24 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
            About <span className="text-orange-500">CortexCart</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-3xl mx-auto leading-relaxed">
            We are redefining the e-commerce landscape by providing a robust, scalable, and intuitive platform for businesses of all sizes. Our mission is to empower merchants with the tools they need to succeed in the digital age.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 rounded-2xl bg-slate-800/20 border border-slate-700/50 hover:bg-slate-800/50 hover:border-orange-500/30 transition-all duration-300 group cursor-default relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="mb-4 p-3 bg-slate-900/80 rounded-xl inline-block group-hover:scale-110 group-hover:bg-slate-900 transition-all duration-300 relative z-10 border border-slate-700/50 group-hover:border-orange-500/30">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3 relative z-10 group-hover:text-orange-500 transition-colors">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed relative z-10 group-hover:text-slate-300 transition-colors">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LandingAbout;
