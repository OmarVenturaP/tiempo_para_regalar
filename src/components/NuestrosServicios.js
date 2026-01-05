"use client";
import { Instagram, Facebook, MessageCircle, Mail, Users, Gift, Smile, Award, Truck, ShieldCheck, CalendarDays, Wallet, Layers, MapPin } from 'lucide-react';
import Counter from '../components/Counter';

export default function NuestrosSericios() {

  return (

    <section id='servicios' className="scroll-mt-24 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-black text-regalo-azul-r italic leading-tight">
              MÁS QUE UN REGALO, <br />
              <span className="text-regalo-rosa">UNA EXPERIENCIA</span>
            </h2>
            <p className="text-gray-500 mt-4 font-medium">
              En <span className="text-regalo-rosa">PINK SHOP</span> nos esforzamos por ofrecerte el mejor servicio y calidad en cada detalle.
            </p>
          </div>
          <div className="hidden md:block">
            <span className="text-sm font-black text-gray-300  uppercase rotate-90 inline-block origin-right">
              Servicios
            </span>
          </div>
        </div>

        {/* Cuadrícula de Beneficios */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-8">
          
          {/* Envío Local */}
          <BenefitItem 
            icon={<MapPin size={32} />}
            title="ENVIOS EN TONALA"
            description="¡Gratis en compras mayores a $399! Entregamos en la puerta de tu casa o trabajo dentro de la ciudad."
            color="text-regalo-azul-c"
          />

          {/* Calidad */}
          <BenefitItem 
            icon={<ShieldCheck size={32} />}
            title="CALIDAD GARANTIZADA"
            description="Seleccionamos cuidadosamente cada producto para asegurar que recibas solo lo mejor."
            color="text-regalo-verde"
          />

          {/* Temporadas */}
          <BenefitItem 
            icon={<CalendarDays size={32} />}
            title="SIEMPRE A LA MODA"
            description="Contamos con productos especiales para cada temporada."
            color="text-regalo-rosa"
          />

          {/* Precios */}
          <BenefitItem 
            icon={<Wallet size={32} />}
            title="PRECIOS ACCESIBLES"
            description="Regalos increíbles que se ajustan a tu presupuesto sin sacrificar la elegancia ni calidad."
            color="text-regalo-azul-r"
          />

          {/* Variedad */}
          <BenefitItem 
            icon={<Layers size={32} />}
            title="GRAN VARIEDAD"
            description="Desde tecnología hasta regalos pequeños. Tenemos algo para cada tipo de persona."
            color="text-regalo-azul-c"
          />

          {/* Envíos Nacionales */}
          <BenefitItem 
            icon={<Truck size={32} />}
            title="ENVIOS A TODO MÉXICO"
            description="¿Estás fuera de Tonalá, Chiapas? Enviamos a todo México por las mejores paqueterías (FedEx, DHL, Estafeta)."
            color="text-regalo-verde"
          />

        </div>
      </div>
    </section>
  );
  
}

const BenefitItem = ({ icon, title, description, color }) => (
  <div className="flex gap-6 group">
    <div className={`shrink-0 w-14 h-14 rounded-2xl bg-gray-50 flex items-center justify-center ${color} transition-colors group-hover:bg-white group-hover:shadow-xl duration-300`}>
      {icon}
    </div>
    <div>
      <h3 className="text-xl font-extrabold text-gray-800 mb-2 group-hover:text-regalo-azul-r transition-colors">
        {title}
      </h3>
      <p className="text-gray-500 leading-relaxed text-sm font-medium">
        {description}
      </p>
    </div>
  </div>
);