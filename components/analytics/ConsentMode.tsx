/**
 * Inline <head> script that initialises Google Consent Mode v2 with a
 * "denied" default BEFORE any Google tag (gtag/GTM) has the chance to fire.
 * Must be rendered inside <head> so it executes synchronously.
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
      wait_for_update: 500
    });
    gtag('set', 'ads_data_redaction', true);
    gtag('set', 'url_passthrough', true);
    try {
      var raw = localStorage.getItem('dst_consent_v2');
      if (raw) { gtag('consent', 'update', JSON.parse(raw)); }
    } catch (e) {}
  `;
  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
