## Demo of EIP-721 Bug for WalletConnect v2 upgrade

This is a minimal Next.js, Wagmi, and RainbowKit example. It demonstrates a bug encountered during WalletConnect v2 upgrade — or my misunderstanding of the tooling.

wagmi [`v0.12.18`](https://github.com/rainbow-me/rainbowkit/commit/6af1db72357f848bc04ba43a15f217912ea95429#diff-cc0a2222f2257df4c6c709c23079872e7178f7bc36e6e73b280feef0b6fca16bR17)
@rainbow-me/rainbowkit [`v0.12.16`](https://github.com/rainbow-me/rainbowkit/releases/tag/%40rainbow-me%2Frainbowkit%400.12.16)

## Steps to reproduce

1. Ensure you have TrustWallet installed on your phone.
1. Install the dependencies with `npm install`.
1. Run the app with `npm run dev`.
1. Click on the "Connect Wallet" button.
1. Click "WalletConnect" and scan the QR code with the TrustWallet app.
1. Switch to the Polygon network.
1. Click on the "Sign typed data" button.
1. Observe the error in the JavaScript console:

<img src="https://raw.githubusercontent.com/hzhu/yo/main/error.png" alt="error" width="500"/>
