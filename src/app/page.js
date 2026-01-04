"use client";
import { useState, useMemo, useEffect } from 'react';
import { Instagram, Facebook, MessageCircle, Mail, Users, Gift, Smile, Award, Truck, ShieldCheck, CalendarDays, Wallet, Layers, MapPin } from 'lucide-react';
import Counter from '../components/Counter';

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [imgIndexModal, setImgIndexModal] = useState(0);
  const [error, setError] = useState(null);
  
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("Todas");
  const [orden, setOrden] = useState("default");

  useEffect(() => {
    async function cargarProductos() {
      try {
        const res = await fetch('/api/productos');
        if (!res.ok) throw new Error("No se pudo conectar con la base de datos");
        const data = await res.json();
        

        const productosFormateados = data.map(p => ({
          ...p,
          id: p.id_producto, 
          precio: p.precio_oferta, 
          precioOriginal: p.precio_original,
          imagenes: p.imagenes ? p.imagenes.split(' | ') : [], 
          colores: p.colores ? p.colores.split(', ') : []      
        }));

        setProductos(productosFormateados);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    cargarProductos();
  }, []);

  // OBTENER CATEGORÍAS ÚNICAS
  const categorias = useMemo(() => {
    return ["Todas", ...new Set(productos.map(p => p.categoria))];
  }, [productos]);

  // LÓGICA DE FILTRADO Y ORDENADO
  const productosFiltrados = useMemo(() => {
    let resultado = productos.filter((p) => {
      const coincideBusqueda = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
      const coincideCategoria = categoria === "Todas" || p.categoria === categoria;
      return coincideBusqueda && coincideCategoria;
    });

    const resultadoOrdenado = [...resultado];

    if (orden === "default") {
      resultadoOrdenado.sort((a, b) => {
        const prioridad = { "mas vendidos": 1, "nuevo": 2, "normal": 3 };
        const aPrio = prioridad[a.estado] || 3;
        const bPrio = prioridad[b.estado] || 3;
        return aPrio - bPrio;
      });
    } else if (orden === "precio-bajo") {
      resultadoOrdenado.sort((a, b) => a.precio - b.precio);
    } else if (orden === "precio-alto") {
      resultadoOrdenado.sort((a, b) => b.precio - a.precio);
    } else if (orden === "nuevos") {
      resultadoOrdenado.sort((a, b) => (a.estado === "nuevo" ? -1 : b.estado === "nuevo" ? 1 : 0));
    }

    return resultadoOrdenado;
  }, [productos, busqueda, categoria, orden]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
       <div className="animate-bounce text-regalo-rosa font-bold">Cargando PINK SHOP...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      
      {/* HEADER - Inspirado en el círculo azul celeste del logo */}
      <header className="sticky top-0 z-50 bg-white border-b-2 border-regalo-rosa shadow-sm">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-12 h-12 rounded-full  flex items-center justify-center font-bold text-regalo-rosa">
              <img src="https://res.cloudinary.com/dzgqpqv9f/image/upload/v1767021085/logo_pink_shop_mkqx5z.png" alt="Logo Tiempo Para Regalar" className="w-12 h-12" />
            </div>
            <h1 className="text-xl font-black tracking-tighter">
              <a href='/'><span className="text-regalo-rosa">PINK SHOP</span></a>
            </h1>
          </div>
          <nav className="hidden md:flex gap-6 font-medium text-regalo-azul-r">
            <a href="#productos" className="hover:text-regalo-rosa transition">Productos</a>
            <a href="#promociones" className="hover:text-regalo-rosa transition">Promociones</a>
            <a href="#servicios" className="hover:text-regalo-rosa transition">Servicios</a>
            <a href="#trayectoria" className="hover:text-regalo-rosa transition">Trayectoria</a>
            <a href="#contacto" className="hover:text-regalo-rosa transition">Contacto</a>
          </nav>
        </div>
      </header>

      <h2 id="productos" className="scroll-mt-24 text-3xl font-bold text-center py-6">
        Nuestros <span className="text-regalo-verde">productos</span>
      </h2>
      {/* BARRA DE FILTROS */}
      <section className="bg-white border-b border-gray-200 py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-center md:justify-start">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-500 uppercase">Categoría:</span>
            <select 
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-regalo-azul-c"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
            >
              {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm text-gray-500 uppercase">Ordenar por:</span>
            <select 
              className="bg-gray-50 border border-gray-200 rounded-lg px-3 py-1 outline-none focus:ring-2 focus:ring-regalo-azul-c"
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
            >
              <option value="default">Relevancia</option>
              <option value="precio-bajo">Precio: Menor a Mayor</option>
              <option value="precio-alto">Precio: Mayor a Menor</option>
              <option value="nuevos">Recién llegados (Nuevos)</option>
            </select>
          </div>
          {/* BARRA DE BÚSQUEDA */}
          <div className="relative w-full md:w-96">
            <input 
              type="text"
              placeholder="Buscar un regalo..."
              className=" w-full px-4 py-2 rounded-full border-2 border-gray-100 focus:border-regalo-azul-c outline-none transition"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
          </div>
          <p className="text-sm text-gray-400 ml-auto italic">
            Mostrando {productosFiltrados.length} resultados
          </p>
        </div>
      </section>
      {/* GRID DE PRODUCTOS */}
      <section className="max-w-7xl mx-auto py-12 px-4">
      {productosFiltrados.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {productosFiltrados.map((producto) => (
            <TarjetaProducto 
              key={producto.id} 
              producto={producto} 
              onOpenModal={() => setProductoSeleccionado(producto)}
            />
          ))}
        </div>
      ) : (
        /* Mostrar mensaje de no resultados solo si no hay error */
        !error && (
          <div className="text-center py-20 border-2 border-dashed rounded-3xl">
            <h3 className="text-xl font-bold text-gray-400">No encontramos resultados</h3>
          </div>
        )
      )}
      </section>
      {/* SECCIÓN DE ALERTAS Y FEEDBACK */}
      <section className="max-w-7xl mx-auto px-4 mt-6">
        {/* ERROR TÉCNICO (Archivo dañado o datos nulos) */}
        {error && (
          <div className="bg-red-50 border-l-4 border-regalo-rosa p-4 rounded-r-xl my-4">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <div>
                <h3 className="text-regalo-rosa font-bold">Error de sistema</h3>
                <p className="text-sm text-gray-600">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* ERROR DE FILTRO (No se encontró nada con esa búsqueda) */}
        {!error && productosFiltrados.length === 0 && (
          <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <div className="text-5xl mb-4">🔍</div>
            <h3 className="text-xl font-bold text-gray-400">¡Ups! No encontramos coincidencias</h3>
            <p className="text-gray-400 mb-6">Prueba con otras palabras o cambia la categoría.</p>
            <button 
              onClick={() => {setBusqueda(""); setCategoria("Todas"); setOrden("default");}}
              className="bg-regalo-azul-c text-white px-6 py-2 rounded-full font-bold hover:bg-regalo-azul-r transition"
            >
              Ver todos los productos
            </button>
          </div>
        )}
        </section>
        {/* MODAL DE DETALLE */}
        {productoSeleccionado && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto relative shadow-2xl">
              <button 
                onClick={() => {
                  setProductoSeleccionado(null);
                  setImgIndexModal(0); // Reiniciar el índice al cerrar
                }}
                className="absolute top-4 right-4 z-10 bg-white/80 backdrop-blur-md w-10 h-10 rounded-full flex items-center justify-center text-gray-500 hover:text-regalo-rosa shadow-md transition-colors font-bold"
              >✕</button>
              
              <div className="flex flex-col md:flex-row">
                {/* LADO IZQUIERDO: CARRUSEL DEL MODAL */}
                <div className="md:w-1/2 relative bg-gray-100">
                  <img 
                    src={productoSeleccionado.imagenes[imgIndexModal]} 
                    alt={productoSeleccionado.nombre} 
                    className="w-full h-full object-cover transition-opacity duration-500" 
                  />
                  
                  {/* Controles del Carrusel */}
                  {productoSeleccionado.imagenes.length > 1 && (
                    <>
                      <button 
                        onClick={() => setImgIndexModal((prev) => (prev - 1 + productoSeleccionado.imagenes.length) % productoSeleccionado.imagenes.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg text-regalo-azul-r hover:bg-regalo-azul-c hover:text-white transition-all"
                      >❮</button>
                      
                      <button 
                        onClick={() => setImgIndexModal((prev) => (prev + 1) % productoSeleccionado.imagenes.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-3 rounded-full shadow-lg text-regalo-azul-r hover:bg-regalo-azul-c hover:text-white transition-all"
                      >❯</button>

                      {/* Indicadores (Dots) */}
                      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                        {productoSeleccionado.imagenes.map((_, i) => (
                          <button 
                            key={i}
                            onClick={() => setImgIndexModal(i)}
                            className={`h-2 rounded-full transition-all ${i === imgIndexModal ? 'w-8 bg-regalo-rosa' : 'w-2 bg-white/70'}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>

                {/* LADO DERECHO: INFORMACIÓN */}
                <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3">
                  <span className="text-regalo-azul-c font-bold text-sm uppercase tracking-widest">
                    {productoSeleccionado.categoria}
                  </span>
                  {productoSeleccionado.vendidos > 10 && (
                    <span className="bg-orange-100 text-orange-600 px-2 py-0.5 rounded-md text-[10px] font-black uppercase">
                      🔥 Popular
                    </span>
                  )}
                </div>
                  <h3 className="text-4xl font-black text-regalo-azul-r mt-2 leading-tight">{productoSeleccionado.nombre}</h3>
                  <p className="text-sm text-gray-500 font-medium mt-1">
                    Más de <span className="font-bold text-gray-800">{productoSeleccionado.vendidos} personas</span> han regalado esto.
                  </p>
                  
                  <p className="text-gray-600 mt-6 text-lg leading-relaxed">{productoSeleccionado.descripcion}</p>
                  
                  <div className="mt-8">
                    <p className="font-bold text-gray-800">Colores disponibles:</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {productoSeleccionado.colores.map(c => (
                        <span key={c} className="px-4 py-2 bg-gray-50 rounded-xl text-sm font-medium border border-gray-100 text-gray-700 italic">
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 mt-10 p-6 bg-regalo-azul-c/5 rounded-3xl">
                    <p className="text-5xl font-black text-regalo-verde">${productoSeleccionado.precio}</p>
                    {productoSeleccionado.precioOriginal && (
                      <div className="flex flex-col border-l-2 border-gray-200 pl-4">
                        <span className="text-gray-400 line-through text-base">${productoSeleccionado.precioOriginal}</span>
                        <span className="text-regalo-rosa font-black text-sm">
                          -{Math.round(100 - (productoSeleccionado.precio * 100 / productoSeleccionado.precioOriginal))}% OFF
                        </span>
                      </div>
                    )}
                  </div>

                  <button 
                  onClick={() => {
                      const telefono = "5219619326182"; 
                      const mensaje = `Hola PINK SHOP! 👋 Me interesa obtener más información sobre: 
                  *${productoSeleccionado.nombre}* Precio: *$${productoSeleccionado.precio}* ¿Tienen disponibilidad?`;
                      
                      const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;
                      window.open(url, '_blank');
                    }}
                    className="mt-8 w-full bg-[#25D366] hover:bg-[#128C7E] text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl flex items-center justify-center gap-3 group"
                  >
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                    </svg>
                    Preguntar por WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      <section id="promociones" className="scroll-mt-24 bg-regalo-lila py-6 text-white">
      {/*
      <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-black mb-6 italic underline decoration-regalo-verde">¡PROMO DE FIN DE AÑO!</h2>
          <p className="text-xl max-w-2xl mx-auto mb-4 font-light">
            Encuentra el detalle perfecto con un <span className='text-2xl font-black'>10%</span> de descuento en tu segunda compra usando el código 
            <span className="font-bold block text-3xl mt-2 tracking-widest text-regalo-rosa">ADIOS2025</span>
          </p>
        </div>
      */}
        
      </section>

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

    <section id='trayectoria' className="scroll-mt-24 py-24 bg-[#0A192F] relative overflow-hidden">
      {/* Elementos decorativos de fondo (Círculos de luz) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-regalo-azul-r/20 rounded-full blur-[120px]"></div>
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-regalo-rosa/20 rounded-full blur-[120px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tight">
            NUESTRA <span className="text-regalo-azul-c">TRAYECTORIA</span> EN NÚMEROS
          </h2>
          <p className="text-gray-400 mt-2 font-medium">Resultados que hablan de nuestro compromiso</p>
          <div className="h-1 w-20 bg-regalo-rosa mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Tarjeta 1 */}
          <StatCardDarkMode 
            icon={<Users size={32} />} 
            target="500" 
            label="Clientes Satisfechos" 
            symbol="+"
            accentColor="text-regalo-azul-c"
          />
          {/* Tarjeta 2 */}
          <StatCardDarkMode 
            icon={<Gift size={32} />} 
            target="2200" 
            label="Regalos Enviados" 
            symbol="+"
            accentColor="text-regalo-rosa"
          />
          {/* Tarjeta 3 */}
          <StatCardDarkMode 
            icon={<Smile size={32} />} 
            target="100" 
            label="Felicidad Garantizada" 
            symbol="%"
            accentColor="text-regalo-verde"
          />
          {/* Tarjeta 4 */}
          <StatCardDarkMode 
            icon={<Award size={32} />} 
            target="4" 
            label="Años de Experiencia" 
            symbol=""
            accentColor="text-white"
          />
        </div>
      </div>
    </section>

    {/*
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
    */
    }

      <footer className="bg-regalo-azul-c text-white py-2">
        {/* OPCIONAL 
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h4 className="font-bold text-regalo-verde mb-4">TIEMPO PARA REGALAR</h4>
            <p className="text-sm opacity-80">Haciendo que cada segundo cuente con el regalo ideal.</p>
          </div>
          <div>
            <h4 className="font-bold text-regalo-azul-c mb-4">UBICACIÓN</h4>
            <p className="text-sm opacity-80">Tonalá, Chiapas<br/>C.P. 30500</p>
          </div>
          <div>
            <h4 className="font-bold text-regalo-rosa mb-4">HORARIOS</h4>
            <p className="text-sm opacity-80">Lun - Vie: 9am a 8pm<br/>Sábados: 10am a 4pm</p>
          </div>
        </div>
        */}
        <div className="my-2 text-center font-black text-xs opacity-80 border-t border-white/20 py-2">
          © 2026 PINK SHOP. Diseñado por <a href='https://servitectonala.com' className='font-bold text-regalo-rosa' target='_blank'>SERVITEC.</a>
        </div>
      </footer>
    </div>
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

const StatCardDarkMode = ({ icon, target, label, symbol, accentColor }) => (
  <div className="relative group p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 text-center">
    {/* Icono con resplandor */}
    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-white/10 ${accentColor} shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    
    {/* Número animado */}
    {symbol === '%' ? (
      <div className="text-5xl font-black text-white mb-2 tabular-nums tracking-tighter">
        <Counter target={target} />{symbol}
      </div>
    ) : (
      <div className="text-5xl font-black text-white mb-2 tabular-nums tracking-tighter">
        {symbol}<Counter target={target} />
      </div>
    )}
    
    
    {/* Etiqueta */}
    <p className="text-gray-400 font-bold uppercase text-[10px] tracking-[0.3em]">
      {label}
    </p>

    {/* Línea decorativa inferior que crece al hacer hover */}
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-1 bg-regalo-azul-c group-hover:w-12 transition-all duration-500 rounded-full"></div>
  </div>
);
const Badge = ({ estado }) => {
  if (!estado) return null;
  
  const estilos = {
    nuevo: "bg-regalo-verde text-white",
    agotado: "bg-gray-500 text-white",
    oferta: "bg-regalo-amarillo text-red-800",
  };

  return (
    <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase shadow-md z-10 ${estilos[estado] || "bg-regalo-lila text-white"}`}>
      {estado}
    </span>
  );
};


// Sub-componente para la Tarjeta con Carrusel
function TarjetaProducto({ producto, onOpenModal }) {
  const [imgIndex, setImgIndex] = useState(0);

  const nextImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev + 1) % producto.imagenes.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setImgIndex((prev) => (prev - 1 + producto.imagenes.length) % producto.imagenes.length);
  };
  

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border-2 border-transparent hover:border-regalo-lila transition-all duration-300 shadow-lg hover:shadow-2xl">
      {/* Carrusel */}
      <div className="relative h-80 overflow-hidden bg-gray-200">
      <Badge estado={producto.estado} />
        <img src={producto.imagenes[imgIndex]} alt={producto.nombre} className="w-full h-full group-hover:scale-110 object-cover transition-transform duration-500" />
        <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full text-xs font-bold text-regalo-rosa shadow">
                  {producto.categoria}
                </div>
        {producto.imagenes.length > 1 && (
          <>
            <button onClick={prevImg} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-regalo-azul-r">❮</button>
            <button onClick={nextImg} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full hover:bg-white text-regalo-azul-r">❯</button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {producto.imagenes.map((_, i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i === imgIndex ? 'bg-regalo-rosa' : 'bg-white/50'}`} />
                
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 text-center">
        {/* Texto de cantidad vendida */}
        {producto.vendidos > 0 && (
          <p className="text-xs font-bold text-gray-400 mb-1 flex items-center justify-center gap-1">
            <span className="text-regalo-rosa">★</span> +{producto.vendidos} vendidos
          </p>
        )}
        <h3 className="text-xl font-bold mb-2 group-hover:text-regalo-rosa transition">{producto.nombre}</h3>
        {/* Lógica de Precios */}
          <div className="flex justify-center items-center gap-3 mb-4">
          {producto.precioOriginal && (
            <span className="text-gray-400 line-through text-lg">${producto.precioOriginal}</span>
          )}
          <p className="text-2xl font-black text-regalo-verde">${producto.precio}</p>
        </div>
      <button 
        disabled={producto.estado === 'agotado'}
        onClick={onOpenModal}
        className={`w-full py-3 rounded-xl font-bold transition-colors shadow-md hover:shadow-xl ${
          producto.estado === 'agotado' 
          ? 'bg-gray-300 cursor-not-allowed' 
          : 'bg-regalo-verde hover:bg-regalo-rosa text-white'
        }`}
      >
        {producto.estado === 'agotado' ? 'Sin Stock' : 'Ver Detalle'}
      </button>
      </div>
    </div>
  );
}