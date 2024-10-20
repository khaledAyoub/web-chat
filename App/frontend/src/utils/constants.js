export const HOST = import.meta.env.VITE_SERVER_URL;

export const AUTH_ROUTES = "api/auth";
export const SIGNUP_ROUTE = `${AUTH_ROUTES}/signup`;
export const LOGIN_ROUTE = `${AUTH_ROUTES}/login`;
export const LOGOUT_ROUTE = `${AUTH_ROUTES}/logout`;
export const GET_USER_INFO = `${AUTH_ROUTES}/user-info`;
export const UPDATE_PROFILE_ROUTE = `${AUTH_ROUTES}/update-profile`;
export const SETUP_PROFILE_ROUTE = `${AUTH_ROUTES}/setup-profile`;
export const ADD_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/add-profile-image`;
export const ADD_PROFILE_BANNER_ROUTE = `${AUTH_ROUTES}/add-banner-image`;
export const REMOVE_PROFILE_IMAGE_ROUTE = `${AUTH_ROUTES}/remove-profile-image`;
export const CHANGE_PASSWORD_ROUTE = `${AUTH_ROUTES}/change-password`;
export const FILE_UPLOAD_ROUTE = `${AUTH_ROUTES}/fileUpload`;
export const CHANGE_PASSWORD = `${AUTH_ROUTES}/change-password`;

export const MAIN_ROUTES = "api/main";
export const GET_PEOPLE = `${MAIN_ROUTES}/getPeople`;
export const SEND_MESSAGE = `${MAIN_ROUTES}/sendMessage`;
export const FILE_UPLOAD = `${MAIN_ROUTES}/fileUpload`;
export const GET_USER_IMAGE = `${MAIN_ROUTES}/getUserImage`;
export const GET_USER_BANNER = `${MAIN_ROUTES}/getUserBanner`;
export const GET_SINGLE_CHAT = `${MAIN_ROUTES}/getSingleChat`;
export const FILE_DOWNLOAD = `${MAIN_ROUTES}/fileDownload`;
