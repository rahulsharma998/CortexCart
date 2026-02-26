import { Package, Star, ShoppingBag } from "lucide-react";

const LandingFeatures = () => {
  return (
    <section id="showcase" className="py-32 relative overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-32">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-2 bg-orange-500/10 text-orange-500 rounded-full text-sm font-bold mb-6 border border-orange-500/20">
              Product Experience
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Showcase Your Products Like Never Before
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Our product pages are designed to convert. With high-fidelity image galleries, detailed specifications, and customer reviews, your products will shine.
            </p>
            <ul className="space-y-4">
              {[
                "Interactive Image Gallery",
                "Real-time Stock Updates",
                "SEO Optimized Descriptions",
                "Related Product Suggestions",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full perspective-1000">
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transform rotate-y-n5 rotate-y-0-hover transition-transform duration-500">
              <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>

              <div className="p-6 grid grid-cols-2 gap-6 bg-slate-950/80">
                <div className="aspect-square bg-slate-800 rounded-lg flex items-center justify-center relative overflow-hidden group">
                  <Package className="w-16 h-16 text-slate-600 group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</div>
                </div>

                <div className="space-y-4">
                  <div className="h-6 w-3/4 bg-slate-800 rounded animate-pulse"></div>
                  <div className="h-4 w-1/4 bg-slate-800 rounded animate-pulse"></div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => <Star key={star} className="w-4 h-4 text-yellow-500 fill-yellow-500" />)}
                  </div>
                  <div className="h-20 w-full bg-slate-800/50 rounded animate-pulse"></div>
                  <div className="flex gap-4 pt-4">
                    <button className="flex-1 bg-orange-600 h-10 rounded-lg text-white text-sm font-bold">Add to Cart</button>
                    <button className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-slate-400">♥</button>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-slate-800 bg-slate-900">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-bold text-white text-sm">Specifications</h4>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-slate-400 py-2 border-b border-slate-800">
                    <span>Material</span>
                    <span>Premium Alloy</span>
                  </div>
                  <div className="flex justify-between text-xs text-slate-400 py-2 border-b border-slate-800">
                    <span>Weight</span>
                    <span>2.4 kg</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-2 bg-purple-500/10 text-purple-500 rounded-full text-sm font-bold mb-6 border border-purple-500/20">
              User Profile
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6">
              Personalized User Profiles
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Give your users a home. CortexCart provides comprehensive user profiles where they can manage orders, track shipments, and update their preferences.
            </p>
            <ul className="space-y-4">
              {[
                "Order History Tracking",
                "Address Book Management",
                "Wishlist Integration",
                "Secure Account Settings",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:w-1/2 w-full perspective-1000">
            <div className="relative bg-slate-900 border border-slate-700/50 rounded-2xl shadow-2xl overflow-hidden transform rotate-y-5 rotate-y-0-hover transition-transform duration-500">
              <div className="h-8 bg-slate-800 border-b border-slate-700 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>

              <div className="flex">
                <div className="w-1/4 border-r border-slate-800 p-4 space-y-4 hidden sm:block bg-slate-950">
                  <div className="h-2 w-full bg-slate-800 rounded"></div>
                  <div className="h-2 w-2/3 bg-slate-800 rounded"></div>
                  <div className="h-2 w-3/4 bg-slate-800 rounded"></div>
                </div>

                <div className="flex-1 p-6 bg-slate-900/50">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
                      JD
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-lg">John Doe</h3>
                      <p className="text-slate-400 text-sm">Premium Member</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-slate-400 text-xs mb-1">Total Orders</div>
                      <div className="text-white text-xl font-bold">24</div>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700">
                      <div className="text-slate-400 text-xs mb-1">Saved Items</div>
                      <div className="text-white text-xl font-bold">12</div>
                    </div>
                  </div>

                  <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
                    <h4 className="text-slate-300 text-sm font-bold mb-3">Recent Activity</h4>
                    <div className="space-y-3">
                      {[1, 2].map(i => (
                        <div key={i} className="flex items-center gap-3 p-2 bg-slate-800/50 rounded">
                          <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center">
                            <ShoppingBag className="w-4 h-4 text-slate-400" />
                          </div>
                          <div className="flex-1">
                            <div className="h-2 w-20 bg-slate-700 rounded mb-1"></div>
                            <div className="h-1.5 w-12 bg-slate-700 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFeatures;
