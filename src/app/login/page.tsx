"use client";
import { useEffect } from "react";

const Login = () => {
  useEffect(() => {
    const clientId = process.env.SALESFORCE_CLIENT_ID;
    const redirectUri = encodeURIComponent(
      "http://localhost:3000/api/auth/callback"
    );
    const loginUrl = `https://login.salesforce.com/services/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=refresh_token%20full`;

    window.location.href = loginUrl; // 🔥 Redirige automáticamente al usuario
  }, []);

  return <h1>Redirigiendo a Salesforce...</h1>;
};

export default Login;
