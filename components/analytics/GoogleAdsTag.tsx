import { GOOGLE_ADS_ID } from "@/lib/analytics";

export function GoogleAdsTag() {
  const code = `
    gtag('js', new Date());
    gtag('config', '${GOOGLE_ADS_ID}');
  `;

  return (
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
      />
      <script dangerouslySetInnerHTML={{ __html: code }} />
    </>
  );
}
