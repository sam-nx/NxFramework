module.exports = async (client) => {
    console.log("[Cron]".yellow, "Initializing Cron system.".bgCyan);

    setInterval(async () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const hour = date.getHours();
        const minute = date.getMinutes();
        const seconds = date.getSeconds();

        // Examples
        if (day == 1 && hour == 0 && minute == 0 && seconds == 0) { // This will execute every 1st of the month at midnight
            console.log("[Cron]".yellow, "It's the first day of the month, midnight.");
        }

        if (minute % 5 === 0 && seconds === 0) { // This will execute every 5 minutes
            console.log("[Cron]".yellow, "It's a multiple of 5 minutes.");
        }
    }, 1000);
}