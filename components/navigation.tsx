import { cn } from "@/lib/utils";

interface Navigation {
  title: string;
  href: string;
  active: boolean;
}

const NavigationList: Navigation[] = [
  { title: "Subject", href: "/subject", active: false },
  { title: "Style", href: "/style", active: false },
  { title: `ArtistReference`, href: "/artistiReference", active: false },
  { title: "Composition", href: "/composition", active: false },
  { title: "Mood", href: "/mood", active: false },
  { title: "Tone", href: "/tone", active: false },
];

const Navigation = () => {
  return (
    <div className="flex items-center justify-around">
      {NavigationList.map((item) => (
        <div key={item.title} className={cn("border px-7 py-2")}>
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Navigation;
