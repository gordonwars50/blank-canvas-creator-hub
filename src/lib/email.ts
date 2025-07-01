import { supabase } from '@/integrations/supabase/client';

interface EmailParams {
  to: string;
  subject: string;
  html: string;
}

interface TeamInviteEmailParams {
  to: string;
  role: string;
  inviterName: string;
  inviteId: string;
}

// Function to send email via Supabase Edge Function
export const sendEmail = async (params: EmailParams): Promise<boolean> => {
  try {
    const { data, error } = await supabase.functions.invoke('send-email', {
      body: {
        to: params.to,
        subject: params.subject,
        html: params.html,
      },
    });

    if (error) {
      console.error('Error sending email via Edge Function:', error);
      return false;
    }

    console.log('Email sent successfully:', data);
    return true;
  } catch (error) {
    console.error('Error calling send-email function:', error);
    return false;
  }
};

// Function to send team invite email
export const sendTeamInviteEmail = async (params: TeamInviteEmailParams): Promise<boolean> => {
  const subject = `You've been invited to join a team on Creatorly`;
  
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #ff0003; margin-bottom: 10px;">CREATORLY</h1>
        <p style="font-size: 18px; color: #666;">Team Invitation</p>
      </div>
      
      <p>Hello,</p>
      
      <p>${params.inviterName} has invited you to join their team on Creatorly as a <strong>${params.role}</strong>.</p>
      
      <p>Creatorly is a platform that helps content creators plan, organize, and manage their video production workflow.</p>
      
      <div style="text-align: center; margin: 30px 0;">
        <a href="https://creatorly.app/invite/${params.inviteId}" style="background-color: #ff0003; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">
          Accept Invitation
        </a>
      </div>
      
      <p>If you have any questions, please contact the person who invited you.</p>
      
      <p>Best regards,<br>The Creatorly Team</p>
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #999; text-align: center;">
        <p>If you didn't expect this invitation, you can safely ignore this email.</p>
      </div>
    </div>
  `;

  return await sendEmail({
    to: params.to,
    subject,
    html
  });
};
