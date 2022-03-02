export interface IinitialState {
    isLoggedIn: any,
    userData: object,
    error: string
}


interface IsuccessUserData {
    type: userTypes.SUCCESS_USER_DATA
    payload: string
}

interface IfailedUserData {
    type: userTypes.FAILED_USER_DATA
    payload: string
}

export type Actions = IsuccessUserData | IfailedUserData
