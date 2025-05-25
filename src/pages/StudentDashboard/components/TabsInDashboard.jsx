import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookMarked, CreditCard, GraduationCap, Heart } from "lucide-react";
import CertificateTab from "./CertificateTab";

import CoursesListTab from "./CoursesListTab";

function TabsInDashboard() {
  return (
    // md:w-[650px] xl:w-[1100px]
    <Tabs defaultValue="courses" className="w-full">
      <TabsList className="mb-2">
        <TabsTrigger className="hover:cursor-pointer" value="courses">
          <span>
            <BookMarked />
          </span>
          My Courses
        </TabsTrigger>
        <TabsTrigger className="hover:cursor-pointer" value="certificates">
          <span>
            <GraduationCap />
          </span>
          Certificates
        </TabsTrigger>
      </TabsList>
      <TabsContent value="courses">
        <CoursesListTab />
      </TabsContent>
      <TabsContent value="certificates">
        <CertificateTab />
      </TabsContent>
    </Tabs>
  );
}

export default TabsInDashboard;
