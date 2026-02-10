// Shim for isomorphic-ws to support both named and default exports in Webpack
// This avoids using the name 'WebSocket' as a local variable to prevent TDZ errors.
const ws_impl = typeof globalThis !== 'undefined' ? globalThis.WebSocket :
    typeof window !== 'undefined' ? window.WebSocket : undefined;

export { ws_impl as WebSocket };
export default ws_impl;
