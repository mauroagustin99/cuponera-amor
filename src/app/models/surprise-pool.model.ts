export interface SurpriseOption {
  text: string;
  emoji: string;
  category: 'cita' | 'tranqui' | 'picante' | 'aire-libre';
  query: string; 
}

export const SURPRISE_POOL: SurpriseOption[] = [
  { 
    emoji: '🌭', 
    text: 'Cena gourmet: Vamos a comer unos panchos a algun carrito (dicen que Jorgito Jr esta bueno) con lluvia de papas.', 
    category: 'cita',
    query: 'hot dog eating funny'
  },
  { 
    emoji: '🍻', 
    text: 'Vamos a tomar unas birras a pichincha', 
    category: 'cita',
    query: 'beer cheers'
  },
  { 
    emoji: '🍦', 
    text: 'Heladito: Vamos a alguna heladería que nunca fuimos.', 
    category: 'cita',
    query: 'ice cream love'
  },
  { 
    emoji: '🏍️', 
    text: 'Paseo largo en moto por toda la costa', 
    category: 'aire-libre',
    query: 'motorcycle couple'
  },
  { 
    emoji: '🧉', 
    text: 'Tomamos unos mates con chipá en el parque.', 
    category: 'aire-libre',
    query: 'drinking mate argentina' 
  },
  { 
    emoji: '🥪', 
    text: 'Noche de Carlitos: A comer un buen carlito en Pellegrini (con papas ;).', 
    category: 'cita',
    query: 'sandwich eating'
  },
  { 
    emoji: '🍕', 
    text: 'Noche de Pizzas: Probemos un sabor distinto en Lo de Pedro, o vayamos a algun bar! ', 
    category: 'cita',
    query: 'pizza eating'
  },
  { 
    emoji: '🏛️', 
    text: 'Turistas por un día: Vamos al Monumento y subimos a la torre (si está abierta) o paseamos por el patio cívico.', 
    category: 'aire-libre',
    query: 'monument travel'
  },
  { 
    emoji: '🏖️', 
    text: 'Vamos a la isla', 
    category: 'aire-libre',
    query: 'beach sun'
  },
  { 
    emoji: '🏛️', 
    text: 'Turisteando: Visitemos algun museo!!', 
    category: 'aire-libre',
    query: 'monument travel'
  },
  { 
    emoji: '🍔', 
    text: 'Hamburguesa bajonera después de estudiar/trabajar (que no falte la coca).', 
    category: 'cita',
    query: 'burger eating'
  },

  { 
    emoji: '🏃‍♂️', 
    text: 'Dia de running con fotito linda para subir.', 
    category: 'aire-libre',
    query: 'jogging couple'
  },
  { 
    emoji: '🎨', 
    text: 'Noche de Pintura y Vino: Acuarelas , buscamos un diseño y tratamos de recrearlo como competencia', 
    category: 'tranqui',
    query: 'painting art funny'
  },
    { 
    emoji: '🎨', 
    text: 'Noche de plastimasa y Vino: Compramos plastimasa, buscamos modelos, y competimos a ver a quien le sale mejor', 
    category: 'tranqui',
    query: 'art funny couple'
  },
    { 
    emoji: '🛍️', 
    text: 'Paseo para el hogar: Vamos a bazares del centro a ver cosas para decorar tu casita juntos', 
    category: 'tranqui',
    query: 'shopping ' 
  },
  { 
    emoji: '🍳', 
    text: 'Desafío Masterchef: Cocinemos juntos algo que nunca hicimos (Sushi, Pizza casera, Tacos).', 
    category: 'tranqui',
    query: 'cooking fails' 
  },
  { 
    emoji: '🎲', 
    text: 'Tarde de Juegos de Mesa / Cartas (vale apostar prendas).', 
    category: 'tranqui',
    query: 'board games'
  },
  { 
    emoji: '🚲', 
    text: 'Calle Recreativa: Vamos el domingo a la mañana a caminar o bicicletear por Oroño.', 
    category: 'aire-libre',
    query: 'bicycle couple'
  },
  { 
    emoji: '📸', 
    text: 'Sesión de fotos: Vamos al Parque España con el matecito a sacarnos fotos buenas para tener recuerdos.', 
    category: 'aire-libre',
    query: 'taking photos'
  },
  { 
    emoji: '🛒', 
    text: 'Ir al súper juntos a comprar pavadas para la cena (plan de señores mayores).', 
    category: 'tranqui',
    query: 'shopping cart fun'
  },

  { 
    emoji: '💆‍♀️', 
    text: 'Masajes descontracturantes para vos (15 mins de reloj + besos).', 
    category: 'tranqui',
    query: 'massage relax'
  },
  { 
    emoji: '📺', 
    text: 'Maratón de una serie: 3 capítulos al hilo con caramelos o helado. (besos en el medio)', 
    category: 'tranqui',
    query: 'watching tv popcorn'
  },
  { 
    emoji: '📵', 
    text: 'Hora "Modo Avión": Dejamos los celus en un cajón y charlamos/tomamos algo una hora.', 
    category: 'tranqui',
    query: 'no phone talking'
  },
  { 
    emoji: '🥐', 
    text: 'Desayuno en la cama (yo me levanto antes a prepararlo).', 
    category: 'tranqui',
    query: 'breakfast in bed'
  },
  { 
    emoji: '🚿', 
    text: 'Ducha larga y relajante juntos (con música y sin apuro).', 
    category: 'picante',
    query: 'shower relax'
  },
  { 
    emoji: '👂', 
    text: 'Sesión de catarsis: Me contás todos los dramas de la facu/hospital y yo solo escucho y te doy la razón.', 
    category: 'tranqui',
    query: 'listening carefully'
  },
  { 
    emoji: '🎶', 
    text: 'Escuchar un disco entero acostados sin hacer nada más.', 
    category: 'tranqui',
    query: 'listening to music relax'
  },


  { 
    emoji: '🔥', 
    text: 'Vale por un Rapidito antes de seguir estudiando/trabajando.', 
    category: 'picante',
    query: 'sexy couple kissing'
  },
  { 
    emoji: '🃏', 
    text: 'Jugar a las cartas, pero el que pierde se saca una prenda.', 
    category: 'picante',
    query: 'strip poker'
  },
  { 
    emoji: '🛁', 
    text: 'Bañarnos juntos (para ahorrar agua, obvio).', 
    category: 'picante',
    query: 'couple bath'
  },
  { 
    emoji: '🧴', 
    text: 'Masajes con aceite (cuerpo entero).', 
    category: 'picante',
    query: 'sensual massage'
  },
  { 
    emoji: '👑', 
    text: 'Hoy vos mandás: Yo hago lo que vos me pidas.', 
    category: 'picante',
    query: 'queen crown'
  },
  { 
    emoji: '🔥', 
    text: 'Me contas lo que te gustaria hacer/probar y lo hacemos', 
    category: 'picante',
    query: 'adult toy'
  },

  // --- COMODINES ---
  { 
    emoji: '🎟️', 
    text: 'COMODÍN: Elegí cualquiera de las otras opciones de la lista.', 
    category: 'tranqui',
    query: 'golden ticket'
  },
  { 
    emoji: '❓', 
    text: 'Misterio: Vamos a caminar por oroño y entramos al primer lugarcito que nos guste para merendar', 
    category: 'cita',
    query: 'mystery box'
  }
];