import Questionnaire from "../models/DB_Questionnaire.js";    
import { sendEmail } from "./emailController.js";

export const submitQuestionnaire = async (req, res) => {
  try {
    const data = req.body;

    // Basic validation to avoid empty objects being saved
    if (!data?.contactInfo?.fullName || !data?.contactInfo?.email) {
      return res.status(400).json({
        success: false,
        message: "Missing required contact information."
      });
    }

    const saved = await Questionnaire.create(data);

    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Questionnaire Submission - ARI BUSINESS NETWORK</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc;">
    <div style="max-width: 700px; margin: 0 auto; background: #ffffff;">
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); padding: 30px 40px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: 1px;">
                ARI BUSINESS NETWORK
            </h1>
            <p style="color: #e0e7ff; margin: 8px 0 0 0; font-size: 14px; font-weight: 300;">
                Professional Business Solutions & Networking
            </p>
        </div>

        <!-- Main Content -->
        <div style="padding: 40px;">
            <!-- Notification Banner -->
            <div style="background: #f0f9ff; border-left: 4px solid #0369a1; padding: 20px; margin-bottom: 30px; border-radius: 0 8px 8px 0;">
                <h2 style="color: #0c4a6e; margin: 0 0 8px 0; font-size: 20px; display: flex; align-items: center;">
                    📋 New Questionnaire Submission Received
                </h2>
                <p style="color: #475569; margin: 0; font-size: 14px;">
                    A new client has submitted their business questionnaire. Review the details below.
                </p>
            </div>

            <!-- Contact Information -->
            <div style="margin-bottom: 35px;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <div style="width: 4px; height: 24px; background: #1e3a8a; border-radius: 2px; margin-right: 12px;"></div>
                    <h3 style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600;">
                        👤 Contact Information
                    </h3>
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="width: 35%; padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Full Name</td>
                            <td style="width: 65%; padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${data.contactInfo.fullName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Email Address</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                <a href="mailto:${data.contactInfo.email}" style="color: #0369a1; text-decoration: none;">${data.contactInfo.email}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Phone Number</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                <a href="tel:${data.contactInfo.phone}" style="color: #0369a1; text-decoration: none;">${data.contactInfo.phone}</a>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Company Name</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${data.contactInfo.companyName}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Address</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${data.contactInfo.address}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">City, State, Country</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                ${data.contactInfo.city}, ${data.contactInfo.state}, ${data.contactInfo.country}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500;">Pincode</td>
                            <td style="padding: 10px 15px; color: #1e293b;">${data.contactInfo.pincode}</td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Business Details -->
            <div style="margin-bottom: 35px;">
                <div style="display: flex; align-items: center; margin-bottom: 20px;">
                    <div style="width: 4px; height: 24px; background: #1e3a8a; border-radius: 2px; margin-right: 12px;"></div>
                    <h3 style="color: #1e293b; margin: 0; font-size: 18px; font-weight: 600;">
                        🏭 Business Details
                    </h3>
                </div>
                <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="width: 35%; padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Business Type</td>
                            <td style="width: 65%; padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${data.businessDetails.businessType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Product Category</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                ${data.businessDetails.productCategory}
                                ${data.businessDetails.categoryOther ? `<br><span style="color: #64748b; font-size: 12px;">(Other: ${data.businessDetails.categoryOther})</span>` : ""}
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Trade Type</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${data.businessDetails.tradeType}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Number of Partners</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">${data.businessDetails.partnerCount}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500; border-bottom: 1px solid #f1f5f9;">Business Assets</td>
                            <td style="padding: 10px 15px; color: #1e293b; border-bottom: 1px solid #f1f5f9;">
                                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                    <span style="background: ${data.businessDetails.hasLogo ? '#dcfce7' : '#fef2f2'}; color: ${data.businessDetails.hasLogo ? '#166534' : '#991b1b'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                                        Logo: ${data.businessDetails.hasLogo ? "✓ Available" : "✗ Not Available"}
                                    </span>
                                    <span style="background: ${data.businessDetails.hasTrademark ? '#dcfce7' : '#fef2f2'}; color: ${data.businessDetails.hasTrademark ? '#166534' : '#991b1b'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                                        Trademark: ${data.businessDetails.hasTrademark ? "✓ Registered" : "✗ Not Registered"}
                                    </span>
                                    <span style="background: ${data.businessDetails.hasMediaAssets ? '#dcfce7' : '#fef2f2'}; color: ${data.businessDetails.hasMediaAssets ? '#166534' : '#991b1b'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                                        Media Assets: ${data.businessDetails.hasMediaAssets ? "✓ Available" : "✗ Not Available"}
                                    </span>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td style="padding: 10px 15px; color: #64748b; font-weight: 500;">Registration Status</td>
                            <td style="padding: 10px 15px; color: #1e293b;">
                                <div style="display: flex; flex-wrap: wrap; gap: 10px;">
                                    <span style="background: ${data.businessDetails.isRegisteredBrand ? '#dbeafe' : '#f3f4f6'}; color: ${data.businessDetails.isRegisteredBrand ? '#1e40af' : '#6b7280'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                                        Registered Brand: ${data.businessDetails.isRegisteredBrand ? "✓ Yes" : "✗ No"}
                                    </span>
                                    <span style="background: ${data.businessDetails.isPrivateLimited ? '#dbeafe' : '#f3f4f6'}; color: ${data.businessDetails.isPrivateLimited ? '#1e40af' : '#6b7280'}; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 500;">
                                        Private Limited: ${data.businessDetails.isPrivateLimited ? "✓ Yes" : "✗ No"}
                                    </span>
                                </div>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>

            <!-- Action Buttons -->
            <div style="text-align: center; padding: 30px 0 10px 0;">
                <a href="mailto:${data.contactInfo.email}" 
                   style="display: inline-block; background: linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%); color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 0 10px; box-shadow: 0 4px 12px rgba(30, 58, 138, 0.3);">
                   ✉️ Reply to Client
                </a>
                <a href="tel:${data.contactInfo.phone}" 
                   style="display: inline-block; background: #10b981; color: #ffffff; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 15px; margin: 0 10px; box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);">
                   📞 Call Client
                </a>
            </div>

            <!-- Footer -->
            <div style="text-align: center; padding: 30px 0 0 0; border-top: 1px solid #e2e8f0; margin-top: 30px;">
                <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0;">
                    This email was automatically generated by ARI BUSINESS NETWORK system.
                </p>
                <p style="color: #94a3b8; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} ARI BUSINESS NETWORK. All rights reserved.
                </p>
            </div>
        </div>
    </div>
</body>
</html>
`;


    await sendEmail({
      to: "sanketbelekar29@gmail.com",
      from: data.contactInfo.email,
      subject: `New Questionnaire Submission - ${data.contactInfo.fullName}`,
      text: JSON.stringify(data, null, 2),
      html: htmlContent
    });
    
    return res.status(200).json({
      success: true,
      message: "Form submitted successfully.",
      id: saved._id
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};
