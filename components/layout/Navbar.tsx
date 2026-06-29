"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, User, ShoppingCart, MapPin, Menu, X } from "lucide-react";

export default function Navbar() {
    const router = useRouter();
    const [query, setQuery] = useState("");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    function handleSearch(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const cleanQuery = query.trim();
        if (cleanQuery) router.push(`/buscar?q=${encodeURIComponent(cleanQuery)}`);
    }

    return (
        <nav className="bg-[#F4F4F5] border-b border-[#E4E4E7] sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-col gap-3">

                {/* Fila principal del Navbar */}
                <div className="flex items-center justify-between gap-4">

                    {/* Menú Hamburguesa (Sólo visible en móviles/tablets para desplegar categorías) */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="p-1 text-[#626264] hover:text-[#CE2C3C] transition md:hidden focus:outline-none"
                        aria-label="Abrir menú"
                    >
                        {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>

                    {/* Logotipo de la Mueblería */}
                    <div className="items-center sm:hidden md:flex flex-col gap-2 w-auto object-contain ">
                        <Link href="/">
                            <img src="/images/logo.png" alt="Mueblerías Ahorramás" className="md:h-12 w-auto object-contain" />
                        </Link>
                        {/* C.P. Selector alineado a la izquierda */}
                        <div className="flex items-center gap-1.5 text-xs text-[#626264] cursor-pointer hover:text-[#CE2C3C] transition">
                            <MapPin className="w-4 h-4 text-zinc-800" />
                            <span>Enviar a: <strong className="underline text-[#CE2C3C]">Seleccionar C.P.</strong></span>
                        </div>

                    </div>

                    <div className="flex-col gap-2 w-auto justify-items-center">
                        {/* Buscador de Cápsula Redonda (Se oculta en móvil para ponerse abajo al 100%) */}
                        <form onSubmit={handleSearch} className="hidden md:flex max-w-lg relative items-center w-full">
                            <input
                                type="text"
                                value={query}
                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Busca salas, recámaras, comedores, colchones ..."
                                className="w-full bg-[#FAFAFA] border border-zinc-300 rounded-full py-2.5 px-5 pr-12 text-sm text-[#1A1A1A] placeholder-zinc-500 outline-none focus:border-[#CE2C3C] focus:bg-white transition shadow-inner"
                            />
                            <Search className="w-5 h-5 text-zinc-600 absolute right-4 cursor-pointer" />

                        </form>
                        {/* Barra de Categorías */}
                        <div className="hidden md:flex items-center pt-2 gap-4 lg:gap-5 text-[13px] font-semibold text-[#626264] overflow-x-auto text-center">
                            <Link href="/" className="text-[#CE2C3C] hover:text-[#CE2C3C] transition">Inicio</Link>
                            <Link href="/salas" className="hover:text-[#CE2C3C] transition">Salas</Link>
                            <Link href="/recamaras" className="hover:text-[#CE2C3C] transition">Recámaras</Link>
                            <Link href="/comedores" className="hover:text-[#CE2C3C] transition">Comedores</Link>
                            <Link href="/colchones" className="hover:text-[#CE2C3C] transition">Colchones</Link>
                            <Link href="/tv" className="hover:text-[#CE2C3C] transition">Muebles TV</Link>
                            <Link href="/otros" className="hover:text-[#CE2C3C] transition">Otros Muebles</Link>
                            <Link href="/nosotros" className="hover:text-[#CE2C3C] transition">Nosotros</Link>
                        </div>
                    </div>

                    {/* Acciones Responsivas: Las palabras se apilan debajo del icono en pantallas chicas y el botón de contactanos debajo de los botones de carrito y cuenta en pantallas medianas */}
                    <div className="hidden lg:flex-row md:flex flex-col  items-center gap-3">
                        <div className="sm:hidden md:flex items-center gap-3">
                            <button className="flex lg:flex-row sm:flex-col items-center gap-1 sm:text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition">
                                <ShoppingCart className="w-4 h-4  text-zinc-800" />
                                <span className="text-[10px] sm:text-xs">Carrito</span>
                            </button>
                            <button className="flex lg:flex-row sm:flex-col items-center gap-1 sm:text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition">
                                <User className="w-4 h-4 text-zinc-800" />
                                <span className="text-[10px] sm:text-xs">Cuenta</span>
                            </button>
                        </div>
                        <button className="sm:hidden md:flex bg-[#CE2C3C] text-white px-3 py-1.5 rounded-full text-sm font-bold hover:bg-[#A8202D] transition shadow-sm">
                            Contáctanos
                        </button>
                    </div>

                    {/* Fila de Buscador Móvil y C.P. (Sólo visible en pantallas pequeñas) */}
                    <div className="flex gap-2 w-full justify-items-center md:hidden ">
                        <form onSubmit={handleSearch} className="max-w-lg relative items-center w-full flex">
                            <input
                                type="text"
                                value={query}

                                onChange={(event) => setQuery(event.target.value)}
                                placeholder="Busca salas, recámaras, comedores..."
                                className="w-full bg-white border border-zinc-300 rounded-full py-2 px-4 pr-10 text-sm outline-none focus:border-[#CE2C3C] transition shadow-sm"
                            />
                            <Search className="w-4 h-4 text-[#626264] absolute right-3" />
                        </form>

                        {/* C.P. Selector simplificado*/}
                        <div className="flex items-center gap-1 text-[11px] text-[#626264] cursor-pointer hover:text-[#CE2C3C] transition mt-1">
                            <span>📍 Enviar a: <strong className="underline text-[#CE2C3C]">Seleccionar C.P.</strong></span>
                        </div>
                        <div className="flex items-center gap-3 ">
                            <button className="flex-col items-center  gap-1 text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition">
                                <ShoppingCart className="w-4 h-4 text-zinc-800 justify-self-center" />
                                <span className="text-xs">Carrito</span>
                            </button>
                            <button className="flex-col items-center gap-1 text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition">
                                <User className="w-4 h-4 text-zinc-800 justify-self-center" />
                                <span className="text-xs">Cuenta</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>



            {/* MENÚ DESPLEGABLE MÓVIL (DRAWER) (Se activa al presionar el menú de hamburguesa) [4] */}
            <div className={`fixed inset-y-0 left-0 bg-white w-64 border-r border-[#E4E4E7] shadow-lg transform transition-transform duration-300 ease-in-out z-50 p-6 flex flex-col gap-6 md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-4">
                    <Link href="/" className="flex align-center justify-center flex-1">
                        <img src="/images/logo.png" alt="Mueblerías Ahorramás" className="h-8 md:h-12 w-auto object-contain" />
                    </Link>
                    <button onClick={() => setMobileMenuOpen(false)} className="text-[#626264] hover:text-[#CE2C3C]">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex flex-col gap-4 text-sm font-semibold text-[#626264]">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-[#CE2C3C]">Inicio</Link>
                    <Link href="/salas" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Salas</Link>
                    <Link href="/recamaras" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Recámaras</Link>
                    <Link href="/comedores" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Comedores</Link>
                    <Link href="/colchones" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Colchones</Link>
                    <Link href="/tv" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Muebles TV</Link>
                    <Link href="/otros" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Otros Muebles</Link>
                    <Link href="/nosotros" onClick={() => setMobileMenuOpen(false)} className="hover:text-[#CE2C3C] transition">Nosotros</Link>
                </div>
                <div className="border-t border-[#E4E4E7] pt-4 mt-auto">
                    <button className="w-full bg-[#CE2C3C] text-white py-2 rounded-md text-xs font-bold hover:bg-[#A8202D] transition shadow-sm mb-3">
                        Contáctanos
                    </button>
                </div>
            </div>
        </nav>
    );
}