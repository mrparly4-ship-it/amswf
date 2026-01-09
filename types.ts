
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  colors: string[]; // يمكن أن تكون أسماء ألوان أو أكواد Hex مثل #000000
  image: string;
  shippingFee: number;
  category: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  wilaya: string;
  baladiya: string;
  productId: string;
  productName: string;
  selectedColor: string;
  productPrice: number;
  shippingFee: number;
  totalPrice: number;
  date: string;
}

export interface Settings {
  telegramBotToken: string;
  telegramChatId: string;
  adminPassword: string;
  cloudBinId?: string;
}
