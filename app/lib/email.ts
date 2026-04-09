import { Resend } from "resend"

// Initialize Resend client lazily to avoid errors during module evaluation
let resend: Resend | null = null

function getResendClient(): Resend | null {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey || apiKey === "re_xxxxxxxxxx") {
      console.warn(
        "RESEND_API_KEY is not configured or is using placeholder value. Email functionality will be disabled.",
      )
      return null
    }
    resend = new Resend(apiKey)
  }
  return resend
}

export interface BookingEmailData {
  to: string
  customerName: string
  bookingCode: string
  packageName: string
  studioName: string
  date: string
  startTime: string
  endTime: string
  price: number
}

export async function sendBookingConfirmationEmail(data: BookingEmailData) {
  try {
    const client = getResendClient()
    const { error } = await client.emails.send({
      from: "H5 Creative <onboarding@resend.dev>",
      to: data.to,
      subject: `Konfirmasi Booking - ${data.bookingCode}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Konfirmasi Booking</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #4920E5 0%, #ec4899 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .booking-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #666;
            }
            .value {
              color: #333;
            }
            .total-price {
              font-size: 24px;
              font-weight: bold;
              color: #4920E5;
              text-align: center;
              margin: 20px 0;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #4920E5 0%, #ec4899 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Konfirmasi Booking</h1>
            <p>Terima kasih telah melakukan booking!</p>
          </div>
          <div class="content">
            <p>Halo ${data.customerName},</p>
            <p>Booking Anda telah berhasil dibuat. Berikut adalah detail booking Anda:</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Kode Booking:</span>
                <span class="value">${data.bookingCode}</span>
              </div>
              <div class="detail-row">
                <span class="label">Paket:</span>
                <span class="value">${data.packageName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Studio:</span>
                <span class="value">${data.studioName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Tanggal:</span>
                <span class="value">${data.date}</span>
              </div>
              <div class="detail-row">
                <span class="label">Waktu:</span>
                <span class="value">${data.startTime} - ${data.endTime}</span>
              </div>
            </div>
            
            <div class="total-price">
              Total: Rp ${data.price.toLocaleString("id-ID")}
            </div>
            
            <p>Silakan lengkapi pembayaran untuk mengkonfirmasi booking Anda. Anda akan menerima email notifikasi setelah pembayaran selesai.</p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking/pending?bookingCode=${data.bookingCode}" class="button">
                Lihat Status Booking
              </a>
            </div>
            
            <div class="footer">
              <p>Jika Anda memiliki pertanyaan, hubungi kami di support@h5creative.com</p>
              <p>&copy; 2025 H5 Creative. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Failed to send booking confirmation email:", error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending booking confirmation email:", error)
    return { success: false, error }
  }
}

export async function sendPaymentConfirmationEmail(data: BookingEmailData) {
  try {
    const client = getResendClient()
    const { error } = await client.emails.send({
      from: "H5 Creative <onboarding@resend.dev>",
      to: data.to,
      subject: `Pembayaran Berhasil - ${data.bookingCode}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Pembayaran Berhasil</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              background: linear-gradient(135deg, #10b981 0%, #059669 100%);
              color: white;
              padding: 30px;
              text-align: center;
              border-radius: 10px 10px 0 0;
            }
            .content {
              background: #f9f9f9;
              padding: 30px;
              border-radius: 0 0 10px 10px;
            }
            .success-icon {
              font-size: 60px;
              color: #10b981;
              text-align: center;
              margin: 20px 0;
            }
            .booking-details {
              background: white;
              padding: 20px;
              border-radius: 8px;
              margin: 20px 0;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            .detail-row {
              display: flex;
              justify-content: space-between;
              padding: 10px 0;
              border-bottom: 1px solid #eee;
            }
            .detail-row:last-child {
              border-bottom: none;
            }
            .label {
              font-weight: 600;
              color: #666;
            }
            .value {
              color: #333;
            }
            .button {
              display: inline-block;
              background: linear-gradient(135deg, #4920E5 0%, #ec4899 100%);
              color: white;
              padding: 15px 30px;
              text-decoration: none;
              border-radius: 8px;
              font-weight: bold;
              margin-top: 20px;
            }
            .footer {
              text-align: center;
              margin-top: 30px;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Pembayaran Berhasil!</h1>
            <p>Terima kasih atas pembayaran Anda</p>
          </div>
          <div class="content">
            <div class="success-icon">✓</div>
            
            <p>Halo ${data.customerName},</p>
            <p>Pembayaran untuk booking Anda telah berhasil dikonfirmasi! Booking Anda sekarang telah dikonfirmasi dan siap untuk dilaksanakan.</p>
            
            <div class="booking-details">
              <div class="detail-row">
                <span class="label">Kode Booking:</span>
                <span class="value">${data.bookingCode}</span>
              </div>
              <div class="detail-row">
                <span class="label">Paket:</span>
                <span class="value">${data.packageName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Studio:</span>
                <span class="value">${data.studioName}</span>
              </div>
              <div class="detail-row">
                <span class="label">Tanggal:</span>
                <span class="value">${data.date}</span>
              </div>
              <div class="detail-row">
                <span class="label">Waktu:</span>
                <span class="value">${data.startTime} - ${data.endTime}</span>
              </div>
              <div class="detail-row">
                <span class="label">Total:</span>
                <span class="value">Rp ${data.price.toLocaleString("id-ID")}</span>
              </div>
            </div>
            
            <p>Silakan simpan email ini sebagai bukti booking Anda. Kami akan mengirimkan pengingat lebih dekat dengan tanggal booking Anda.</p>
            
            <div style="text-align: center;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/booking/success?bookingCode=${data.bookingCode}" class="button">
                Lihat Detail Booking
              </a>
            </div>
            
            <div class="footer">
              <p>Jika Anda memiliki pertanyaan, hubungi kami di support@h5creative.com</p>
              <p>&copy; 2025 H5 Creative. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error("Failed to send payment confirmation email:", error)
      return { success: false, error }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending payment confirmation email:", error)
    return { success: false, error }
  }
}
