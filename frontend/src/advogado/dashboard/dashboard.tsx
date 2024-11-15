import { CustomButton } from "@/components/custom-buttons";
import { IconOutlineAccountCircle } from "@/components/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/shadcn/dropdown-menu";
import { Text } from "@/components/typography";
import { LOCAL_STORAGE_TOKENS } from "@/domain/enums/TOKENS";
import { IconType } from "@/lib/create-icon";
import { handleLocalStorage } from "@/lib/handle-local-storage";
import { navRoot } from "@/routes/nav-root";
import { NavLink } from "react-router-dom";
import {
  DesktopNavBarComponent,
  MobileNavBarComponent,
  NavBarProps,
} from "./dashboard-nav-bar";

interface Props {
  navBar: NavBarProps;
  mobileNavBar: NavBarProps;
  userHeaderOptions: {
    label: string;
    to: string;
    icon?: IconType;
  }[];
  children: React.ReactNode;
}

export function Dashboard({
  mobileNavBar,
  navBar,
  userHeaderOptions,
  children,
}: Props) {
  function logout() {
    handleLocalStorage.removeAllItems([
      LOCAL_STORAGE_TOKENS.ADVOGADO_UUID,
      LOCAL_STORAGE_TOKENS.AUTH,
    ]);
  }

  return (
    <div
      className="grid min-h-screen w-full text-sm md:grid-cols-[220px_1fr] md:text-base
        lg:grid-cols-[280px_1fr]"
    >
      <div className="hidden border-r md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div
            className="flex h-14 flex-col items-center justify-center gap-0 border-b px-4 lg:h-[60px]
              lg:px-6"
          >
            <span className="flex items-center gap-2 font-semibold">
              AEON SISTEMAS
            </span>
            <Text variant="muted" className="text-sm">
              Advogado
            </Text>
          </div>
          <div className="flex-1">
            <DesktopNavBarComponent {...navBar} />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b lg:h-[60px] lg:px-6">
          <MobileNavBarComponent {...mobileNavBar} />
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <CustomButton
                variant="secondary"
                size="icon"
                iconSize={30}
                className="mr-2 size-5 rounded-full"
                icon={IconOutlineAccountCircle}
              />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {userHeaderOptions?.map(({ label }, index) => (
                <DropdownMenuItem key={index}>{label}</DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <NavLink to={navRoot.login}>
                <DropdownMenuItem onClick={logout} className="cursor-pointer">
                  Sair
                </DropdownMenuItem>
              </NavLink>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main
          className="flex flex-1 flex-col gap-4 bg-zinc-100/40 p-4 dark:bg-zinc-800/40 lg:gap-6
            lg:p-6"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
