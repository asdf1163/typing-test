export interface IinitialState {
    isLoggedIn: boolean,
    userData: object,
    error: string
}

interface IsuccessUserData {
    type: userTypes.SUCCESS_USER_DATA
    payload: IinitialState['userData']
}

interface IfailedUserData {
    type: userTypes.FAILED_USER_DATA
    payload: IinitialState['error']
}

export type Actions = IsuccessUserData | IfailedUserData
