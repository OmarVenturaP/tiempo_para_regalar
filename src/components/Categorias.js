"use client";

export default function SoftCategorias() {

  return (
    <section className="scroll-mt-24 py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col items-center mb-12 text-center">
          <span className="text-regalo-rosa font-black uppercase text-xs tracking-[0.3em] mb-2">Contamos con productos especiales</span>
          <h2 className="text-4xl md:text-5xl font-black text-back-400 tracking-tighter">
            UNICOS E <span className="text-regalo-rosa">INIGUALABLES</span>
          </h2>
          <div className="w-20 h-1.5 bg-regalo-rosa rounded-full mt-4"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { nombre: 'Accesorios', img: 'https://res.cloudinary.com/dzgqpqv9f/image/upload/v1767637624/ACC_n5zn8f.png', color: 'bg-pink-50' },
            { nombre: 'Regalos', img: 'https://res.cloudinary.com/dzgqpqv9f/image/upload/t_logo-bg/v1767632406/Captura_de_pantalla_2026-01-05_a_la_s_10.57.55_a.m._ept4cj.png', color: 'bg-blue-50' },
            { nombre: 'Tecnología', img: 'https://res.cloudinary.com/dzgqpqv9f/image/upload/v1767638655/Gadgets_zfr0ya.png', color: 'bg-purple-50' },
            { nombre: 'Mochilas', img: 'https://res.cloudinary.com/dzgqpqv9f/image/upload/v1767638417/backpack_q511z4.png', color: 'bg-yellow-50' }
          ].map((cat, i) => (
            <div 
              key={i} 
              className={`group cursor-pointer ${cat.color} p-8 rounded-[2.5rem] flex flex-col items-center justify-center border-2 border-transparent hover:border-regalo-rosa transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-xl`}
            >
              <div className="w-20 h-20 mb-4 transform group-hover:rotate-12 transition-transform duration-500">
                {/* Aquí iría un icono o ilustración 3D */}
                <img src={cat.img} alt={cat.nombre} className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-regalo-azul-r text-lg tracking-tight">{cat.nombre}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}