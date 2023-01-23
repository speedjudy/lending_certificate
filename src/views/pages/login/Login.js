import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../../data/css/index.css'
import logoImage from '../../../data/img/logo3.png';

const Login = () => {
  return (
    <div className="bg-light min-vh-100 align-items-center">
      <svg width="0" height="0" style={{ position: 'absolute' }} fill="currentColor" focusable="false">
        <symbol xmlns="http://www.w3.org/2000/svg" id="link-external" viewBox="0 0 24 24">
          <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
          <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" id="welcome-smart-capture">
          <rect width="80" height="80" rx="40" fill="#FFF5EB"></rect>
          <path
            d="M30 22h2v4h-2a4 4 0 00-4 4v2h-4v-2a8 8 0 018-8zM22 48v2a8 8 0 008 8h2v-4h-2a4 4 0 01-4-4v-2h-4zM54 48v2a4 4 0 01-4 4h-2v4h2a8 8 0 008-8v-2h-4zM58 32v-2a8 8 0 00-8-8h-2v4h2a4 4 0 014 4v2h4z"
            fill="#9E4B08"></path>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M44.317 42.736a8 8 0 10-8.634 0c-.431.153-.854.329-1.266.527-1.768.852-3.276 2.095-4.387 3.616a2 2 0 003.23 2.36c.707-.968 1.692-1.794 2.893-2.372A8.892 8.892 0 0140.107 46a8.855 8.855 0 013.923.957c1.181.605 2.14 1.45 2.817 2.43a2 2 0 003.292-2.272c-1.069-1.547-2.542-2.825-4.285-3.718a12.534 12.534 0 00-1.537-.662zM40 40a4 4 0 100-8 4 4 0 000 8z"
            fill="#9E4B08"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" id="welcome-studio">
          <rect width="80" height="80" rx="40" fill="#F5F6FF"></rect>
          <path
            d="M28 20a2 2 0 00-2 2v14.535a4 4 0 104 0V22a2 2 0 00-2-2zM28 48a2 2 0 00-2 2v8a2 2 0 104 0v-8a2 2 0 00-2-2zM38 22a2 2 0 114 0v14.535c1.196.692 2 1.984 2 3.465 0 1.48-.804 2.773-2 3.465V58a2 2 0 11-4 0V43.465A3.998 3.998 0 0136 40c0-1.48.804-2.773 2-3.465V22zM56 24c0 1.48-.804 2.773-2 3.465V46a2 2 0 11-4 0V27.465A4 4 0 1156 24zM52 60a4 4 0 100-8 4 4 0 000 8z"
            fill="#3640F5"></path>
        </symbol>
        <symbol fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" id="welcome-results">
          <rect width="80" height="80" rx="40" fill="#ECFDF1"></rect>
          <path fillRule="evenodd" clipRule="evenodd"
            d="M54 60H26c-2.206 0-4-1.794-4-4V26c0-2.206 1.794-4 4-4h4c0-1.106.894-2 2-2h16c1.106 0 2 .894 2 2h4c2.206 0 4 1.794 4 4v30c0 2.206-1.794 4-4 4zM30 26h-4v30h28V26h-4v4H30v-4zm4.414 13.586L38 43.172l7.586-7.586 2.828 2.828L38 48.828l-6.414-6.414 2.828-2.828z"
            fill="#057D27"></path>
        </symbol>
      </svg>
      <header className="trialBanner-35f4b613ab7a60f6284bce9bce46b13b">
        <div className="content-cd2b0f02688690986bb438eb1053dcfc">
          <a href="../index.html" target="blank">
            <img className="applogo" src="logo3.png" alt="" title="" />
          </a>
        </div>
      </header>

      <main className="container-87616a3312f6d07dd4063793ac310b8b">
        <div className="fullSizeContainer-22a5863e7bd763f3c21c8742b377ae17" id="main-content" tabIndex="0">
          <div className="innerContainer-34dcbe06e266e583cb7fde78fd0aebaf">
            <div className="container-3ad78864b8e4918eaccb132b55451277">
              <div className="main-862588bd97013f04cb48df35ba6e7290">
                <div className="box-4e0678ce2e546c61fe9a76eb7e5b4c08">
                  <h1 className="titleMain-56b11fab5c3101b1ce63378880d9cb36">Obtain lending approval certificate</h1>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">1. Validate your identity</h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c">
                      <p className="text-f541af79479a774e32ff4a6b9253a840">Onboard with our passwordless authentication and proceed with Know Your Customer (KYC) verification with our dynamic solution. Verify your identity through Government-issued ID card, driving license or passport and face match. Verification as simple as taking a selfie.
                      </p>
                      <svg className="icon-afce607cf921ba78519a5482dad718d3" fill="currentColor">
                        <use href="#welcome-smart-capture"></use>
                      </svg>
                    </div>
                  </section>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">2. Validate lending approval</h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c">
                      <p className="text-f541af79479a774e32ff4a6b9253a840"> Connect your cryptocurrency wallet to Amadeus secured web3 onboard application in one-click. Select token to certify and sign token lending approval to prove wallet ownership and provide transparent on-chain proof of holding of assets which aims to ensure that on-chain holdings of cryptocurrencies are sufficient to complete athe lending transaction.
                      </p>
                      <svg className="icon-afce607cf921ba78519a5482dad718d3" fill="currentColor">
                        <use href="#welcome-studio"></use>
                      </svg>
                    </div>
                  </section>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">3. Get your proof of lending certificate
                    </h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c">
                      <p className="textColor-c09fbb562f0c91e0c473429d51fb20df">Download your Proof of Lending certificate.
                      </p>
                      <svg className="icon-afce607cf921ba78519a5482dad718d3" fill="currentColor">
                        <use href="#welcome-results"></use>
                      </svg>
                    </div>
                  </section>
                </div>
              </div>
              <div className="sidebar-fe32a127b3c39fa786151c16faa694c9" style={{ marginBottom: '47px' }}>
                <div className="box-4e0678ce2e546c61fe9a76eb7e5b4c08">
                  <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">Prepare the following:</h2>
                  <ul className="list-6a62b389ed4213b99797faf3dc84c983">
                    <li>- Valid proof of identity. Personal identification documents accepted: ID card, passport and
                      driving license
                    </li>
                    <li>- Cryptocurrency wallet with funds to certify (Metamask, MEW, Trezor, etc) and enough gas to allow token approval signature.
                    </li>
                    <li></li>
                  </ul>
                </div>
                <div className="boxHighlighted-c8ee490533e5ecb46c2d9a080e573d1e" style={{ marginBottom: '50px' }}>
                  <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">Get started</h2>
                  <p className="text-f541af79479a774e32ff4a6b9253a840">When you’re ready, get your certificate in less than 2
                    minutes by following the next steps.
                  </p>
                  <div className="buttons-e328982eb3aa1b0797ef3f03b4d33925">
                    <Link to="wallet">
                      <button className="ods-button -action--primary button-cceed290ad520b8c7599440293b2e2fa">Get
                        Certificate
                      </button>
                    </Link>
                  </div>
                </div>
                <div style={{ paddingLeft: '5px', paddingTop: '10px', paddingBottom: '20px' }}>
                  <a className="listA-1cdd673f867914c8015b06d3872a1a1f contract" href="../privacy-policy.html#cookie_policy"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1' }}>
                    Terms of Service
                    <svg aria-hidden="true" fill="currentColor" focusable="false"
                      className="ods-icon icon-cee99e34d7c8eaca92014de21dfa6571 svgterms">
                      <use href="#link-external"></use>
                    </svg>
                  </a>
                  <a className="listA-1cdd673f867914c8015b06d3872a1a1f contract" href="../privacy-policy.html#cookie_policy"
                    target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1' }}>
                    Privacy Policy
                    <svg aria-hidden="true" fill="currentColor" focusable="false"
                      className="ods-icon icon-cee99e34d7c8eaca92014de21dfa6571 svgterms">
                      <use href="#link-external"></use>
                    </svg>
                  </a>
                  <a className="listA-1cdd673f867914c8015b06d3872a1a1f contract" href="mailto:support@amadeus-analytics.com"
                    style={{ fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1)', marginTop: '15px' }}>support@amadeus-analytics.com</a>
                  <span className="listA-1cdd673f867914c8015b06d3872a1a1f contract"
                    style={{ fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1' }}>© 2023 Amadeus Analytics.
                    All Right Reserved.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Login
