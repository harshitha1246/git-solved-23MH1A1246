/**
 * System Monitoring Script - Multi-Environment
 * Supports both Production and Development monitoring
 */
// Change made in main branch
const DEPLOY_ENV = process.env.DEPLOY_ENV || "production";

const monitorConfig =
  DEPLOY_ENV === "production"
    ? {
        interval: 60000, // 1 minute
        alertThreshold: 80,
        metricsEndpoint: "http://localhost:8080/metrics",
        debugMode: false,
        verboseLogging: false,
      }
    : {
        interval: 5000, // 5 seconds (faster for dev)
        alertThreshold: 90,
        metricsEndpoint: "http://localhost:3000/metrics",
        debugMode: true,
        verboseLogging: true,
      };

console.log("=================================");
console.log("DevOps Simulator - Monitor");
console.log(`Environment: ${DEPLOY_ENV}`);
console.log("=================================");

function checkSystemHealth() {
  const timestamp = new Date().toISOString();
  console.log(`\n[${timestamp}] Running health check...`);

  const cpuUsage = Math.random() * 100;
  const memUsage = Math.random() * 100;
  const diskUsage = Math.random() * 100;

  console.log(`✓ CPU usage: ${cpuUsage.toFixed(2)}%`);
  console.log(`✓ Memory usage: ${memUsage.toFixed(2)}%`);
  console.log(`✓ Disk usage: ${diskUsage.toFixed(2)}%`);

  if (monitorConfig.debugMode) {
    console.log("✓ Hot reload: Active");
    console.log("✓ Debug port: 9229");
    console.log("✓ Source maps: Enabled");
  }

  const maxUsage = Math.max(cpuUsage, memUsage, diskUsage);
  if (maxUsage > monitorConfig.alertThreshold) {
    console.log("⚠️  System Status: WARNING - High resource usage");
  } else {
    console.log("✅ System Status: HEALTHY");
  }

  if (monitorConfig.verboseLogging) {
    console.log(`Next check in ${monitorConfig.interval}ms`);
  }
}

// Start monitoring
console.log(`Monitoring every ${monitorConfig.interval}ms`);
setInterval(checkSystemHealth, monitorConfig.interval);

// Run first check immediately
checkSystemHealth();

// Development-only: log memory usage periodically
if (monitorConfig.debugMode) {
  setInterval(() => {
    const memUsage = process.memoryUsage();
    console.log("\n--- Memory Usage ---");
    console.log(`RSS: ${(memUsage.rss / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`);
  }, 30000);
}
