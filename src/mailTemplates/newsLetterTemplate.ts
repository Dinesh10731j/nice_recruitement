export type NewsLetterTemplateInput = {
  recruitedCount: number;
  destinationCountries: string[];
  companyName?: string;
};

export const manpowerNewsletterTemplate = (
  input: NewsLetterTemplateInput
): string => {
  const company = input.companyName || "Nice Manpower Company";

  // Emoji flags for countries (optional: you can map ISO country codes to emoji)
  const countryFlags = input.destinationCountries.map((c) => {
    // Simple mapping for demo; can expand for more countries
    const flags: Record<string, string> = {
      UAE: "🇦🇪",
      Qatar: "🇶🇦",
      SaudiArabia: "🇸🇦",
      Kuwait: "🇰🇼",
      Oman: "🇴🇲",
      Bahrain: "🇧🇭",
    };
    return `${flags[c] || ""} ${c}`;
  });
  const countries = countryFlags.join(", ");

  return `
  <div style="font-family: Arial, sans-serif; color: #222; max-width: 600px; margin: auto; padding: 20px; background-color: #f9f9f9; border-radius: 10px;">
    
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px;">
      <h1 style="color: #004aad; margin: 0; font-size: 24px;">📢 Manpower Deployment Update</h1>
    </div>

    <!-- Main Content -->
    <div style="background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);">
      <p style="font-size: 16px; margin-bottom: 12px;">
        We are thrilled to announce that <strong style="color: #004aad;">${input.recruitedCount}</strong> people have been successfully recruited and deployed to <strong>${countries}</strong>.
      </p>

      <p style="font-size: 16px; margin-bottom: 12px;">
        Your journey can be next! ✈️ Contact us today to learn about current openings and overseas placement opportunities.
      </p>

      <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />

      <!-- Footer -->
      <div style="font-size: 14px; color: #555;">
        <strong>${company}</strong><br/>
        🌍 Overseas Recruitment & Deployment<br/>
        📧 <a href="mailto:info@nicemanpower.com" style="color: #004aad; text-decoration: none;">info@nicemanpower.com</a> | 📞 +977-1-xxxxxxx
      </div>
    </div>

    <!-- Optional Footer Note -->
    <div style="text-align: center; font-size: 12px; color: #888; margin-top: 10px;">
      You are receiving this email because you subscribed to our newsletter.
    </div>
  </div>
  `;
};