// Follow Deno deploy pattern for Supabase Edge Functions
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, subject, html } = await req.json();

    if (!to || !subject || !html) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Get environment variables
    const SMTP_HOST = Deno.env.get("SMTP_HOST") || "smtp.gmail.com";
    const SMTP_PORT = parseInt(Deno.env.get("SMTP_PORT") || "587");
    const SMTP_USERNAME = Deno.env.get("SMTP_USERNAME");
    const SMTP_PASSWORD = Deno.env.get("SMTP_PASSWORD");
    const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "noreply@creatorly.app";

    if (!SMTP_USERNAME || !SMTP_PASSWORD) {
      return new Response(
        JSON.stringify({ error: "SMTP credentials not configured" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Configure SMTP client
    const client = new SMTPClient({
      connection: {
        hostname: SMTP_HOST,
        port: SMTP_PORT,
        tls: false,
        auth: {
          username: SMTP_USERNAME,
          password: SMTP_PASSWORD,
        },
      },
    });

    // Send email
    await client.send({
      from: FROM_EMAIL,
      to: to,
      subject: subject,
      content: html,
      html: html,
    });

    await client.close();

    // Return success response
    return new Response(
      JSON.stringify({ 
        success: true,
        message: "Email sent successfully",
        to,
        subject
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});