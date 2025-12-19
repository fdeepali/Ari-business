import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import PDFDocument from "pdfkit";
import fs from "fs";
dotenv.config();

// ----------------------------
//   INITIALIZE RAZORPAY
// ----------------------------
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ----------------------------
//   CREATE ORDER
// ----------------------------
export const createOrder = async (req, res) => {
  try {
    const options = {
      amount: 5200, // = 52 INR (amount is in paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        description: "Questionnaire Submission Payment",
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create order",
    });
  }
};

// ----------------------------
//   SIGNATURE VERIFICATION FUNCTION
// ----------------------------
export const verifyPayment = (orderId, paymentId, signature) => {
  const body = orderId + "|" + paymentId;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");

  return expectedSignature === signature;
};

// ----------------------------
//   GENERATE RECEIPT PDF
// ----------------------------
const generateReceiptPDF = ({ name, email, orderId, paymentId, amount, date, filePath }) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 40 });

    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // ------------ HEADER -------------
    doc
      .rect(0, 0, doc.page.width, 80)
      .fill('#1F2937'); // dark gray
    doc
      .fill('#ffffff')
      .fontSize(28)
      .text('Payment Receipt', 40, 25);

    // Company Name
    doc
      .fontSize(12)
      .fill('#D1D5DB')
      .text('ARI Business Network', 40, 60);

    doc.moveDown(3);

    // ------------ CUSTOMER DETAILS -------------
    doc
      .fill('#111827')
      .fontSize(16)
      .text('Customer Details', { underline: true });

    doc.moveDown(0.7);
    doc
      .fontSize(12)
      .fill('#374151')
      .text(`Name: ${name}`)
      .text(`Email: ${email}`)
      .text(`Payment Date: ${date}`);

    doc.moveDown(1.5);

    // ------------ PAYMENT SUMMARY BOX -------------
    doc
      .fontSize(16)
      .fill('#111827')
      .text('Payment Summary', { underline: true });

    doc.moveDown(0.7);

    const tableTop = doc.y;

    // Gray background box
    doc
      .rect(40, tableTop, doc.page.width - 80, 100)
      .fill('#F3F4F6');

    doc.fill('#111827').fontSize(14);

    const leftX = 60;
    const rightX = 280;

    doc.text('Order ID:', leftX, tableTop + 15);
    doc.text(orderId, rightX, tableTop + 15);

    doc.text('Payment ID:', leftX, tableTop + 40);
    doc.text(paymentId, rightX, tableTop + 40);

    doc.text('Amount Paid:', leftX, tableTop + 65);
    doc.text(amount, rightX, tableTop + 65);

    doc.moveDown(7);

    // ------------ THANK YOU SECTION -------------
    doc
      .fill('#111827')
      .fontSize(16)
      .text('Thank You!', { align: 'center' });
    doc
      .fontSize(12)
      .fill('#6B7280')
      .text(
        'Your payment has been successfully processed. A copy of this receipt has been sent to your email.',
        { align: 'center' }
      );

    doc.moveDown(2);

    // ------------ FOOTER -------------
    doc
      .fontSize(10)
      .fill('#9CA3AF')
      .text(
        'ARI Business Network • Amazon Growth Solutions • support@aribusinessnetwork.com',
        { align: 'center' }
      );

    doc.end();

    writeStream.on('finish', resolve);
    writeStream.on('error', reject);
  });
};


// ----------------------------
//   SEND EMAIL WITH PDF
// ----------------------------
const sendReceiptMail = async ({ to, name, paymentId, orderId, receiptPath }) => {
  const transporter = nodemailer.createTransport({
    host: "imap.secureserver.net",
    port: 993,
    secure: true,
    auth: {
      user: process.env.GMAIL_APP_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: 'info@aribusinessnetwork.com',
    to,
    subject: "Your Payment Receipt",
    html: `
      <h2>Hello ${name},</h2>
      <p>Your payment was successful.</p>
      <p><strong>Order ID:</strong> ${orderId}</p>
      <p><strong>Payment ID:</strong> ${paymentId}</p>
      <p>Your receipt is attached as a PDF.</p>
      <br/>
      <p>Thank you for your purchase!</p>
    `,
    attachments: [
      {
        filename: `receipt_${paymentId}.pdf`,
        path: receiptPath,
      },
    ],
  };

  await transporter.sendMail(mailOptions);
};

// ----------------------------
//   VERIFY PAYMENT + SEND RECEIPT
// ----------------------------
export const verifyPaymentController = async (req, res) => {
  const { orderId, paymentId, signature, email, name } = req.body;
  console.log("Received email:", email);
  console.log("Received name:", name);

  const isValid = verifyPayment(orderId, paymentId, signature);

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid payment signature",
    });
  }

  try {
    // 1. Generate PDF Receipt
    const receiptPath = `./receipts/receipt_${paymentId}.pdf`;

    await generateReceiptPDF({
      name,
      email,
      orderId,
      paymentId,
      amount: "₹52.00",
      date: new Date().toLocaleString(),
      filePath: receiptPath,
    });

    // 2. Send Email With Receipt
    await sendReceiptMail({
      to: email,
      name,
      paymentId,
      orderId,
      receiptPath,
    });

    return res.status(200).json({
      success: true,
      message: "Payment verified & receipt emailed successfully",
    });
  } catch (error) {
    console.error("Error sending receipt:", error);
    return res.status(500).json({
      success: false,
      message: "Payment verified, but failed to send receipt email",
    });
  }
};
