import ApiCalls from "./ApiCalls";
import UserAuthorization from "./UserAuthorization";

export const loginUser = async (token) => {
    await UserAuthorization.setUserAuthToken(token);
    const profile = await ApiCalls.getProfile();
    await UserAuthorization.setUserId(profile['id']);
}
export const logoutUser = async () => {
    await UserAuthorization.setUserAuthToken(null);
    await UserAuthorization.setUserId(null);
}

export default {loginUser, logoutUser}