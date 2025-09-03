// GoogleTranslate.js
import React, { useEffect } from 'react'

const GoogleTranslate = () => {
    useEffect(() => {
        // Add Google Translate Script
        const addScript = () => {
            const script = document.createElement('script')
            script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
            script.async = true
            document.body.appendChild(script)
        }

        // Initialize Google Translate
        window.googleTranslateElementInit = () => {
            new window.google.translate.TranslateElement(
                {
                    pageLanguage: 'en',
                    includedLanguages: 'hi,en,mr,gu,bn,ta,te,kn,ml,pa', // Add or remove languages as needed
                    layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
                    autoDisplay: false
                },
                'google_translate_element'
            )
        }

        addScript()

        // Cleanup
        return () => {
            // Remove script from DOM
            const script = document.querySelector('script[src*="translate_a/element.js"]')
            if (script) {
                script.remove()
            }
            delete window.googleTranslateElementInit
        }
    }, [])

    return (
        <>
            {/* Add this meta tag in your index.html */}
            {/* <meta name="google" content="notranslate" /> */}

            <div
                id="google_translate_element"
                className="translate-widget"
            />

            <style jsx>{`
                .translate-widget {
                    /* Add your custom styles here */
                    padding: 10px;
                }

                /* Optional: Style the Google Translate Widget */
                :global(.goog-te-gadget) {
                    font-family: Arial, sans-serif;
                }

                :global(.goog-te-gadget-simple) {
                    background-color: #fff;
                    border: 1px solid #ccc;
                    padding: 8px;
                    border-radius: 4px;
                }

                :global(.goog-te-banner-frame) {
                    display: none;
                }

                :global(body) {
                    top: 0 !important;
                }
            `}</style>
        </>
    )
}

export default GoogleTranslate
