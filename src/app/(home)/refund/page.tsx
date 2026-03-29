import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { refundContent } from "@/data/legalContent";

const RefundPage = () => {
  return (
    <LegalDocumentPage
      document={refundContent}
      companion={{ label: "Terms of Service", href: "/terms" }}
    />
  );
};

export default RefundPage;
