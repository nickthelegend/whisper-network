import type { NextConfig } from "next";
import path from 'path';

const nextConfig: NextConfig = {
  experimental: {
    esmExternals: false,
  },
  transpilePackages: [
    "@meshsdk/midnight-setup",
    "@midnight-ntwrk/dapp-connector-api",
    "@midnight-ntwrk/midnight-js-fetch-zk-config-provider",
    "@midnight-ntwrk/midnight-js-http-client-proof-provider",
    "@midnight-ntwrk/midnight-js-indexer-public-data-provider",
    "@midnight-ntwrk/midnight-js-level-private-state-provider",
    "@midnight-ntwrk/midnight-js-network-id",
    "@midnight-ntwrk/compact-runtime",
    "@midnight-ntwrk/midnight-js-contracts",
    "@midnight-ntwrk/midnight-js-types",
    "@midnight-ntwrk/ledger",
    "@midnight-ntwrk/wallet-sdk-address-format",
    "@midnight-ntwrk/midnight-js-utils",
    "isomorphic-ws",
    "@midnight-ntwrk/onchain-runtime"
  ],
  webpack: (config, { isServer }) => {
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      layers: true,
    };

    // Fix for ESM/CJS interop in Midnight SDK
    config.module.rules.push({
      test: /\.m?js$/,
      type: "javascript/auto",
      resolve: {
        fullySpecified: false,
      },
    });

    // Alias a few problematic packages
    config.resolve.alias = {
      ...config.resolve.alias,
      "@meshsdk/midnight-setup": path.resolve(__dirname, "./lib/midnight-setup"),
      "isomorphic-ws": path.resolve(__dirname, "./lib/isomorphic-ws-shim.js"),
      "@midnight-ntwrk/onchain-runtime": path.resolve(__dirname, "./lib/onchain-runtime-shim.js"),
      "eccrypto": false,
    };

    if (!isServer) {
      config.resolve.fallback = { fs: false, net: false, tls: false };
    }
    return config;
  }
};

export default nextConfig;
