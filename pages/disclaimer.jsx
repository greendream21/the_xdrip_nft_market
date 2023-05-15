import React from 'react';

const Disclaimer = () => {
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        color: '#fff',
        backgroundColor: '#000',
        padding: '5rem',
    };

    const boxStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#0c0c0c',
        borderRadius: '.75rem',
        padding: '2rem',
        margin: '1.25rem',
        width: '80%',
        boxShadow: 'inset 0 -1px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        color: '#fff',
        textAlign: 'justify',
    };

    return (
        <div style={containerStyle}>
            <div style={boxStyle}>
                <h2>Disclaimer</h2>
                <p>
                    Please read this <strong>DISCLAIMER</strong> carefully before using the <strong>XMARKET</strong> ("Site") operated by the <strong>XdRiP dev team</strong> By using or accessing our Site, you agree to this Disclaimer. If you do not agree with any of these terms, you are prohibited from using or accessing this Site.
                </p>

                <h3>General Notice</h3>
                <p>
                    The content available on our Site, including but not limited to text, graphics, and information, is for general informational purposes only. The Site is not responsible for any inaccuracies, errors, or omissions in the content.
                </p>

                <h3>Risk Notice</h3>
                <p>
                    You acknowledge that the purchase, sale, and use of Non-Fungible Tokens (NFTs), as well as the engagement in transactions involving cryptocurrencies, involve significant risks. These risks include, but are not limited to, financial loss, technology malfunctions, regulatory action, and market volatility. Cryptocurrencies and NFTs are subject to constant price fluctuations and trading in these assets can result in partial or complete loss of funds.
                </p>
                <p>
                    We do not provide any advice regarding the nature, potential value, or suitability of any particular transaction or investment strategy. Any decision to purchase or sell NFTs or cryptocurrencies is your decision and XMARKET cannot and does not guarantee the success, value, or profitability of any transaction or investment strategy.
                </p>

                <h3>Liability Limitations</h3>
                <p>
                    To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the services or any conduct or content of any third party on the services.
                </p>

                <h3>Third-Party Links & Content</h3>
                <p>
                    Our Site may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that we shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods, or services available on or through any such websites or services.
                </p>

                <h3>Your Acceptance of these Terms</h3>
                <p>
                    By using this Site, you signify your acceptance of this policy. If you do not agree to this policy, please do not use our Site. Your continued use of the Site following the posting of changes to this policy will be deemed your acceptance of those changes.
                </p>

                <h3>Changes to Disclaimer</h3>
                <p>
                    We reserve the right to modify these terms from time to time at our sole discretion. Therefore, you should review this page periodically. When we change the Disclaimer in a material manner, we will update the 'last updated' date at the bottom of this page. Changes to this Disclaimer are effective when they are posted on this page.
                </p>

                <p>Last updated: 14 May, 2023 </p>

                <h3>Contacting us</h3>
                <p>
                    If you have any questions about this Disclaimer, the practices of this site, or your dealings with this site, please contact us at legalnotices@xdrip.io
                </p>
            </div>
        </div>
    );
};

export default Disclaimer;