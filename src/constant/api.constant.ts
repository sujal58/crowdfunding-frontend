export const baseApi = import.meta.env.VITE_API_URL;


export const serverApis=  {
    signupUrl: `${baseApi}/auth/signup`,
    loginUrl: `${baseApi}/auth/login`,
    forgotPasswordUrl: `${baseApi}/auth/forgot-password`,
}