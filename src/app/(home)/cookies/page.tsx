import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { cookieContent } from "@/data/legalContent";

const CookiesPage = () => {
  return (
    <LegalDocumentPage
      document={cookieContent}
      companion={{ label: "Privacy Policy", href: "/privacy" }}
    />
  );
};

export default CookiesPage;
