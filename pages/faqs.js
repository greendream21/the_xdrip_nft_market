import React, { useState } from 'react';
import Style from "../styles/faqs.module.css";
import { Brand } from "../components/componentsindex";

const FAQ = () => {
    const [activeIndex, setActiveIndex] = useState(null);

    const onQuestionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const faqItems = [
        {
            question: 'What is an NFT?',
            answer: 'An NFT (Non-Fungible Token) is a unique digital asset that is stored on a blockchain.'
        },
        {
            question: 'How do I buy an NFT?',
            answer: 'To buy an NFT, you will need to have a cryptocurrency wallet and enough funds to purchase the NFT. You can then find and purchase the NFT on an NFT marketplace.'
        },
        {
            question: 'Can I buy an NFT with fiat currency?',
            answer: 'Most NFT marketplaces require payment in cryptocurrency, but some may allow payment with fiat currency.'
        },
        {
            question: 'How do I sell an NFT?',
            answer: 'To sell an NFT, you need to create an account on an NFT marketplace and list your NFT for sale. You can set a fixed price or put it up for auction.'
        },
        {
            question: 'What is an NFT marketplace?',
            answer: 'An NFT marketplace is an online platform that allows users to buy, sell, and trade non-fungible tokens.'
        },
        {
            question: 'What can I do with an NFT?',
            answer: 'You can hold an NFT as a digital collectible or sell it on an NFT marketplace. Some NFTs also provide access to exclusive content or events.'
        },
        {
            question: 'How do I create an NFT?',
            answer: 'You can create an NFT by uploading a digital file, such as an image or video, to a platform that supports NFTs.'
        },
        {
            question: 'How do I store my NFTs?',
            answer: 'NFTs can be stored in a digital wallet that supports the blockchain on which the NFT was created.'
        },
        {
            question: 'What is gas fee and why do I need to pay it?',
            answer: 'Gas fees are a form of transaction fee required to process transactions on a blockchain. They are paid in cryptocurrency and vary based on network congestion and the complexity of the transaction.'
        },
        {
            question: 'How do royalties work for NFTs?',
            answer: 'Royalties are automatic payments made to the original creator of an NFT every time it is resold on an NFT marketplace. The percentage of the royalty and the length of time it is in effect can vary depending on the NFT marketplace.'
        },
        {
            question: 'How do I store my NFTs?',
            answer: 'NFTs can be stored in a digital wallet that supports the blockchain on which the NFT was created.'
        },
        {
            question: 'What happens if I lose my NFT?',
            answer: 'If you lose your NFT, it may be difficult or impossible to recover it. It is important to keep your digital wallet and private keys secure to avoid losing your NFT.'
        },
    ];

    const renderedItems = faqItems.map((item, index) => {
        const isActive = index === activeIndex;

        return (
            <React.Fragment key={index}>
                <div
                    className={Style.ui_accordion_title}
                    onClick={() => onQuestionClick(index)}
                >
                    {item.question}

                    {isActive ? <i className="dropdown_icon active">&#45;</i> : <i className="dropdown_icon">&#43;</i>}

                </div>
                <div className={`${Style.ui_accordion_content} ${isActive ? Style.active : ''}`}>
                    <p>{item.answer}</p>
                </div>
            </React.Fragment>
        );
    });

    return (
        <div className={Style.ui_styled_accordion}>
                      <h1>XMARKET FAQS</h1>
          <p>
            PLEASE FEEL FREE TO EMAIL US ANY QUESTIONS YOU FEEL CAN BE ADDED TO OUR FAQS.
          </p>
            <div className={Style.ui_styled_accordion_box}>
                {renderedItems}
            </div>
            <Brand />
        </div>
    );
};

export default FAQ;
