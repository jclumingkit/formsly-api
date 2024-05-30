import express from "express";

const router = express.Router();

const getJira = async (req, res) => {
  try {
    const { id, action } = req.query;
    if (action === "getTicket") {
      const response = await fetch(
        `${process.env.JIRA_DOMAIN_URL}/servicedeskapi/request/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.JIRA_USER}:${process.env.JIRA_API_TOKEN}`
            ).toString("base64")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      res.status(200).send(data);
    } else if (action === "getStatus") {
      const response = await fetch(
        `${process.env.JIRA_DOMAIN_URL}/servicedeskapi/request/${id}/status?limit=1`,
        {
          method: "GET",
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.JIRA_USER}:${process.env.JIRA_API_TOKEN}`
            ).toString("base64")}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();
      const status = data.values[0];

      res.status(200).send(status);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

router.get("/ticket", getJira);

export default router;
