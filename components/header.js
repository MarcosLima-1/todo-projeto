"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

const informations = [
  {
    title: "Sobre nos",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Politica e privacidade",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
];

const tools = [
  {
    title: "Lista de tarefas",
    href: "/lista-de-tarefas",
    description:
      "Gerencie suas atividades diárias com eficiência, organizando tarefas em diferentes categorias para facilitar sua rotina.",
  },
];

const ListItem = ({ className, title, children, ...props }, href) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          href={href}
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
};
ListItem.displayName = "ListItem";
const Header = () => {
  return (
    <header className=" shadow-md z-20 top-0 fixed w-full bg-white h-16 border-b-2">
      <div className=" w-[90%] h-full mx-auto flex justify-between items-center">
        <a href="/" className="w-fit font-extrabold text-xl">
          LifeManager
        </a>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Ferramentas</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[300px] md:grid-cols-1 lg:w-[300px] ">
                  {tools.map((tool) => (
                    <ListItem key={tool.title} title={tool.title} href={tool.href}>
                      {tool.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        <Button asChild>
          <a href="/lista-de-tarefas">WorkSpace</a>
        </Button>
      </div>
    </header>
  );
};

export default Header;
