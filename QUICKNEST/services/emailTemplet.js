export function generateEmailTemplate(templateData) {
  const {
    subject = "Welcome to QuickNest 🎉",
    userName = "User",
    buttonUrl = "#"
  } = templateData;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; overflow:hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; color:#ffffff; padding:30px; text-align:center;">
              <h1 style="margin:0;">Welcome to QuickNest 🚀</h1>
              <p style="margin:8px 0 0; font-size:14px;">Smart Booking Made Easy</p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px;">
              
              <p style="font-size:16px;">Hi ${userName},</p>

              <p style="font-size:15px; color:#555; line-height:1.6;">
                Welcome to <strong>QuickNest</strong>! 🎉  
                We're excited to have you on board.
              </p>

              <p style="font-size:15px; color:#555; line-height:1.6;">
                QuickNest is your all-in-one platform to easily discover, book, and manage services — 
                whether it's home services, professional help, or quick appointments.
              </p>

              <!-- Features -->
              <table width="100%" style="margin:20px 0;">
                <tr>
                  <td style="padding:10px 0;">
                    ✅ Easy Service Booking  
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    ✅ Secure & Reliable Platform  
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    ✅ Real-Time Availability  
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    ✅ Manage Your Bookings Anytime  
                  </td>
                </tr>
              </table>

              <!-- CTA Button -->
              <table align="center" cellpadding="0" cellspacing="0" style="margin:25px 0;">
                <tr>
                  <td align="center" bgcolor="#4f46e5" style="border-radius:5px;">
                    <a href="${buttonUrl}" 
                       style="display:inline-block; padding:12px 30px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold;">
                       Explore Services
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Extra Info -->
              <p style="font-size:14px; color:#777;">
                Need help getting started? Our support team is always here for you.
              </p>

              <p style="font-size:14px; color:#777;">
                Let’s make your booking experience smooth and fast with QuickNest 🚀
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #eee;"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px; text-align:center; font-size:12px; color:#999;">
              <p style="margin:5px 0;">© 2026 QUICKNEST. All rights reserved.</p>
              <p style="margin:5px 0;">
                <a href="#" style="color:#4f46e5; text-decoration:none;">Privacy Policy</a> |
                <a href="#" style="color:#4f46e5; text-decoration:none;">Terms</a> |
                <a href="#" style="color:#4f46e5; text-decoration:none;">Contact</a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}

export function generateResetPasswordTemplate(templateData) {
  const {
    subject = "Reset Your Password - QUICKNEST 🔐",
    userName = "User",
    resetLink = "#"
  } = templateData;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>${subject}</title>
</head>

<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="padding:20px 0;">
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table width="600" cellpadding="0" cellspacing="0" 
          style="background:#ffffff; border-radius:8px; overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#4f46e5; color:#ffffff; padding:30px; text-align:center;">
              <h1 style="margin:0;">QUICKNEST 🔐</h1>
              <p style="margin:8px 0 0; font-size:14px;">
                Password Reset Request
              </p>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:30px;">

              <p style="font-size:16px;">Hi ${userName},</p>

              <p style="font-size:15px; color:#555; line-height:1.6;">
                We received a request to reset your password for your 
                <strong>QUICKNEST</strong> account.
              </p>

              <p style="font-size:15px; color:#555; line-height:1.6;">
                Click the button below to create a new password and regain access to your account.
              </p>

              <!-- Reset Button -->
              <table align="center" cellpadding="0" cellspacing="0" style="margin:30px 0;">
                <tr>
                  <td align="center" bgcolor="#4f46e5" style="border-radius:5px;">
                    <a href="${resetLink}"
                      style="display:inline-block; padding:14px 32px; color:#ffffff; text-decoration:none; font-size:15px; font-weight:bold;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Fallback Link -->
              <p style="font-size:14px; color:#777; line-height:1.6;">
                If the button above doesn’t work, copy and paste this link into your browser:
              </p>

              <p style="font-size:13px; word-break:break-all; color:#4f46e5;">
                ${resetLink}
              </p>

              <!-- Security Note -->
              <p style="font-size:14px; color:#777; line-height:1.6;">
                This password reset link will expire shortly for security reasons.
              </p>

              <p style="font-size:14px; color:#777; line-height:1.6;">
                If you did not request a password reset, you can safely ignore this email.
              </p>

              <p style="font-size:14px; color:#777;">
                Thank you,<br />
                Team QUICKNEST 🚀
              </p>

            </td>
          </tr>

          <!-- Divider -->
          <tr>
            <td style="border-top:1px solid #eee;"></td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px; text-align:center; font-size:12px; color:#999;">
              <p style="margin:5px 0;">
                © 2026 QUICKNEST. All rights reserved.
              </p>

              <p style="margin:5px 0;">
                <a href="#" style="color:#4f46e5; text-decoration:none;">
                  Privacy Policy
                </a> |
                <a href="#" style="color:#4f46e5; text-decoration:none;">
                  Terms
                </a> |
                <a href="#" style="color:#4f46e5; text-decoration:none;">
                  Contact
                </a>
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `;
}


export default{ generateEmailTemplate,generateResetPasswordTemplate};