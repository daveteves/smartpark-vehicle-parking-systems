const express = require("express");
const router = express.Router();

const financeController = require("../controllers/financeController");

// base endpoint
router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "Finance API" });
});

// Payments
router.get("/payments", financeController.getPayments);
router.get("/payments/:id", financeController.getPaymentById);
router.post("/payments", financeController.addPayment);
router.put("/payments/:id", financeController.updatePayment);
router.delete("/payments/:id", financeController.deletePayment);

// Violations
router.get("/violations", financeController.getViolations);
router.get("/violations/:id", financeController.getViolationById);
router.post("/violations", financeController.addViolation);
router.put("/violations/:id", financeController.updateViolation);
router.delete("/violations/:id", financeController.deleteViolation);

// Charging Sessions
router.get("/charging-sessions", financeController.getChargingSessions);
router.get("/charging-sessions/:id", financeController.getChargingSessionById);
router.post("/charging-sessions", financeController.addChargingSession);
router.put("/charging-sessions/:id", financeController.updateChargingSession);
router.delete("/charging-sessions/:id", financeController.deleteChargingSession);

router.get("/finance-report", financeController.getFinanceReport);

module.exports = router;