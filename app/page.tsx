"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";


// Configuración de Strapi URL
const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

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

// Interfaces alineadas al 100% con tu schema.json de Strapi (v4 y v5)
interface StrapiMuebleCategoria {
  data?: {
    attributes?: {
      nombre?: string;
      icono?: string;
    }
  } | null;
  nombre?: string;
  icono?: string;
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


// Resuelve la URL completa de medios de Strapi (antepone http://localhost:1337)
function getStrapiMedia(url: string | null) {
  if (!url) return null;
  if (url.startsWith("http") || url.startsWith("//")) return url;
  return `${STRAPI_URL}${url}`;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Carga de datos de Strapi en el cliente
  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch(`${STRAPI_URL}/api/muebles?populate=*`);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const json: StrapiMueblesResponse = await res.json();

        const mapped = json.data.map((item: StrapiMueble) => {
          const attrs = item.attributes || item;

          // Parser dual robusto para Strapi v4 y v5 [2]
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

        setProducts(mapped);
      } catch (error) {
        console.error("Error al conectar con Strapi, cargando locales...", error);
        // Fallback local en caso de desconexión
        setProducts([
          { id: "1", nombre: "Sala Marruecos", categoria: "SALAS", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🛋️", imagenUrl: null },
          { id: "2", nombre: "C.E. Milán", categoria: "MUEBLES TV", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "📺", imagenUrl: null },
          { id: "3", nombre: "Recámara Porto", categoria: "RECÁMARAS", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🛏️", imagenUrl: null },
          { id: "4", nombre: "Comedor Nataly", categoria: "COMEDORES", badge_oferta: "Oferta 30%", tipo_oferta: "Hot Sale", foto_icono: "🪑", imagenUrl: null }
        ]);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  return (
    <div className="bg-[#FAFAFA] min-h-screen text-[#1A1A1A] font-sans antialiased">
      {/* HERO BANNER PRINCIPAL */}
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
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((item) => (
            <div key={`nuevo-${item.id}`} className="w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 bg-[#FEF9C3] text-[#854D0E] text-[10px] font-bold px-2 py-0.5 rounded-full z-10">Nuevo</span>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}?categoria=${encodeURIComponent(item.categoria)}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
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
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((item) => (
            <div key={`fav-${item.id}`} className="w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}?categoria=${encodeURIComponent(item.categoria)}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
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
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((item) => (
            <div key={`oferta-${item.id}`} className="w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">{item.badge_oferta || "Oferta 30%"}</span>
                <span className="absolute bottom-2 right-2 bg-[#FDE8EA] text-[#A8202D] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase z-10">{item.tipo_oferta || "Hot Sale"}</span>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}?categoria=${encodeURIComponent(item.categoria)}`} className="block w-full bg-[#CE2C3C] text-white text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
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
        <div className="flex gap-4 overflow-x-auto pb-2">
          {products.map((item) => (
            <div key={`destacado-${item.id}`} className="w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)] min-w-[240px] max-w-[320px] shrink-0 bg-white border border-[#E4E4E7] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-md hover:border-[#CE2C3C]">
              <div className="bg-[#F4F4F5] h-40 flex items-center justify-center relative overflow-hidden">
                <span className="absolute top-2 left-2 bg-red-100 text-red-700 text-[10px] font-bold px-2 py-0.5 rounded-full z-10">{item.badge_oferta || "Oferta 30%"}</span>
                <span className="absolute bottom-2 right-2 bg-[#FDE8EA] text-[#A8202D] text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase z-10">{item.tipo_oferta || "Hot Sale"}</span>
                {item.imagenUrl ? (
                  <img src={item.imagenUrl} alt={item.nombre} className="w-full h-full object-contain p-4 transition-transform duration-300 hover:scale-105" />
                ) : (
                  <span className="text-5xl opacity-80">{item.foto_icono}</span>
                )}
              </div>
              <div className="p-4">
                <span className="text-[10px] font-bold text-[#626264] tracking-wider uppercase">{item.categoria}</span>
                <h4 className="font-bold text-sm text-[#1A1A1A] mt-1 mb-4 h-10 line-clamp-2">{item.nombre}</h4>
                <Link href={`/producto/${item.id}?categoria=${encodeURIComponent(item.categoria)}`} className="block w-full bg-[#CE2C3C] text-[#FAFAFA] text-xs font-bold py-2.5 rounded-md text-center hover:bg-[#A8202D] transition">
                  Ver producto
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}