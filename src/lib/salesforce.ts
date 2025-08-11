import jsforce from "jsforce";

// 🔥 Función para obtener un nuevo access_token con Client Credentials Flow
async function getNewAccessToken() {
  try {
    const response = await fetch(
      `${process.env.SALESFORCE_INSTANCE_URL}/services/oauth2/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials", // 🔥 Cambiamos a Client Credentials Flow
          client_id: process.env.SALESFORCE_CLIENT_ID!,
          client_secret: process.env.SALESFORCE_CLIENT_SECRET!,
        }).toString(),
      }
    );

    const data = await response.json();
    if (!response.ok) {
      console.error("❌ Error getting access_token:", data.error_description);
      throw new Error(
        data.error_description || "Error in Client Credentials Flow"
      );
    }
    return data.access_token;
  } catch (error) {
    console.error("❌ Error getting access_token:", error);
    throw error;
  }
}

// 🔹 Función para obtener una conexión activa con Salesforce
export async function getSalesforceConnection() {
  try {
    const accessToken = await getNewAccessToken();
    return new jsforce.Connection({
      instanceUrl: process.env.SALESFORCE_INSTANCE_URL!,
      accessToken,
    });
  } catch (error) {
    console.error("❌ Error:", error);
    throw error;
  }
}
