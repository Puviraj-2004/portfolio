import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const startTime = Date.now();
  
  // Collect actual hosting and execution properties
  const payload = {
    status: "healthy",
    region: process.env.VERCEL_REGION || "local-dev",
    environment: process.env.NODE_ENV || "development",
    nodeVersion: process.version,
    commitHash: (process.env.VERCEL_GIT_COMMIT_SHA || "local-dev-commit").substring(0, 7),
    serverUptime: Math.floor(process.uptime()),
    latency: Date.now() - startTime,
  };

  return NextResponse.json(payload);
}