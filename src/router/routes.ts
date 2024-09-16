import { ClassesPage } from "@/pages/classes/Classes.page";
import { IndexPage } from "@/pages/index/Index.page";

export const routes = {
  index: {
    path: "/",
    Component: IndexPage,
  },
  classes: {
    path: "/:groupName",
    Component: ClassesPage,
  },
};
