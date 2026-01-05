"use client";
import { Instagram, Facebook, MessageCircle, Mail, Users, Gift, Smile, Award, Truck, ShieldCheck, CalendarDays, Wallet, Layers, MapPin } from 'lucide-react';

export default function Headers() {

  return (

    <header className="sticky top-0 z-50 bg-white border-b-2 border-regalo-rosa shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center font-bold text-regalo-rosa">
              <img src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1767021085/logo_pink_shop_mkqx5z.png" alt="Logo Pink Shop" className="w-12 h-12" />
            </div>
            <h1 className="text-xl font-black tracking-tighter">
              <a href='/'><span className="text-regalo-rosa">PINK </span>SHOP</a>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-regalo-azul-r">
            <a href="#productos" className="hover:text-regalo-rosa transition">Productos</a>
            <a href="#promociones" className="hover:text-regalo-rosa transition">Promociones</a>
            <a href="#servicios" className="hover:text-regalo-rosa transition">Servicios</a>
            <a href="#trayectoria" className="hover:text-regalo-rosa transition">Trayectoria</a>
            <a href="#contacto" className="hover:text-regalo-rosa transition">Contacto</a>
          </nav>
          <a 
        href="/dashboard" 
        className="p-2 rounded-full bg-gray-50 text-regalo-azul-c hover:text-regalo-rosa hover:bg-pink-50 transition-all active:scale-95"
        title="Panel de Administración"
      >
        <Users size={24} />
      </a>
        </div>
    </header>
    
  );
}