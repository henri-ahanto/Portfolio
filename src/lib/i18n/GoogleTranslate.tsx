'use client'

import Script from 'next/script'

export const GoogleTranslate = () => (
  <>
    <Script
      src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      strategy="afterInteractive"
    />
    <Script id="google-translate-init">
      {`
        function googleTranslateElementInit() {
          new google.translate.TranslateElement(
            {pageLanguage: 'fr'},
            'google_translate_element'
          );
        }
      `}
    </Script>
  </>
)
