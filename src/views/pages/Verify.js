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
// import '../../../data/css/login.css'
import { cilLockLocked, cilUser } from '@coreui/icons'
import '../../data/css/index.css'
const Verify = () => {
  return (
    <div className="bg-light min-vh-100 align-items-center border-1">
      <svg width="0" height="0" style={{ position: 'absolute', display:'block', width:'100%' }} fill="currentColor" focusable="false">
        <symbol xmlns="http://www.w3.org/2000/svg" id="link-external" viewBox="0 0 24 24">
          <path d="M13 3l3.293 3.293-7 7 1.414 1.414 7-7L21 11V3z"></path>
          <path d="M19 19H5V5h7l-2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2h14c1.103 0 2-.897 2-2v-5l-2-2v7z"></path>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" id="task" viewBox="0 0 24 24">
          <path
            d="M5 22h14c1.103 0 2-.897 2-2V5c0-1.103-.897-2-2-2h-2a1 1 0 00-1-1H8a1 1 0 00-1 1H5c-1.103 0-2 .897-2 2v15c0 1.103.897 2 2 2zM5 5h2v2h10V5h2v15H5V5z">
          </path>
          <path d="M11 13.586l-1.793-1.793-1.414 1.414L11 16.414l5.207-5.207-1.414-1.414z"></path>
        </symbol>
      </svg>
      <header className="trialBanner-35f4b613ab7a60f6284bce9bce46b13b">
        <div className="content-cd2b0f02688690986bb438eb1053dcfc">
          <a href="../index.html" target="blank">
            <img className="applogo" src="logo3.png" alt="" title="" />
          </a>
        </div>
      </header>
      <main className="container-87616a3312f6d07dd4063793ac310b8b" style={{width:'100%'}}>
        <div className="navContainer-4abaab810f9915f1bfc73a2f2bcfc7a3"></div>
        <div className="fullSizeContainer-22a5863e7bd763f3c21c8742b377ae17" id="main-content" tabIndex="0">
          <div className="innerContainer-34dcbe06e266e583cb7fde78fd0aebaf" style={{ marginBottom: '47px' }}>
            <div className="container-3ad78864b8e4918eaccb132b55451277">
              <div className="main-862588bd97013f04cb48df35ba6e7290">
                <div className="box-4e0678ce2e546c61fe9a76eb7e5b4c08">
                  <h1 className="titleMain-56b11fab5c3101b1ce63378880d9cb36">Certificate authenticity check</h1>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">Scan the QR code or enter the certificate
                      ID to validate
                    </h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c">
                      <p className="text-f541af79479a774e32ff4a6b9253a840">Please enter the certificate number below to
                        validate
                      </p>
                    </div>
                    <div className="ods-search">
                      <input data-test="results-search" placeholder="Enter certificate number" type="search"
                        className="ods-input" />
                    </div>
                    <div className="buttons-e328982eb3aa1b0797ef3f03b4d33925" style={{ maxWidth: '90px' }}>
                      <a href="../index.html" target="_blank"
                        className="ods-button -action--primary button-cceed290ad520b8c7599440293b2e2fa">Verify
                      </a>
                    </div>
                  </section>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029" style={{ display: 'flex', alignItems: 'center' }}>
                      The certificate is valid.
                      <svg aria-hidden="true" fill="currentColor" focusable="false"
                        className="ods-icon icon-cee99e34d7c8eaca92014de21dfa6571 svgpdf" style={{ color: 'green' }}>
                        <use href="#task"></use>
                      </svg>
                    </h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c"
                      style={{ display: 'block', wordWrap: 'break-word' }}>
                      <p>Certificate number:<span className="datacr">2211240001USDTETLK5G</span></p>
                      <p>Type:<span className="datacr">Proof of funds certificate</span></p>
                      <p>Issue date:<span className="datacr">2022-11-24</span></p>
                      <p>Status:<span className="datacr">Valid</span></p>
                      <p>Applicant name:<span className="datacr">E****** R*********</span></p>
                      <p>Wallet:<span className="datacr">0x659c67d9AC43ad4e6304724d90639772d0E08723</span></p>
                      <p>Token:<span className="datacr">ERC20 USDT</span></p>
                      <p>Quantity:<span className="datacr">200,046 units</span></p>
                      <p>AML assessment:<span className="datacr">Low risk</span></p>
                      <p>Notes:<span className="datacr">N/A</span></p>
                    </div>
                  </section>
                </div>
              </div>
              <div className="sidebar-fe32a127b3c39fa786151c16faa694c9" style={{marginBottom:'60px'}}>
                <div className="buttons-e328982eb3aa1b0797ef3f03b4d33925">
                  <a href="../index.html" target="_blank"
                    className="ods-button -action--primary button-cceed290ad520b8c7599440293b2e2fa"
                    style={{ maxWidth: '320px', margin: 'auto' }}>Return to homepage
                  </a>
                </div>
                <div style={{ paddingLeft: '5px', paddingTop: '40px' }}>
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
                    style={{fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1)',marginTop:'15px'}}>support@amadeus-analytics.com</a>
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

export default Verify
