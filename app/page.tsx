import React from "react";
import Link from "next/link";
import {
  Search, User, ShoppingCart, Truck, PhoneCall, Percent, Medal
} from "lucide-react";

// Configuración de Strapi URL
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";

// Interfaz para el tipado interno de productos en Next.js
interface Product {
  id: string;
  nombre: string;
  categoria: string;
  badge_oferta?: string;
  tipo_oferta?: string;
  foto_icono?: string;
  imagenUrl?: string | null; // Almacenará la URL optimizada de la foto
}

// Interfaces alineadas al 100% con tu schema.json de Strapi
interface StrapiMuebleCategoria {
  data?: {
    attributes?: {
      nombre?: string;
      icono?: string;
    }
  } | null;
}

interface StrapiMuebleImagen {
  data?: Array<{
    id: number;
    attributes?: {
      url: string;
    };
    url?: string;
  }> | null;
}

interface StrapiMueble {
  id?: number | string;
  documentId?: string;
  attributes?: {
    nombre?: string;
    categoria?: StrapiMuebleCategoria;
    imagen_producto?: StrapiMuebleImagen;
    badge_oferta?: string;
    tipo_oferta?: string;
  };
  nombre?: string;
  categoria?: StrapiMuebleCategoria;
  imagen_producto?: StrapiMuebleImagen;
  badge_oferta?: string;
  tipo_oferta?: string;
}

interface StrapiMueblesResponse {
  data: StrapiMueble[];
}

// Icono personalizado de Facebook (SVG directo de marca)
const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

// Icono personalizado de Instagram (SVG directo de marca)
const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

// Icono personalizado de WhatsApp (SVG directo de marca)
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

// Resuelve la URL completa de medios de Strapi (antepone http://localhost:1337)
function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

// Petición al backend de Strapi para obtener productos del catálogo (con populate de relaciones)
async function getStrapiProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${STRAPI_URL}/api/muebles?populate=*`, {
      next: { revalidate: 3600 } // Revalidar caché cada hora (ISR)
    });
    
    // MEJORA: Imprime el código de estado HTTP real (ej. 403 o 404)
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
    }
    
    const json: StrapiMueblesResponse = await res.json();
    
    return json.data.map((item: StrapiMueble) => {
      const attrs = item.attributes || item;
      
      const catData = attrs.categoria?.data?.attributes || attrs.categoria || {};
      const categoriaNombre = catData.nombre || "Muebles";
      const categoriaIcono = catData.icono || "🛋️";

      const fotoData = attrs.imagen_producto?.data || attrs.imagen_producto || null;
      let fotoUrl = null;
      if (Array.isArray(fotoData) && fotoData.length > 0) {
        const primeraFoto = fotoData[0];
        const fotoAttrs = primeraFoto.attributes || primeraFoto;
        fotoUrl = fotoAttrs.url || null;
      }

      return {
        id: item.documentId || String(item.id),
        nombre: attrs.nombre ?? "Producto sin nombre",
        categoria: categoriaNombre.toUpperCase(),
        badge_oferta: attrs.badge_oferta,
        tipo_oferta: attrs.tipo_oferta,
        foto_icono: categoriaIcono,
        imagenUrl: getStrapiMedia(fotoUrl)
      };
    });
  } catch (error: unknown) {
    // Esto imprimirá el error exacto (ej. HTTP Error: 403 Forbidden)
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error al conectar con la API de Strapi, cargando fallback local:", errorMessage);
    
    // FALLBACK
    return [
      { id: "1", nombre: "Sala Marruecos", categoria: "SALAS", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🛋️", imagenUrl: null },
      { id: "2", nombre: "C.E. Milán", categoria: "MUEBLES TV", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "📺", imagenUrl: null },
      { id: "3", nombre: "Recámara Porto", categoria: "RECÁMARAS", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🛏️", imagenUrl: null },
      { id: "4", nombre: "Comedor Nataly", categoria: "COMEDORES", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🪑", imagenUrl: null }
    ];
  }
}

export default async function HomePage() {
  const products = await getStrapiProducts();

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1A1A1A] font-sans antialiased">

      {/* BARRA SUPERIOR ROJA */}
      <div className="bg-[#CE2C3C] text-white text-[11px] md:text-[13px] font-medium text-center py-2 px-4 tracking-wide">
        Descuento adicional en tu primera compra mayor a $10,000 | Garantía por defecto de fabrica | Soporte en línea
      </div>

      {/* NAVBAR PRINCIPAL (Pegajoso) */}
      <nav className="bg-[#F4F4F5] border-b border-[#E4E4E7] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Logo y Código Postal */}
          <div className="flex flex-col">
            <Link href="/" className="font-extrabold text-2xl text-[#CE2C3C] tracking-tight leading-none">
              Mueblerías Ahorramás
            </Link>
            <span className="text-[11px] text-[#626264] mt-1.5 flex items-center gap-1 cursor-pointer hover:text-[#CE2C3C]">
              📍 Enviar a: <strong className="underline">Seleccionar C.P.</strong>
            </span>
          </div>

          {/* Buscador Activo Central */}
          <div className="w-full max-w-lg relative flex items-center">
            <input
              type="text"
              placeholder="Busca salas, recámaras, comedores, colchones ..."
              className="w-full bg-white border border-[#E4E4E7] rounded-lg py-2 pl-4 pr-10 text-sm outline-none focus:border-[#CE2C3C] transition"
            />
            <Search className="w-4 h-4 text-[#626264] absolute right-3" />
          </div>

          {/* Acciones del Navbar */}
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition">
              <ShoppingCart className="w-4 h-4" /> Carrito
            </button>
            <button className="flex items-center gap-1.5 text-sm font-semibold text-[#626264] hover:text-[#CE2C3C] transition">
              <User className="w-4 h-4" /> Cuenta
            </button>
            <button className="bg-[#CE2C3C] text-white px-4 py-1.5 rounded-full text-xs font-bold hover:bg-[#A8202D] transition">
              Contáctanos
            </button>
          </div>
        </div>

        {/* Sub-barra de categorías */}
        <div className="border-t border-[#E4E4E7] bg-white py-2">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-center gap-6 overflow-x-auto text-[13px] font-semibold text-[#626264]">
            <Link href="/" className="text-[#CE2C3C]">Inicio</Link>
            <Link href="/salas" className="hover:text-[#CE2C3C] transition">Salas</Link>
            <Link href="/recamaras" className="hover:text-[#CE2C3C] transition">Recámaras</Link>
            <Link href="/comedores" className="hover:text-[#CE2C3C] transition">Comedores</Link>
            <Link href="/colchones" className="hover:text-[#CE2C3C] transition">Colchones</Link>
            <Link href="/tv" className="hover:text-[#CE2C3C] transition">Muebles Tv</Link>
            <Link href="/otros" className="hover:text-[#CE2C3C] transition">Otros Muebles</Link>
            <Link href="/nosotros" className="hover:text-[#CE2C3C] transition">Nosotros</Link>
          </div>
        </div>
      </nav>

      {/* HERO BANNER PRINCIPAL (Fijo/Sincronizado) */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="bg-gradient-to-r from-[#FCE8EA] to-[#FCDCE1] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#E4E4E7] overflow-hidden relative">
          <div className="max-w-lg z-10">
            <span className="bg-white/80 text-[#CE2C3C] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Especial de Temporada</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1A1A1A] mt-4 leading-tight font-title">
              El Regalo Perfecto <br />para <span className="text-[#CE2C3C]">Mamá</span>
            </h2>
            <p className="text-zinc-600 mt-4 text-sm md:text-base">
              Aprovecha descuentos reales y flete gratis directo a domicilio en todo Chiapas y Tabasco.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center text-center bg-[#CE2C3C] text-white p-8 rounded-full w-64 h-64 border-4 border-white shadow-lg animate-pulse shrink-0">
            <span className="text-xs uppercase tracking-widest font-bold opacity-90">Toda la tienda</span>
            <span className="text-5xl font-black mt-1">40%</span>
            <span className="text-xl font-bold">+ 35%</span>
            <span className="text-xs font-extrabold uppercase mt-1">DESCUENTO + REGALO*</span>
          </div>
        </div>
      </section>

      {/* SECCIÓN 1: LO MÁS NUEVO */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold font-title flex items-center gap-1.5">
            Lo más <span className="text-[#CE2C3C]">nuevo</span>
          </h3>
          <p className="text-sm text-[#626264] mt-0.5">Lo recién agregado en esta temporada</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((item) => (
            <div key={`nuevo-${item.id}`} className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              {/* Contenedor adaptado con medidas estáticas responsivas de Next.js */}
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 bg-[#FEF9C3] text-[#854D0E] text-[10px] font-bold px-2 py-0.5 rounded-full z-10">Nuevo</span>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} width={300} height={160} className="object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
                  Ver producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: FAVORITOS */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold font-title">Favoritos</h3>
          <p className="text-sm text-[#626264] mt-0.5">Los mejores calificados de los usuarios</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((item) => (
            <div key={`fav-${item.id}`} className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} width={300} height={160} className="object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
                  Ver producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 3: EN OFERTA */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold font-title">En <span className="text-[#CE2C3C]">oferta</span></h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((item) => (
            <div key={`oferta-${item.id}`} className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">{item.badge_oferta || "Oferta 30%"}</span>
                <span className="absolute bottom-2 right-2 bg-[#FDE8EA] text-[#A8202D] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase z-10">{item.tipo_oferta || "Hot Sale"}</span>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} width={300} height={160} className="object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
                  Ver producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 4: PRODUCTOS DESTACADOS */}
      <section className="max-w-7xl mx-auto px-6 mt-12 mb-16">
        <div className="mb-6">
          <h3 className="text-2xl font-extrabold font-title">Productos <span className="text-[#CE2C3C]">destacados</span></h3>
          <p className="text-sm text-[#626264] mt-0.5">Los más vendidos de esta temporada</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((item) => (
            <div key={`destacado-${item.id}`} className="bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">{item.badge_oferta || "Oferta 30%"}</span>
                <span className="absolute bottom-2 right-2 bg-[#FDE8EA] text-[#A8202D] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase z-10">{item.tipo_oferta || "Hot Sale"}</span>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} width={300} height={160} className="object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
                  Ver producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TRUST STRIP (MUEBLERÍAS AHORRAMÁS) */}
      <section className="bg-white border-t border-b border-[#E4E4E7] py-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 text-[#CE2C3C] rounded-lg"><Truck className="w-5 h-5" /></div>
            <div><strong className="text-xs md:text-sm block">ENVÍO A DOMICILIO</strong><span className="text-[11px] md:text-xs text-[#626264]">A ciudades de Chiapas y Tabasco *</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 text-[#CE2C3C] rounded-lg"><PhoneCall className="w-5 h-5" /></div>
            <div><strong className="text-xs md:text-sm block">CONTACTANOS</strong><span className="text-[11px] md:text-xs text-[#626264]">Soporte en línea directo</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-50 text-[#CE2C3C] rounded-lg"><Percent className="w-5 h-5" /></div>
            <div><strong className="text-xs md:text-sm block">DESCUENTOS</strong><span className="text-[11px] md:text-xs text-[#626264]">En órdenes mayores a $10,000 [5, 12]</span></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="trust-icon bg-red-50 rounded-lg p-2.5 text-[#CE2C3C]">
              <Medal className="w-5 h-5" />
            </div>
            <div className="trust-text">
              <strong className="block text-sm font-semibold text-[#1A1A1A]">GARANTIA</strong>
              <span className="text-[11px] md:text-xs text-[#626264]">6 meses por defecto de fábrica [12]</span>
            </div>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="bg-[#F4F4F5] py-12 border-b border-[#E4E4E7]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg font-bold font-title">Recibe nuestras ofertas</h4>
            <p className="text-xs text-[#626264] mt-1">Suscríbete y sé el primero en enterarte de descuentos y nuevos modelos.</p>
          </div>
          <div className="flex w-full md:w-auto max-w-md gap-2">
            <input type="email" placeholder="tu@correo.com" className="bg-white border border-[#E4E4E7] rounded-md px-4 py-2 text-sm flex-1 outline-none focus:border-[#CE2C3C]" />
            <button className="bg-[#CE2C3C] text-white text-xs font-bold px-6 py-2.5 rounded-md hover:bg-[#A8202D] transition">Suscribirme</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#18181B] text-zinc-400 py-12 text-[13px] border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <div className="font-extrabold text-lg text-white mb-4">
              Mueblerías <span className="text-[#CE2C3C]">Ahorramás</span>
            </div>
            <p className="line-clamp-4 leading-relaxed mb-6">
              La cadena de mueblerías número 1 en Chiapas y Tabasco. Calidad y elegancia a precios inigualables desde 2003.
            </p>
            <div className="flex gap-2">
              <span className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-[#CE2C3C] hover:text-white cursor-pointer transition">
                <FacebookIcon className="w-4 h-4" />
              </span>
              <span className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-[#CE2C3C] hover:text-white cursor-pointer transition">
                <InstagramIcon className="w-4 h-4" />
              </span>
              {/* Se añade el icono de WhatsApp en el footer tal como en el mockup */}
              <span className="w-8 h-8 rounded-md bg-zinc-800 flex items-center justify-center hover:bg-[#CE2C3C] hover:text-white cursor-pointer transition">
                <WhatsAppIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Categorías</h5>
            <ul className="space-y-2">
              <li><Link href="/salas" className="hover:text-white">Salas</Link></li>
              <li><Link href="/recamaras" className="hover:text-white">Recámaras</Link></li>
              <li><Link href="/comedores" className="hover:text-white">Comedores</Link></li>
              <li><Link href="/tv" className="hover:text-white">Muebles TV</Link></li>
              <li><Link href="/colchones" className="hover:text-white">Colchones</Link></li>
              <li><Link href="/otrosMuebles" className="hover:text-white">Otros muebles</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Empresa</h5>
            <ul className="space-y-2">
              <li><Link href="/nosotros" className="hover:text-white">Sobre nosotros</Link></li>
              <li><Link href="/sucursales" className="hover:text-white">Sucursales</Link></li>
              <li><Link href="/privacidad" className="hover:text-white">Política de privacidad</Link></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold text-white mb-4">Contacto</h5>
            <p className="mb-2">📞 9632684589</p>
            <p className="mb-2">📍 Las Margaritas, Chiapas, México</p>
            <p>✉️ info@muebleriasahorramas.com.mx</p>
          </div>
        </div>
      </footer>

      {/* COPYRIGHT */}
      <div className="bg-[#0F0F10] text-[11px] text-zinc-600 py-4 text-center">
        Copyright © 2003 Mueblerías Ahorra Mas. Todos los derechos reservados.
      </div>

    </div>
  );
}