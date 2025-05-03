function StatsSection() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#3a57e8] mb-2">
              15M+
            </p>
            <p className="text-muted-foreground">Students</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#00c1d4] mb-2">
              100K+
            </p>
            <p className="text-muted-foreground">Courses</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#f9b15e] mb-2">
              75K+
            </p>
            <p className="text-muted-foreground">Instructors</p>
          </div>
          <div className="p-6">
            <p className="font-bold text-3xl md:text-4xl text-[#a855f7] mb-2">
              4.8/5
            </p>
            <p className="text-muted-foreground">Avg. Rating</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
