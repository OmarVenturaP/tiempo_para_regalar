"use client";
import { Instagram, Facebook, MessageCircle, Mail } from 'lucide-react';

export default function Contacto() {

  return (

    <section id="contacto" className="scroll-mt-24 py-20 bg-white border-t border-gray-100">
    <div className="container mx-auto px-4 flex flex-col items-center">
      <h3 className="text-3xl font-black text-regalo-azul-r mb-2 text-center italic">
        ¿TIENES DUDAS?
      </h3>
      <p className="text-gray-500 mb-10 text-center">Estamos listos para ayudarte a elegir el mejor regalo.</p>
      
      <div className="flex flex-wrap justify-center gap-10 md:gap-16">
        {data.redes.map((red) => {
          // Lógica para asignar el icono según el nombre en el JSON
          const renderIcon = () => {
            switch (red.nombre.toLowerCase()) {
              case 'instagram': return <Instagram size={32} />;
              case 'facebook': return <Facebook size={32} />;
              case 'whatsapp': return <MessageCircle size={32} />;
              default: return <Mail size={32} />;
            }
          };

          // Colores de hover basados en tu logo
          const hoverColors = {
            instagram: "hover:text-regalo-rosa hover:scale-110",
            facebook: "hover:text-regalo-azul-r hover:scale-110",
            whatsapp: "hover:text-regalo-verde hover:scale-110",
            default: "hover:text-regalo-azul-c hover:scale-110"
          };

          const estiloHover = hoverColors[red.nombre.toLowerCase()] || hoverColors.default;

          return (
            <a 
              key={red.nombre} 
              href={red.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`flex flex-col items-center gap-3 text-gray-400 transition-all duration-300 ${estiloHover}`}
            >
              <div className="p-4 rounded-2xl bg-gray-50 shadow-sm border border-gray-100">
                {renderIcon()}
              </div>
              <span className="text-sm font-bold uppercase tracking-widest">
                {red.nombre}
              </span>
            </a>
          );
        })}
      </div>
    </div>
  </section>

  );
  
}
