import AnimatedStats from './AnimatedStats';

const StatsSection = () => {
  return (
    <section className="py-20 section-teal relative overflow-hidden">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-4">
            <img
              src="https://cdn-icons-png.flaticon.com/512/942/942799.png"
              alt="Students learning"
              className="w-16 h-16 object-contain"
            />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-secondary mb-4">
            Students Love Learning with <span className="text-gradient-teal">ASLI Prep</span>
          </h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <AnimatedStats />
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
