import cron from "cron";
import https from "https";
import "dotenv/config";


export const job = new cron.CronJob("*/14 * * * *", function () {
  const url = process.env.API_URL;
  if(!url) {
    console.error("API_URL not defined");
    return;
  }

  https
    .get(url, (res) => {
      if (res.statusCode === 200) console.log("Get request sent successfully");
      else console.log("Get request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});