import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { termsContent } from "@/data/legalContent";

const TermsPage = () => {
  return (
    <LegalDocumentPage
      document={termsContent}
      companion={{ label: "Privacy Policy", href: "/privacy" }}
    />
  );
};

export default TermsPage;
