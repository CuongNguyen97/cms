import {LocalStorageKey} from "../config";

export default () => {
    return {
        isAuthenticate: () => {
            return localStorage.getItem(LocalStorageKey.IS_LOGGED_IN) != null;
        },

        authenticate: (username, password) => {
            localStorage.setItem(LocalStorageKey.IS_LOGGED_IN, "true");
            localStorage.setItem(LocalStorageKey.LOGGED_USER, username);
            return true;
        },

        logOut: () => {
            localStorage.removeItem(LocalStorageKey.IS_LOGGED_IN);

            window.location.assign("/login");
        }
    }
}

