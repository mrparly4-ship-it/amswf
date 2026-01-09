
import { Order } from '../types';

export const sendOrderToTelegram = async (order: Order, botToken: string, chatId: string) => {
  const message = `
📦 **طلب جديد من AM STORE**
━━━━━━━━━━━━━━
👤 **الزبون:** ${order.customerName}
📞 **الهاتف:** ${order.phone}
📍 **الموقع:** ${order.wilaya} - ${order.baladiya}

⌚ **المنتج:** ${order.productName}
🎨 **اللون المختار:** ${order.selectedColor}

💰 **تفاصيل السعر:**
- سعر الساعة: ${order.productPrice.toLocaleString()} دج
- مصاريف التوصيل: ${order.shippingFee.toLocaleString()} دج
━━━━━━━━━━━━━━
💵 **الإجمالي المطلوب:** ${order.totalPrice.toLocaleString()} دج
━━━━━━━━━━━━━━
📅 ${order.date}
`;

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      }),
    });
    return response.ok;
  } catch (error) {
    console.error('Telegram Error:', error);
    return false;
  }
};
