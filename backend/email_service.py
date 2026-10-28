"""
SMARTDEPT Backend - Email Service
Sends OTP emails via SMTP (async using aiosmtplib).
OTP is passed in, NEVER generated here - called from auth service.
"""
import ssl
import aiosmtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from config import get_settings

settings = get_settings()


def _build_otp_email(recipient: str, otp: str, user_name: str) -> MIMEMultipart:
    """Build a professional HTML OTP email."""
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"SmartDept Login OTP – {otp}"
    msg["From"] = settings.EMAIL_FROM
    msg["To"] = recipient

    html_body = f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
</head>
<body style="margin:0;padding:0;background:#F8FAFC;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;margin:40px auto;">
    <tr>
      <td style="background:#FFFFFF;border-radius:12px;border:1px solid #E2E8F0;overflow:hidden;">

        <!-- Header -->
        <div style="background:linear-gradient(135deg,#4F6EF7,#8B5CF6);padding:28px 32px;">
          <h1 style="margin:0;color:#FFFFFF;font-size:22px;font-weight:800;letter-spacing:-0.02em;">
            SmartDept
          </h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.8);font-size:13px;">
            Departmental Activity Platform
          </p>
        </div>

        <!-- Body -->
        <div style="padding:32px;">
          <p style="margin:0 0 8px;color:#0F172A;font-size:16px;font-weight:600;">
            Hello, {user_name}
          </p>
          <p style="margin:0 0 24px;color:#64748B;font-size:14px;line-height:1.6;">
            Use the one-time passcode below to sign in to SmartDept.
            This code is valid for <strong>{settings.OTP_EXPIRE_MINUTES} minutes</strong>.
          </p>

          <!-- OTP Box -->
          <div style="background:#F1F5F9;border:2px dashed #CBD5E1;border-radius:10px;padding:24px;text-align:center;margin:0 0 24px;">
            <p style="margin:0 0 6px;font-size:12px;color:#64748B;text-transform:uppercase;letter-spacing:0.08em;font-weight:600;">
              Your One-Time Passcode
            </p>
            <p style="margin:0;font-size:40px;font-weight:900;letter-spacing:0.18em;color:#4F6EF7;font-variant-numeric:tabular-nums;">
              {otp}
            </p>
          </div>

          <div style="background:#FEF3C7;border:1px solid #FDE68A;border-radius:8px;padding:12px 16px;margin:0 0 24px;">
            <p style="margin:0;font-size:12px;color:#92400E;">
              <strong>⚠ Security Notice:</strong> SmartDept staff will never ask you for this code.
              Do not share it with anyone. This code expires in {settings.OTP_EXPIRE_MINUTES} minutes and can only be used once.
            </p>
          </div>

          <p style="margin:0;color:#94A3B8;font-size:11px;">
            If you did not request this, you can safely ignore this email. Your account is secure.
          </p>
        </div>

        <!-- Footer -->
        <div style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:16px 32px;">
          <p style="margin:0;font-size:11px;color:#94A3B8;text-align:center;">
            SmartDept © 2026 • Departmental Activity Automation Platform
          </p>
        </div>
      </td>
    </tr>
  </table>
</body>
</html>
    """

    plain_body = f"""
SmartDept Login OTP

Hello {user_name},

Your one-time passcode is: {otp}

This code is valid for {settings.OTP_EXPIRE_MINUTES} minutes and can only be used once.

Do NOT share this code with anyone. SmartDept staff will never ask for it.

If you did not request this, please ignore this email.

- SmartDept Team
    """

    msg.attach(MIMEText(plain_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))
    return msg


async def send_otp_email(recipient_email: str, otp: str, user_name: str) -> None:
    """
    Send OTP via async SMTP.
    Raises exception if email delivery fails.
    """
    if not settings.SMTP_USER or not settings.SMTP_PASSWORD:
        # In dev mode without SMTP configured, print to console
        print(f"\n{'='*50}")
        print(f"  DEV MODE - OTP NOT SENT VIA EMAIL")
        print(f"  Recipient : {recipient_email}")
        print(f"  OTP       : {otp}")
        print(f"  Expires   : {settings.OTP_EXPIRE_MINUTES} minutes")
        print(f"{'='*50}\n")
        return

    message = _build_otp_email(recipient_email, otp, user_name)

    await aiosmtplib.send(
        message,
        hostname=settings.SMTP_HOST,
        port=settings.SMTP_PORT,
        username=settings.SMTP_USER,
        password=settings.SMTP_PASSWORD,
        start_tls=True,
    )
