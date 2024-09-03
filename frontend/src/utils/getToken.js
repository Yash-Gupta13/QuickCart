import Cookies from 'js-cookie'

const getAccessToken = ()=>(Cookies.get("accessToken"));
const getRefreshToken = ()=>(Cookies.get("refreshToken"));

export {
    getAccessToken,
    getRefreshToken
}
