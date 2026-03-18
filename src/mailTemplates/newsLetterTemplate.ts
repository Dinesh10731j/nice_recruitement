export type NewsLetterTemplateInput = {
  recruitedCount: number;
  destinationCountries: string[];
  companyName?: string;
};

export const manpowerNewsletterTemplate = (
  input: NewsLetterTemplateInput
): string => {
  const company = input.companyName || "Nice Manpower Company";
  const countries = input.destinationCountries.join(", ");

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
      <h2 style="margin-bottom: 8px;">Manpower Deployment Update</h2>
      <p>
        We are pleased to share that <strong>${input.recruitedCount}</strong> people have been
        recruited and deployed to <strong>${countries}</strong>.
      </p>
      <p>
        Your journey can be next — contact us today to learn about current openings
        and overseas placement opportunities.
      </p>
      <p style="margin-top: 16px;">
        <strong>${company}</strong><br/>
        Overseas Recruitment & Deployment
      </p>
    </div>
  `;
};
