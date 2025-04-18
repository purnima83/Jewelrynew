// routes/ebay.js

const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// This should be the token you received from the getEbayToken script
const EBAY_OAUTH_TOKEN = "YOUR_SANDBOX_ACCESS_TOKEN"; // paste your token here

router.get("/jewelry", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.sandbox.ebay.com/buy/browse/v1/item_summary/search?q=jewelry&limit=12",
      {
        headers: {
          "Authorization": `Bearer ${EBAY_OAUTH_TOKEN}`,
          "X-EBAY-C-ENDUSER-CONTEXT": "contextualLocation=country=US"
        }
      }
    );

    const data = await response.json();

    const products = (data.itemSummaries || []).map((item, index) => ({
      id: item.itemId || index,
      title: item.title,
      price: item.price?.value || 0,
      currency: item.price?.currency || "USD",
      image: item.image?.imageUrl || "/placeholder.jpg"
    }));

    res.json(products);
  } catch (error) {
    console.error("❌ eBay API error:", error);
    res.status(500).json({ error: "Failed to fetch jewelry from eBay" });
  }
});

module.exports = router;
