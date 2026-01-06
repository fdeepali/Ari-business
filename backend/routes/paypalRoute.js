// routes/paypalRoute.js
import express from "express";

const router = express.Router();

// ✅ LIVE PayPal base URL
const PAYPAL_BASE = "https://api-m.paypal.com";

/* =========================
   Generate PayPal Access Token
========================= */
async function generateAccessToken() {
  console.log("🔑 [PayPal] Generating LIVE access token...");
  console.log("🌍 PayPal Base:", PAYPAL_BASE);

  const clientId = process.env.PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("PayPal credentials missing in environment variables");
  }

  console.log("🆔 Client ID:", clientId);
  console.log("🔑 Client Secret length:", clientSecret.length);

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const res = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  console.log("🔑 Token response status:", res.status);

  if (!res.ok) {
    const errText = await res.text();
    console.error("❌ Token fetch failed:", errText);
    throw new Error(`Token fetch failed: ${res.status} - ${errText}`);
  }

  const data = await res.json();
  console.log("✅ Access token generated");
  return data.access_token;
}

/* =========================
   CREATE ORDER
========================= */
router.post("/create-order", async (req, res) => {
  console.log("\n📦 [PayPal] CREATE ORDER");
  console.log("📦 Request body:", req.body);

  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }

    const accessToken = await generateAccessToken();
    const orderPayload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: '52.00',
          },
        },
      ],
      application_context: {
        brand_name: "ARI Business Network",
        landing_page: "LOGIN",
        user_action: "PAY_NOW",
        return_url: `${req.headers.origin}/paypal-success`,
        cancel_url: `${req.headers.origin}/paypal-cancel`,
      },
    };

    console.log("📤 Order payload:", JSON.stringify(orderPayload, null, 2));

    const orderRes = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(orderPayload),
    });

    const orderData = await orderRes.json();
    console.log("📥 Order response:", orderData);

    if (!orderRes.ok || !orderData.id) {
      return res.status(500).json({
        error: "Failed to create PayPal order",
        details: orderData,
      });
    }

    return res.status(200).json({
      success: true,
      id: orderData.id,
    });
  } catch (err) {
    console.error("❌ Create-order error:", err.message);
    return res.status(500).json({
      error: "Failed to create PayPal order",
      details: err.message,
    });
  }
});

/* =========================
   CAPTURE ORDER
========================= */
router.post("/capture-order", async (req, res) => {
  console.log("\n💳 [PayPal] CAPTURE ORDER");
  console.log("💳 Request body:", req.body);

  try {
    const { orderID } = req.body;

    if (!orderID) {
      return res.status(400).json({ error: "orderID required" });
    }

    const accessToken = await generateAccessToken();

    const captureRes = await fetch(
      `${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const captureData = await captureRes.json();
    console.log("📥 Capture response:", captureData);

    if (!captureRes.ok) {
      return res.status(500).json({
        error: "Failed to capture PayPal payment",
        details: captureData,
      });
    }

    if (captureData.status === "COMPLETED") {
      return res.status(200).json({
        success: true,
        data: captureData,
      });
    }

    return res.status(400).json({
      error: "Payment not completed",
      status: captureData.status,
    });
  } catch (err) {
    console.error("❌ Capture error:", err.message);
    return res.status(500).json({
      error: "Failed to capture PayPal order",
      details: err.message,
    });
  }
});

export default router;
