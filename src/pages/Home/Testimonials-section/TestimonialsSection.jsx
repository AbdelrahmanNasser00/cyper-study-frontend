import TestimonialCard from "@/components/TestimonialCard"

function TestimonialsSection({testimonials}) {
  return (
    <section className="py-16 bg-gray-50">
    <div className="container mx-auto px-4">
      <div className="mb-10 text-center">
        <span className="bg-purple-500/10 text-purple-500 px-4 py-1 rounded-full text-sm mb-3 inline-block">Testimonials</span>
        <h2 className="font-poppins font-bold text-3xl mb-2">What Our Students Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">Thousands of satisfied learners worldwide share their experiences</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard
            key={index}
            {...testimonial}
          />
        ))}
      </div>
    </div>
  </section>
  )
}

export default TestimonialsSection
