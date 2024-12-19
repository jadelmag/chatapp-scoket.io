import { SearchBox } from "@/components/searchbox/searchbox";
import { SideBar } from "@/components/sidebar/sidebar";

export const InboxPeople = () => {
  return (
    <div aria-label="inbox-people" className="inbox_people">
      <SearchBox />
      <SideBar />
    </div>
  );
};
