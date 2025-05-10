import { Link } from "react-router-dom";
import {
  Book,
  BookOpen,
  GraduationCap,
  Briefcase,
  Award,
  Settings,
  ListVideo,
  Heart,
  Bell,
  ShoppingCart,
  Search,
} from "lucide-react";

const CategoryCard = ({
  title,
  icon,
  courseCount,
  slug,
  color = "bg-brand-blue",
}) => {
  const getIcon = () => {
    switch (icon) {
      case "book":
        return <Book className="w-6 h-6 text-white" />;
      case "book-open":
        return <BookOpen className="w-6 h-6 text-white" />;
      case "award":
        return <Award className="w-6 h-6 text-white" />;
      case "briefcase":
        return <Briefcase className="w-6 h-6 text-white" />;
      case "graduation-cap":
        return <GraduationCap className="w-6 h-6 text-white" />;
      case "list-video":
        return <ListVideo className="w-6 h-6 text-white" />;
      case "shopping-cart":
        return <ShoppingCart className="w-6 h-6 text-white" />;
      case "heart":
        return <Heart className="w-6 h-6 text-white" />;
      case "bell":
        return <Bell className="w-6 h-6 text-white" />;
      case "settings":
        return <Settings className="w-6 h-6 text-white" />;
      case "search":
        return <Search className="w-6 h-6 text-white" />;
      default:
        return <img src={icon} alt={title} className="w-6 h-6" />;
    }
  };

  return (
    <Link to={`/categories/${slug}`} className="block">
      <div className="border rounded-lg p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 bg-white flex flex-col items-center text-center group">
        <div
          className={`${color} w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {getIcon()}
        </div>
        <h3 className="font-poppins font-semibold text-lg mb-1 group-hover:text-[#3a57e8] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">
          {courseCount.toLocaleString()} courses
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
