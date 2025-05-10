import { Star } from 'lucide-react';

const TestimonialCard = ({
  name,
  avatar,
  role,
  company,
  testimonial,
  rating
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex gap-4 mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-medium">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}, {company}</p>
        </div>
      </div>
      
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={`${
              star <= rating ? 'fill-[#f9b15e] text-[#f9b15e]' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
      
      <p className="text-gray-700">"{testimonial}"</p>
    </div>
  );
};

export default TestimonialCard;
