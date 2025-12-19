const express = require("express");
const router = express.Router();

router.get("/:crop", (req, res) => {
  const crop = req.params.crop;

  // Dummy data (later from API or DB)
  const data = {
    wheat: {
      today: 2350,
      months: ["Jan", "Feb", "Mar", "Apr"],
      prices: [2100, 2200, 2300, 2350]
    },
    rice: {
      today: 3200,
      months: ["Jan", "Feb", "Mar", "Apr"],
      prices: [3000, 3100, 3150, 3200]
    }
  };

  res.json(data[crop]);
});

module.exports = router;
