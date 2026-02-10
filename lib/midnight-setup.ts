/**
 * Re-exporting from the real @meshsdk/midnight-setup package.
 * Using any for API to avoid TS resolution issues if the build is missing types.
 */

// @ts-ignore
export * from '@meshsdk/midnight-setup';

// Force export if the wildcard fails
// @ts-ignore
import * as MeshMidnight from '@meshsdk/midnight-setup';
// @ts-ignore
export const MidnightSetupAPI = MeshMidnight.MidnightSetupAPI;
