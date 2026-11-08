import { CONSENT_STORAGE_KEY, GOOGLE_ADS_ID } from "@/lib/analytics";

/**
 * Advanced Consent Mode v2. Rendered first in <head> so the "denied" defaults
 * exist before the Google tag runs. A saved choice is applied synchronously,
 * then gtag.js loads on every visit (cookieless pings until consent is granted).
 */
export function ConsentMode() {
  const code = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;
    gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied',
      functionality_storage: 'granted',
      security_storage: 'granted',
      personalization_storage: 'denied'
    });
    gtag('set', 'ads_data_redaction', true);
    try {
      var saved = JSON.parse(window.localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)}));
      var keys = ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage'];
      if (saved && typeof saved === 'object' && keys.every(function (k) { return saved[k] === 'granted' || saved[k] === 'denied'; })) {
        gtag('consent', 'update', saved);
        window.dstAppliedConsent = JSON.stringify(saved);
      }
    } catch (e) {}
    gtag('js', new Date());
    gtag('config', ${JSON.stringify(GOOGLE_ADS_ID)});
  `;
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: code }} />
      <script async src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`} />
    </>
  );
}
