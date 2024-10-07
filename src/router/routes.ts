import { ClassesPage } from "@/pages/classes/Classes.page";
import { HomePage } from "@/pages/home/home.page";

export const routes = {
  index: {
    path: "/",
    Component: HomePage,
  },
  classes: {
    path: "/:groupName",
    Component: ClassesPage,
  },
};
