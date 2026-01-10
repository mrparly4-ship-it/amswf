
export const WILAYA_SHIPPING_FEES: Record<string, number> = {
  "Alger": 400,
  "Blida": 500, "Boumerdès": 500, "Tipaza": 500,
  "Oran": 700, "Constantine": 700, "Sétif": 600, "Anaba": 700, "Tlemcen": 700, "Chlef": 600,
  "Bejaïa": 600, "Batna": 600, "Biskra": 800, "Djelfa": 700, "Médéa": 600, "M'Sila": 700,
  "Tizi Ouzou": 600, "Skikda": 700, "Sidi Bel Abbès": 700, "Guelma": 700, "Bordj Bou Arréridj": 600,
  "Mascara": 700, "Mostaganem": 700, "Tiaret": 700, "Relizane": 700, "Ain Defla": 600,
  "Souk Ahras": 700, "El Tarf": 700, "Oum El Bouaghi": 700, "Tébessa": 700, "Khenchela": 700,
  "Mila": 700, "Ain Témouchent": 700, "Ghardaïa": 900, "Ouargla": 900, "El Oued": 900,
  "Laghouat": 800, "Bechar": 1000, "Adrar": 1200, "Tamanrasset": 1500, "Illizi": 1500,
  "Tindouf": 1500, "Naâma": 900, "El Bayadh": 900, "Tissemsilt": 700, "Saïda": 700, "Jijel": 700,
  "Timimoun": 1200, "Bordj Badji Mokhtar": 1500, "Ouled Djellal": 900, "Béni Abbès": 1200,
  "In Salah": 1500, "In Guezzam": 1500, "Touggourt": 900, "Djanet": 1500, "El M'Ghair": 900, "El Meniaa": 1000
};

export const ALGERIA_WILAYAS = Object.keys(WILAYA_SHIPPING_FEES).sort();

export const INITIAL_PRODUCTS = [
  {
    id: '1',
    name: 'رولكس ديت جست كلاسيك',
    price: 45000,
    description: 'ساعة رولكس كلاسيكية، مطلية بالذهب، مقاومة للماء مع ضمان سنة.',
    colors: ['أسود', 'ذهبي', 'فضي'],
    image: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800',
    shippingFee: 600,
    category: 'luxury'
  },
  {
    id: '2',
    name: 'باتيك فيليب نوتيلوس',
    price: 38000,
    description: 'تصميم رياضي أنيق مناسب لجميع المناسبات.',
    colors: ['كحلي', 'فضي'],
    image: 'https://images.unsplash.com/photo-1547996160-81dfa63595dd?auto=format&fit=crop&q=80&w=800',
    shippingFee: 600,
    category: 'sport'
  }
];
