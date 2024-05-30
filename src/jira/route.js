import express from "express";
import { getJiraTicket, getJiraTicketStatus } from "../jira/controller.js";

const router = express.Router();

router.get('/ticket/:id', getJiraTicket);
router.get('/ticket/:id/status', getJiraTicketStatus);

export default router;