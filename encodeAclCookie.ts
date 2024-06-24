import CryptoJS from 'crypto-js';

export type ACLCookie = {
    blockedRoutes: string[] | undefined;
    permissions: string[] | undefined;
    id_token: string | undefined;
}

export function encodeACLCookie(aclCookie:ACLCookie, passKey: string): string {
  const cookieValue = JSON.stringify(aclCookie);
  return CryptoJS.AES.encrypt(cookieValue, passKey).toString();
}
