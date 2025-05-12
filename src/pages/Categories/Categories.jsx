import CategoryCard from "@/components/common/CategoryCard";

function Categoires() {
  const categories = [
    {
      title: "Development",
      icon: "book-open",
      courseCount: 4500,
      slug: "development",
      color: "bg-gradient-to-br from-blue-500 to-blue-600",
    },
    {
      title: "Business",
      icon: "briefcase",
      courseCount: 3200,
      slug: "business",
      color: "bg-gradient-to-br from-teal-500 to-teal-600",
    },
    {
      title: "Design",
      icon: "award",
      courseCount: 2800,
      slug: "design",
      color: "bg-gradient-to-br from-purple-500 to-purple-600",
    },
    {
      title: "Marketing",
      icon: "list-video",
      courseCount: 2100,
      slug: "marketing",
      color: "bg-gradient-to-br from-orange-500 to-orange-600",
    },
    {
      title: "IT & Software",
      icon: "graduation-cap",
      courseCount: 1900,
      slug: "it-software",
      color: "bg-gradient-to-br from-green-500 to-green-600",
    },
    {
      title: "Music",
      icon: "heart",
      courseCount: 1700,
      slug: "music",
      color: "bg-gradient-to-br from-pink-500 to-pink-600",
    },
    {
      title: "Photography",
      icon: "book",
      courseCount: 1400,
      slug: "photography",
      color: "bg-gradient-to-br from-cyan-500 to-cyan-600",
    },
    {
      title: "Health & Fitness",
      icon: "shopping-cart",
      courseCount: 1200,
      slug: "health-fitness",
      color: "bg-gradient-to-br from-red-500 to-red-600",
    },
  ];
  return (
    <div className="min-h-dvh">
      <div className=" container my-10 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.slug} {...category}></CategoryCard>
        ))}
      </div>
    </div>
  );
}

export default Categoires;
