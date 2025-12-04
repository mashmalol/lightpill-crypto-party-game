# Light Pill Crypto Party Game

A mystical NFT collection featuring 29 unique Light Pills - surreal, mystical experience tokens for those who embrace the unknown.

## Overview

The Light Pill Project is a limited edition collection of 29 animated NFTs, each representing a unique mystical character and experience. Each Light Pill grants its holder access to a specific role, ritual, and transformative experience within the Light Pill universe.

**Important**: This is a self-deployment game. Players must upload their own IPFS content and deploy their own ERC-721 smart contracts. The game maker assumes no responsibility for the outcome of this game.

## How to Play

### Step 1: Prepare Your Assets
1. Review the provided GIF files in `gifslightpillbatch1/` and metadata files in `jsonmatadta/`
2. Customize the metadata JSON files with your own IPFS references and content
3. Ensure your GIF files are ready for IPFS upload

### Step 2: Upload to IPFS
1. Upload your GIF files to IPFS using a service like:
   - Pinata (https://pinata.cloud)
   - NFT.Storage (https://nft.storage)
   - Web3.Storage (https://web3.storage)
   - Your own IPFS node
2. Upload your metadata JSON files to IPFS
3. Update the `image` field in each metadata JSON file with your IPFS hash/URL
4. Update the `files.uri` field in the properties section with your IPFS hash

### Step 3: Deploy Your ERC-721 Contract
1. Create or use an ERC-721 compatible smart contract
2. Deploy the contract to your chosen blockchain (Ethereum, Polygon, etc.)
3. Set up your contract with:
   - Proper token URI structure pointing to your IPFS metadata
   - Minting functionality
   - Royalty settings (if desired)
4. Mint your 29 Light Pill NFTs using your deployed contract

### Step 4: Play the Game
- Each Light Pill represents a unique role and ritual
- Follow the ritual instructions in each pill's metadata
- Participate in the crypto party game according to your pill's character and attributes
- Engage with other players based on your assigned role

## Collection Details

- **Total Supply**: 29 unique Light Pills
- **Format**: Animated GIFs with comprehensive metadata
- **Price**: 0.024 ETH per Light Pill
- **Category**: Experience Token

## React Gallery App

A dark, gothic, minimal gallery showcasing all 29 Light Pills built with React, Vite, TypeScript, and shadcn UI.

### Quick Start

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

The gallery features:
- Elegant dark theme with gothic minimal aesthetic
- Responsive grid layout showcasing all 29 Light Pills
- Interactive modal views with detailed metadata
- Smooth animations and hover effects
- Built with modern React and shadcn UI components

## Project Structure

```
lightpill crypto party game/
├── gifslightpillbatch1/     # Animated GIF assets (1-29)
├── jsonmatadta/             # Metadata JSON files (01-29)
├── public/                  # Static assets for React app
│   ├── gifslightpillbatch1/ # GIFs served by Vite
│   └── jsonmatadta/         # Metadata JSON files
├── src/                     # React application source
│   ├── components/          # React components
│   ├── hooks/              # Custom React hooks
│   └── types/              # TypeScript type definitions
└── package.json            # Node.js dependencies
```

## Features

Each Light Pill includes:

- **Unique Character/Role**: Each pill represents a distinct mystical character (e.g., "The Silent Witness", "The Dream Weaver", "The River Singer")
- **Rich Attributes**: 
  - Pill Aura
  - Energy Level
  - Rarity (Rare, Uncommon, etc.)
  - State
  - Elemental Alignment
  - Experience Tier
- **Ritual Instructions**: Specific activation requirements and ritual instructions for each pill
- **Fashion & Atmosphere**: Detailed descriptions of recommended clothing, occult accessories, footwear, and atmospheric settings
- **Whispered Messages**: Mystical messages unique to each Light Pill
- **AI-Generated Prompts**: Detailed prompts for generating visual representations

## Example Light Pills

- **#1 - The Silent Witness**: Grants the power of absolute observation, requires complete silence
- **#2 - The Dream Weaver**: Reveals the fabric of dreams, must be taken at midnight
- **#15 - The River Singer**: Teaches the language of currents and change, must be taken near flowing water

## Metadata Format

Each Light Pill's metadata follows a standard structure including:
- Name and description
- IPFS image reference
- Background color
- Comprehensive attributes array
- Properties (category, files, creators, AI prompt)

## Usage

This collection is designed for:
- NFT collectors interested in mystical and surreal art
- Crypto party game participants
- Those seeking unique digital experiences and roles
- Collectors of limited edition animated NFTs

## Technical Details

- **File Format**: GIF (animated)
- **Metadata Standard**: JSON (ERC-721 compatible)
- **Storage**: IPFS-ready metadata structure
- **Blockchain**: Ethereum (ETH pricing) or any EVM-compatible chain

## Deployment Requirements

### IPFS Upload
- **GIF Files**: Upload all 29 GIF files to IPFS
- **Metadata Files**: Upload all 29 JSON metadata files to IPFS
- **Update References**: Replace IPFS placeholders in metadata with your actual IPFS hashes/URLs

### ERC-721 Contract Deployment
You are responsible for:
- Writing or obtaining an ERC-721 compatible smart contract
- Deploying the contract to your chosen blockchain network
- Configuring token URIs to point to your IPFS metadata
- Setting up minting functionality
- Managing gas fees and deployment costs
- Ensuring contract security and functionality

### Recommended Tools
- **IPFS**: Pinata, NFT.Storage, or Web3.Storage
- **Smart Contracts**: OpenZeppelin contracts, Hardhat, Truffle, or Remix
- **Blockchain**: Ethereum, Polygon, Arbitrum, or any EVM-compatible network

## Collection Status

All 29 Light Pills are included in this collection, numbered 1-29, with corresponding metadata files numbered 01-29.

## Disclaimer

**IMPORTANT LEGAL NOTICE**

The creator and maker of this Light Pill Crypto Party Game project assumes **NO RESPONSIBILITY** for:

- The outcome of deploying or playing this game
- Any financial losses or gains resulting from NFT minting, trading, or participation
- Smart contract security, bugs, or vulnerabilities
- IPFS content availability or permanence
- Blockchain network issues or transaction failures
- Any legal, regulatory, or tax implications of participating in this game
- Interactions between players or third parties
- The accuracy or completeness of metadata, attributes, or game mechanics

**By using this project, you acknowledge that:**

- You are deploying and managing your own smart contracts
- You are responsible for uploading and maintaining your own IPFS content
- You understand the risks associated with blockchain technology and NFTs
- You are participating at your own risk
- The game maker provides these assets "as-is" without warranties of any kind

**Use this project at your own discretion and risk.**

---

*Part of the Light Pill Project: surreal, mystical experiences for those who embrace the unknown.*

