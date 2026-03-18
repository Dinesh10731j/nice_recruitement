export const resetPasswordTemplate = (params: {
  name: string;
  resetUrl: string;
}): string => {
  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2>Password Reset Request</h2>
      <p>Hi ${params.name},</p>
      <p>We received a request to reset your password. Click the button below to set a new one.</p>
      <p>
        <a href="${params.resetUrl}" style="display:inline-block;padding:10px 16px;background:#1a73e8;color:#fff;text-decoration:none;border-radius:4px;">
          Reset Password
        </a>
      </p>
      <p>If you didn’t request this, you can ignore this email.</p>
      <p>Thank you,<br/>Nice Manpower Company</p>
    </div>
  `;
};
