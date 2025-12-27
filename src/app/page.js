import data from '../data/productos.json';

export default function Home() {
  const { productos, redes } = data;

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* HEADER - Inspirado en el círculo azul celeste del logo */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-regalo-azul-c shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full border-2 border-regalo-rosa flex items-center justify-center font-bold text-regalo-rosa">
              <img src="https://res-console.cloudinary.com/dzgqpqv9f/thumbnails/v1/image/upload/v1766853724/V2hhdHNBcHBfSW1hZ2VfMjAyNS0xMi0yNl9hdF84LjQ0LjM3X3AubS5fMV90Z2JjN2M=/template_primary/ZV9iYWNrZ3JvdW5kX3JlbW92YWwvY19jcm9wLHdfODAwLGhfODAwLGFyXzE6MSxmX3BuZw==" alt="Logo Tiempo Para Regalar" className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-black tracking-tighter">
              <span className="text-regalo-azul-r">TIEMPO PARA</span> <span className="text-regalo-rosa">REGALAR</span>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-regalo-azul-r">
            <a href="#productos" className="hover:text-regalo-verde transition">Productos</a>
            <a href="#promociones" className="hover:text-regalo-verde transition">Promociones</a>
            <a href="#contacto" className="hover:text-regalo-verde transition">Contacto</a>
          </nav>
        </div>
      </header>

      {/* SECCIÓN PRODUCTOS - Grid dinámico */}
      <section id="productos" className="container mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Nuestros <span className="text-regalo-verde">productos</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productos.map((item) => (
            <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300">
              <div className="relative h-64 overflow-hidden">
                <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-regalo-rosa shadow">
                  {item.categoria}
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold mb-2 group-hover:text-regalo-azul-c transition">{item.nombre}</h3>
                <p className="text-2xl font-black text-regalo-azul-r mb-4">${item.precio}</p>
                <button className="bg-regalo-verde hover:bg-regalo-rosa text-white w-full py-3 rounded-xl font-bold transition-colors">
                  Ver Detalle
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN PROMOCIONES - Color Rosa del Logo */}
      <section id="promociones" className="bg-regalo-rosa py-20 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6 italic underline decoration-regalo-verde">¡PROMO DEL MES!</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8 font-light">
            Encuentra el detalle perfecto con un 15% de descuento en tu primera compra usando el código 
            <span className="font-bold block text-3xl mt-2 tracking-widest text-regalo-azul-r">REGALO2025</span>
          </p>
        </div>
      </section>

      {/* CONTACTO Y REDES - Iconos simulados con texto */}
      <section id="contacto" className="py-16 bg-gray-50 border-t">
        <div className="container mx-auto px-4 flex flex-col items-center">
          <h3 className="text-2xl font-bold text-regalo-azul-r mb-8 text-center">Conéctate con Nosotros</h3>
          <div className="flex gap-8 mb-12">
            {redes.map((red) => (
              <a key={red.nombre} href={red.url} className={`text-lg font-bold transition-colors ${red.color}`}>
                {red.nombre}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-regalo-azul-c text-white py-12">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold text-regalo-verde mb-4">TIEMPO PARA REGALAR</h4>
            <p className="text-sm opacity-80">Haciendo que cada segundo cuente con el regalo ideal.</p>
          </div>
          <div>
            <h4 className="font-bold text-regalo-azul-c mb-4">UBICACIÓN</h4>
            <p className="text-sm opacity-80">Calle Principal 123<br/>Ciudad Programación, CP 2025</p>
          </div>
          <div>
            <h4 className="font-bold text-regalo-rosa mb-4">HORARIOS</h4>
            <p className="text-sm opacity-80">Lun - Vie: 9am a 8pm<br/>Sábados: 10am a 4pm</p>
          </div>
        </div>
        <div className="mt-12 text-center text-xs opacity-80 border-t border-white/20 pt-6">
          © 2025 Tiempo Para Regalar. Diseñado por <a href='https://servitectonala.com' className='font-bold text-regalo-rosa' target='_blank'>SERVITEC.</a>
        </div>
      </footer>
    </div>
  );
}