"use client";

export default function Footer() {

  return (

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
      © 2026 PINK SHOP. Diseñado por <a href='https://servitec-app.vercel.app/' className='font-bold text-regalo-rosa' target='_blank'>SERVITEC.</a>
    </div>
  </footer>

  );
  
}
