import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section className="py-12 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#3a57e8] mb-2">
              {inView && (
                <CountUp end={1500000} duration={3} separator="," suffix="+" />
              )}
            </p>
            <p className="text-muted-foreground">Students</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#00c1d4] mb-2">
              {inView && (
                <CountUp end={10000} duration={3} separator="," suffix="+" />
              )}
            </p>
            <p className="text-muted-foreground">Courses</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#f9b15e] mb-2">
              {inView && (
                <CountUp end={7500} duration={3} separator="," suffix="+" />
              )}
            </p>
            <p className="text-muted-foreground">Instructors</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#a855f7] mb-2">
              {inView && (
                <CountUp end={4.8} duration={3} decimals={1} suffix="/5" />
              )}
            </p>
            <p className="text-muted-foreground">Avg. Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
