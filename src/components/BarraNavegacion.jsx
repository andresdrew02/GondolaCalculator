import React from "react";

import {Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenu, NavbarMenuToggle,NavbarMenuItem, Button} from "@nextui-org/react";

export default function BarraNavegacion() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (


        <Navbar onMenuOpenChange={setIsMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <div className="w-14">
          <img src="/logo_gondola.png" alt="Logo de Pizerria Gondola" />
        </div>
        <p className="ml-4 font-bold text-inherit">Calculadora Gondola</p>
          </NavbarBrand>
        </NavbarContent>
  
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          <NavbarItem>
          <a href="https://github.com/andresdrew02" target="_blank">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-green-500 to-green-300 text-white shadow-lg"
            >
              Sobre el creador
            </Button>
          </a>
          </NavbarItem>
        </NavbarContent>
        <NavbarMenu className="flex w-full justify-center items-center">
          <NavbarMenuItem>
          <a href="https://github.com/andresdrew02" target="_blank">
            <Button
              radius="full"
              className="bg-gradient-to-tr from-green-500 to-green-300 text-white shadow-lg"
            >
              Sobre el creador
            </Button>
          </a>
          </NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
  );
}
