import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { privacyContent } from "@/data/legalContent";

const PrivacyPage = () => {
  return (
    <LegalDocumentPage
      document={privacyContent}
      companion={{ label: "Terms of Service", href: "/terms" }}
    />
  );
};

export default PrivacyPage;
