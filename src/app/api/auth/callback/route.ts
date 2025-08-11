import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "No authorization code received" }, { status: 400 });
  }

  try {
    // 🔥 Hacer la solicitud a Salesforce para intercambiar el `code` por `access_token` y `refresh_token`
    const response = await fetch("https://login.salesforce.com/services/oauth2/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        client_id: process.env.SALESFORCE_CLIENT_ID!,
        client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
        redirect_uri: "http://localhost:3000/api/auth/callback",
        code,
      }).toString(),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.error_description || "Error retrieving token" }, { status: 500 });
    }

    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token, // 🔥 Aquí obtienes el refresh token
      instance_url: data.instance_url,
      token_type: data.token_type,
    });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return NextResponse.json({ error: "Failed to exchange token" }, { status: 500 });
  }
}
