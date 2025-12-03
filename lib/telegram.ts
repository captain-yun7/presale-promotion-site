/**
 * Telegram Bot API 유틸리티
 * 상담 신청 시 관리자에게 텔레그램 알림을 전송합니다.
 */

interface ConsultationData {
  name: string;
  phone: string;
  message?: string;
  source?: string;
  project?: string;
}

interface TelegramResponse {
  ok: boolean;
  result?: unknown;
  description?: string;
}

/**
 * 텔레그램으로 메시지를 전송합니다.
 * 여러 Chat ID가 쉼표로 구분되어 있으면 모든 대상에게 전송합니다.
 */
export async function sendTelegramMessage(text: string): Promise<boolean> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = process.env.TELEGRAM_CHAT_IDS || process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatIds) {
    console.warn('[Telegram] 텔레그램 설정이 없습니다. TELEGRAM_BOT_TOKEN과 TELEGRAM_CHAT_IDS를 확인하세요.');
    return false;
  }

  // 쉼표로 구분된 Chat ID 배열로 변환
  const chatIdList = chatIds.split(',').map(id => id.trim()).filter(Boolean);

  if (chatIdList.length === 0) {
    console.warn('[Telegram] 유효한 Chat ID가 없습니다.');
    return false;
  }

  const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
  let allSuccess = true;

  // 모든 Chat ID에게 메시지 전송
  for (const chatId of chatIdList) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: 'HTML',
        }),
      });

      const data: TelegramResponse = await response.json();

      if (!data.ok) {
        console.error(`[Telegram] 메시지 전송 실패 (${chatId}):`, data.description);
        allSuccess = false;
      } else {
        console.log(`[Telegram] ✅ 메시지 전송 성공 (${chatId})`);
      }
    } catch (error) {
      console.error(`[Telegram] 메시지 전송 중 오류 (${chatId}):`, error);
      allSuccess = false;
    }
  }

  return allSuccess;
}

/**
 * 새 상담 신청 알림을 텔레그램으로 전송합니다.
 */
export async function sendConsultationNotification(data: ConsultationData): Promise<boolean> {
  const now = new Date();
  const formattedDate = now.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  const message = `
🔔 <b>새 상담 신청</b>

📅 <b>접수일시:</b> ${formattedDate}
👤 <b>이름:</b> ${data.name}
📞 <b>연락처:</b> ${data.phone}
${data.message ? `\n💬 <b>메시지:</b>\n${data.message}` : ''}
`.trim();

  return sendTelegramMessage(message);
}
