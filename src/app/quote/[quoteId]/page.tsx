import { getDates } from "@/lib/getLocations";
import App from "@/app/app";
import { PageProps } from "../../../../.next/types/app/layout";

export default async function QuotePage({ params }: PageProps) {
  const { quoteId } = await params;
  const dates = await getDates(quoteId);

  return <App dates={dates || []} />;
}
