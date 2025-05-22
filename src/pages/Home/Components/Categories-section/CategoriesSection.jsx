import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import CategoryCard from "@/components/common/CategoryCard";
function CategoriesSection({ categories }) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 text-center">
          <span className="bg-[#3c59e8]/10 text-[#3c59e8] px-4 py-1 rounded-full text-sm mb-3 inline-block">
            Browse Categories
          </span>
          <h2 className="font-poppins font-bold text-3xl mb-2">Categories</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore our most popular course categories and find the perfect
            course for your needs
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <CategoryCard key={category.slug} {...category} />
          ))}
        </div>

        {/* <div className="text-center mt-10">
          <Link to="/categories">
            <Button variant="outline" size="lg" className="gap-2">
              View All Categories
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div> */}
      </div>
    </section>
  );
}

export default CategoriesSection;
