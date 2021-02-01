import React from 'react';
import styled from 'styled-components';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
} from 'next-share';

const social = [
  {
    id: 'fb',
    button: FacebookShareButton,
    icon: FacebookIcon,
  },
  {
    id: 'tw',
    button: TwitterShareButton,
    icon: TwitterIcon,
  },
  {
    id: 'ws',
    button: WhatsappShareButton,
    icon: WhatsappIcon,
  },
  {
    id: 'tg',
    button: TelegramShareButton,
    icon: TelegramIcon,
  },
];

const FooterWrapper = styled.footer`
  background-color: #00000070;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px; 
  img {
    width: 58px;
    margin-right: 23px;
  }

  a {
    color: white;
    text-decoration: none;
    transition: .3s;
    &:hover,
    &:focus {
      color: ${({ theme }) => theme.colors.secondary};
      font-weight:bold;
    }
    span {
      text-decoration: underline;
    }
  }

  div{
    align-items: center;
    display:flex;
  }

  ul{
    justify-content:space-between;
    display:flex;
    list-style-type: none;
    margin:0;
    padding-left:0;
    width: 100%;
  }
`;

export default function Footer(props) {
  const urlShare = 'https://bibliaquiz.prscreis.vercel.app';
  const msgShare = 'Teste seus conhecimentos sobre a bíblia no Bíblia Quiz!';
  const hashtagShare = '#bibliaquiz #aluraquiz #imersao-alura #imersao-react';

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <FooterWrapper {...props}>
      <div>
        <a href="https://www.alura.com.br/">
          <img src="https://www.alura.com.br/assets/img/alura-logo-white.1570550707.svg" alt="Logo Alura" />
        </a>
        <p>
          Orgulhosamente criado durante
          {' '}
          a
          {' '}
          <a href="https://www.alura.com.br/">
            <span>Imersão React da Alura</span>
          </a>
          {' '}
          por
          {' '}
          { /* eslint-disable-next-line react/jsx-no-target-blank */}
          <a href="https://www.pauloreis.dev" target="_blank"><span>Paulo Reis</span></a>
        </p>
      </div>
      <ul>
        {social.map((s) => (
          <li>
            <s.button
              key={s.key}
              url={urlShare}
              title={msgShare}
              quote={msgShare}
              hashtag={hashtagShare}
            >
              <s.icon round size={50} />
            </s.button>
          </li>
        ))}
      </ul>
    </FooterWrapper>
  );
}
