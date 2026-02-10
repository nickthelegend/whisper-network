import { DAppConnectorAPI } from "@midnight-ntwrk/dapp-connector-api";

declare global {
  interface Window {
    midnight?: Record<string, {
      enable: () => Promise<DAppConnectorAPI>;
      isEnabled?: () => Promise<boolean>;
    }>;
  }
}
