import Questionnaire from "../models/DB_Questionnaire.js";
import { sendEmail } from "./emailController.js";

export const submitQuestionnaire = async (req, res) => {
  try {
    console.log("✅ submitQuestionnaire HIT");
    console.log("[QUESTIONNAIRE] Raw body:", JSON.stringify(req.body, null, 2));

    const data = req.body;

    // Validate required fields
    if (!data?.contactInfo?.name || !data?.contactInfo?.email) {
      console.warn("[QUESTIONNAIRE] Missing contact name/email:", {
        name: data?.contactInfo?.name,
        email: data?.contactInfo?.email,
      });

      return res.status(400).json({
        success: false,
        message: "Missing required contact details: name or email.",
      });
    }

    if (!data?.businessDetails || Object.keys(data.businessDetails).length === 0) {
      console.warn("[QUESTIONNAIRE] Business details missing or empty");
      return res.status(400).json({
        success: false,
        message: "Business details are missing.",
      });
    }

    console.log("[QUESTIONNAIRE] Validation passed for:", {
      name: data.contactInfo.name,
      email: data.contactInfo.email,
    });

    // Save to DB
    console.log("[QUESTIONNAIRE] Saving document to DB...");
    const saved = await Questionnaire.create(data);
    console.log("[QUESTIONNAIRE] Saved to DB with id:", saved._id);

    // -----------------------------
    // BUILD DYNAMIC BUSINESS DETAILS TABLE
    // -----------------------------
    let businessTableRows = "";

    console.log(
      "[QUESTIONNAIRE] Building businessDetails table rows. Keys:",
      Object.keys(data.businessDetails)
    );

    for (const [key, value] of Object.entries(data.businessDetails)) {
      const formattedKey = key
        .replace(/_/g, " ")
        .replace(/([A-Z])/g, " $1")
        .replace(/\b\w/g, (c) => c.toUpperCase());

      const formattedValue = Array.isArray(value)
        ? value.join(", ")
        : value || "-";

      businessTableRows += `
        <tr>
          <td style="padding:10px;border-bottom:1px solid #f1f5f9;color:#64748b;font-weight:600;">
            ${formattedKey}
          </td>
          <td style="padding:10px;border-bottom:1px solid #f1f5f9;color:#1e293b;">
            ${formattedValue}
          </td>
        </tr>
      `;
    }

    console.log(
      "[QUESTIONNAIRE] businessTableRows length:",
      businessTableRows.length
    );

    // -----------------------------
    // EMAIL HTML TEMPLATE
    // -----------------------------
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Segoe UI',Arial,sans-serif;">
  <div style="max-width:700px;margin:0 auto;background:#ffffff;">

    <!-- HEADER -->
    <div style="background:linear-gradient(135deg,#1e3a8a,#3730a3);padding:30px;text-align:center;color:white;">
      <h1 style="margin:0;font-size:28px;font-weight:700;">ARI BUSINESS NETWORK</h1>
      <p style="margin:5px 0 0;font-size:14px;opacity:.85;">Amazon Growth & Business Solutions</p>
    </div>

    <!-- BANNER -->
    <div style="background:#f0f9ff;border-left:4px solid #0369a1;padding:20px;margin:30px;border-radius:6px;">
      <h2 style="margin:0;font-size:20px;color:#0c4a6e;">📩 New Questionnaire Submission</h2>
      <p style="margin-top:8px;color:#475569;font-size:14px;">
        A new client has submitted the Amazon onboarding questionnaire.
      </p>
    </div>

    <!-- CONTACT INFO -->
    <div style="padding:30px;">
      <h3 style="color:#1e293b;border-left:4px solid #1e3a8a;padding-left:10px;">👤 Contact Information</h3>
      <table style="width:100%;border-collapse:collapse;margin-top:15px;">
        <tr><td style="padding:10px;font-weight:600;color:#64748b;">Name</td><td style="padding:10px;">${data.contactInfo.name}</td></tr>
        <tr>
          <td style="padding:10px;font-weight:600;color:#64748b;">Email</td>
          <td style="padding:10px;"><a href="mailto:${data.contactInfo.email}" style="color:#0369a1;text-decoration:none;">${data.contactInfo.email}</a></td>
        </tr>
        <tr>
          <td style="padding:10px;font-weight:600;color:#64748b;">Phone</td>
          <td style="padding:10px;"><a href="tel:${data.contactInfo.phone}" style="color:#0369a1;text-decoration:none;">${data.contactInfo.phone}</a></td>
        </tr>
        <tr><td style="padding:10px;font-weight:600;color:#64748b;">Business Name</td><td style="padding:10px;">${data.contactInfo.businessName || "-"}</td></tr>
      </table>
    </div>

    <!-- BUSINESS DETAILS -->
    <div style="padding:30px;padding-top:10px;">
      <h3 style="color:#1e293b;border-left:4px solid #1e3a8a;padding-left:10px;">🏭 Business Details</h3>

      <table style="width:100%;border-collapse:collapse;margin-top:15px;">
        ${businessTableRows}
      </table>
    </div>

    <!-- ACTION BUTTONS -->
    <div style="text-align:center;padding:30px 0;">
      <a href="mailto:${data.contactInfo.email}" 
        style="background:#1e3a8a;color:white;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;margin-right:10px;">
        ✉️ Reply to Client
      </a>
      <a href="tel:${data.contactInfo.phone}" 
        style="background:#10b981;color:white;padding:12px 28px;border-radius:6px;text-decoration:none;font-weight:600;">
        📞 Call Client
      </a>
    </div>

    <!-- FOOTER -->
    <div style="text-align:center;padding:20px;border-top:1px solid #e2e8f0;font-size:13px;color:#64748b;">
      <p style="margin:0;">This email was auto-generated by ARI Business Network</p>
      <p style="margin:5px 0 0;color:#94a3b8;font-size:12px;">© ${new Date().getFullYear()} ARI BUSINESS NETWORK</p>
    </div>

  </div>
</body>
</html>
    `;

    console.log("[QUESTIONNAIRE] htmlContent length:", htmlContent.length);

    // Send email to admin
    console.log("[QUESTIONNAIRE] Sending email notification to admin...");
    await sendEmail({
      to: "info@aribusinessnetwork.com",
      from: process.env.GMAIL_APP_USER,
      replyTo: data.contactInfo.email,
      subject: `New Questionnaire - ${data.contactInfo.name}`,
      html: htmlContent,
    });
    console.log("[QUESTIONNAIRE] Email sent successfully for id:", saved._id);

    // SUCCESS
    return res.status(200).json({
      success: true,
      message: "Questionnaire submitted successfully.",
      id: saved._id,
    });
  } catch (err) {
    console.error("[QUESTIONNAIRE] Error in submitQuestionnaire:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while submitting questionnaire.",
    });
  }
};
