export const welcomeEmailTemplate = (fullName: string): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.5;">
      <h2>Welcome to Nice Recruiting</h2>
      <p>Hi ${fullName},</p>
      <p>Thanks for registering with Nice Recruiting. We are excited to help you find the right opportunity.</p>
      <p>If you have any questions, just reply to this email and our team will help.</p>
      <p>Best regards,<br/>Nice Recruiting Team</p>
    </div>
  `;
};
