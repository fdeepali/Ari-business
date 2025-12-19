import nodemailer from "nodemailer";
import validator from "validator";
import dotenv from "dotenv";
dotenv.config();

/**
 * GMAIL SMTP TRANSPORT
 */
const transporter = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_APP_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("[MAIL] Transport verify error:", error);
  } else {
    console.log("[MAIL] Transport is ready to send messages");
  }
});

/**
 * Generic Email Sender
 */
export const sendEmail = async ({ to, subject, text, html, replyTo }) => {
  console.log("[MAIL] sendEmail called with:", { to, subject, replyTo });

  if (!validator.isEmail(to)) {
    console.error("[MAIL] Invalid recipient email:", to);
    throw new Error("Invalid recipient email");
  }

  const mailOptions = {
    from: replyTo,
    to,
    subject,
    replyTo: replyTo || process.env.GMAIL_APP_USER,
    text: text || "",
    html: html || `<pre>${text}</pre>`,
  };

  console.log("[MAIL] Mail options prepared (without html body for brevity):", {
    ...mailOptions,
    html: html ? "[HTML CONTENT]" : "[AUTO-GENERATED FROM TEXT]",
  });

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("[MAIL] Email sent successfully:", {
      messageId: info.messageId,
      accepted: info.accepted,
      rejected: info.rejected,
      response: info.response,
    });
    return info;
  } catch (err) {
    console.error("[MAIL] Error while sending email:", err);
    throw err;
  }
};

/**
 * Contact Form Email (NOT questionnaire — this is separate)
 */
export const sendContactForm = async ({ name, email, phone, storeUrl, goals }) => {
  console.log("[MAIL] sendContactForm called with:", {
    name,
    email,
    phone,
    storeUrl,
    goalsLength: goals ? goals.length : 0,
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form - ARI BUSINESS NETWORK</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc;">
        <div style="max-width: 700px; margin: 0 auto; background: #ffffff;">
            <!-- Header Section -->
            <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); padding: 30px 40px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                    ARI BUSINESS NETWORK
                </h1>
                <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px; font-weight: 300;">
                    Professional E-commerce & Business Solutions
                </p>
            </div>

            <!-- Main Content -->
            <div style="padding: 40px;">
                <!-- Notification Banner -->
                <div style="background: #f0f9ff; border-left: 4px solid #0369a1; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                    <h2 style="color: #0c4a6e; margin: 0 0 8px 0; font-size: 20px; display: flex; align-items: center;">
                        📩 New Contact Form Submission
                    </h2>
                    <p style="color: #475569; margin: 0; font-size: 14px;">
                        A potential client has submitted the contact form. Follow up promptly to convert this lead.
                    </p>
                </div>

                <!-- Client Information -->
                <div style="margin-bottom: 35px;">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="width: 4px; height: 24px; background: #1e3a8a; border-radius: 2px; margin-right: 12px;"></div>
                        <h3 style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600;">
                            👤 Client Information
                        </h3>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px;">
                        <table style="width: 100%; border-collapse: collapse;">
                            <tr>
                                <td style="width: 30%; padding: 12px 15px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Full Name</td>
                                <td style="width: 70%; padding: 12px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9; font-weight: 500;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 15px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Email Address</td>
                                <td style="padding: 12px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                    <a href="mailto:${email}" style="color: #0369a1; text-decoration: none; font-weight: 500;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 15px; color: #64748b; font-weight: 600; border-bottom: 1px solid #f1f5f9; vertical-align: top;">Phone Number</td>
                                <td style="padding: 12px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                    <a href="tel:${phone}" style="color: #0369a1; text-decoration: none; font-weight: 500;">${phone}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px 15px; color: #64748b; font-weight: 600; vertical-align: top;">Amazon Store URL</td>
                                <td style="padding: 12px 15px; color: #1e293b;">
                                    ${
                                      storeUrl
                                        ? `<a href="${storeUrl}" target="_blank" style="color: #0369a1; text-decoration: none; font-weight: 500; word-break: break-all;">${storeUrl}</a>`
                                        : `<span style="color: #94a3b8; font-style: italic;">Not provided</span>`
                                    }
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <!-- Business Goals -->
                <div style="margin-bottom: 35px;">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="width: 4px; height: 24px; background: #1e3a8a; border-radius: 2px; margin-right: 12px;"></div>
                        <h3 style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600;">
                            🎯 Business Goals & Objectives
                        </h3>
                    </div>
                    <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 25px;">
                        <div style="color: #1e293b; line-height: 1.6; font-size: 15px; white-space: pre-line;">${goals}</div>
                    </div>
                </div>

                <!-- Lead Quality Indicator -->
                <div style="margin-bottom: 35px;">
                    <div style="display: flex; align-items: center; margin-bottom: 20px;">
                        <div style="width: 4px; height: 24px; background: #1e3a8a; border-radius: 2px; margin-right: 12px;"></div>
                        <h3 style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600;">
                            📊 Lead Quality Assessment
                        </h3>
                    </div>
                    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px;">
                        <div style="display: flex; flex-wrap: wrap; gap: 15px; justify-content: center;">
                            <div style="text-align: center; padding: 15px; background: ${
                              storeUrl ? "#dcfce7" : "#fef2f2"
                            }; border-radius: 8px; min-width: 120px;">
                                <div style="font-size: 24px; margin-bottom: 8px;">${
                                  storeUrl ? "✅" : "❌"
                                }</div>
                                <div style="font-size: 12px; color: #475569; font-weight: 600;">Amazon Store</div>
                                <div style="font-size: 11px; color: #64748b;">${
                                  storeUrl ? "Provided" : "Not Provided"
                                }</div>
                            </div>
                            <div style="text-align: center; padding: 15px; background: ${
                              phone ? "#dcfce7" : "#fef2f2"
                            }; border-radius: 8px; min-width: 120px;">
                                <div style="font-size: 24px; margin-bottom: 8px;">${
                                  phone ? "✅" : "❌"
                                }</div>
                                <div style="font-size: 12px; color: #475569; font-weight: 600;">Phone Number</div>
                                <div style="font-size: 11px; color: #64748b;">${
                                  phone ? "Provided" : "Not Provided"
                                }</div>
                            </div>
                            <div style="text-align: center; padding: 15px; background: ${
                              goals && goals.length > 20 ? "#dcfce7" : "#fef2f2"
                            }; border-radius: 8px; min-width: 120px;">
                                <div style="font-size: 24px; margin-bottom: 8px;">${
                                  goals && goals.length > 20 ? "✅" : "❌"
                                }</div>
                                <div style="font-size: 12px; color: #475569; font-weight: 600;">Detailed Goals</div>
                                <div style="font-size: 11px; color: #64748b;">${
                                  goals && goals.length > 20 ? "Comprehensive" : "Basic"
                                }</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Action Buttons -->
                <div style="text-align: center; padding: 30px 0 10px 0;">
                    <a href="mailto:${email}" 
                      style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 0 10px; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3); transition: all 0.3s ease;">
                      ✉️ Email Client
                    </a>
                    <a href="tel:${phone}" 
                      style="display: inline-block; background: #10b981; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 0 10px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3); transition: all 0.3s ease;">
                      📞 Call Client
                    </a>
                    ${
                      storeUrl
                        ? `
                    <a href="${storeUrl}" target="_blank" 
                      style="display: inline-block; background: #f59e0b; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 0 10px; box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3); transition: all 0.3s ease;">
                      🛍️ View Store
                    </a>
                    `
                        : ""
                    }
                </div>

                <!-- Quick Actions -->
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-top: 30px;">
                    <h4 style="color: #475569; margin: 0 0 15px 0; font-size: 14px; text-align: center; font-weight: 600;">QUICK ACTIONS</h4>
                    <div style="display: flex; justify-content: center; gap: 10px; flex-wrap: wrap;">
                        <span style="background: #ffffff; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; font-size: 12px; color: #475569;">
                            📅 Schedule Meeting
                        </span>
                        <span style="background: #ffffff; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; font-size: 12px; color: #475569;">
                            💼 Send Proposal
                        </span>
                        <span style="background: #ffffff; border: 1px solid #e2e8f0; padding: 8px 16px; border-radius: 6px; font-size: 12px; color: #475569;">
                            📋 Add to CRM
                        </span>
                    </div>
                </div>

                <!-- Footer -->
                <div style="text-align: center; padding: 30px 0 0 0; border-top: 1px solid #e2e8f0; margin-top: 30px;">
                    <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
                        This lead was generated through ARI BUSINESS NETWORK contact form.
                    </p>
                    <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                        © ${new Date().getFullYear()} ARI BUSINESS NETWORK. All rights reserved. | Professional E-commerce Solutions
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
    `;

  console.log("[MAIL] Contact form HTML length:", htmlContent.length);

  return sendEmail({
    to: "info@aribusinessnetwork.com",
    subject: `New Contact Form - ${name}`,
    html: htmlContent,
    replyTo: email,
  });
};
