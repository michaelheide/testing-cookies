import type { AppContext, AppInitialProps } from 'next/app';
import App from 'next/app';
import { deleteCookie, getCookie } from 'cookies-next';
import {ACLCookie, encodeACLCookie} from "@/encodeAclCookie";
export interface CustomAppProps {
    blockedRoutes: string[] | undefined;
    permissions: string[] | undefined;
}
const getInitialPropsApp = async (
    context: AppContext
): Promise<CustomAppProps & AppInitialProps> => {
    const { ctx, router } = context;
    const initialPropsPromise = App.getInitialProps(context);
    let blockedRoutesProp: string[] | undefined;
    let permissionsProp: string[] | undefined;

    const aclCookie: string | undefined = getCookie("acl", {
        req: ctx.req,
        res: ctx.res
    });


    console.log(aclCookie)

    if (!blockedRoutesProp || !permissionsProp) {

        const aclCookie: ACLCookie = {
            blockedRoutes: ["routeTest"],
            permissions: ["permissionTest"],
            id_token: "some io token"
        };
        ctx.res?.setHeader('Set-Cookie', [
            `acl=${encodeACLCookie(
                aclCookie,
                process.env.COOKIE_SECRET ?? "TEST"
            )}; Path=/; HttpOnly; Secure; SameSite=Strict; expires: 1/86400; max-age:-1;`
        ]);
    }

    // Redirect if the user is not allowed to access the current route.
    // Necessary since this might run after middleware.ts

    return {
        ...(await initialPropsPromise),
        blockedRoutes: blockedRoutesProp,
        permissions: permissionsProp
    };
};
export default getInitialPropsApp;
