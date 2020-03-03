import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as moment from 'moment';

export interface AuthStateModel {
    sessionToken?: string;
    expire?: Date;
    identity?;
}

export interface AuthRootState {
    auth: AuthStateModel;
}

// *****************************
// Actions
// *****************************
export class AuthSaveToken {
    static readonly type = '[Auth] SaveToken';
    constructor(public payload: any) { }
}

export class AuthSaveIdentity {
    static readonly type = '[Auth] SaveIdentity';
    constructor(public payload) { }
}

// *****************************
// Store implementation
// *****************************
@State<AuthStateModel>({
    name: 'auth',
    defaults: {
        sessionToken: null,
        expire: null,
        identity: null
    }
})

export class AuthStore {
    @Selector()
    static getUser(state: AuthStateModel) {
        return state.identity;
    }
    @Selector()
    static getExpirationDate(state: AuthStateModel): Date {
        return state.expire;
    }

    @Selector()
    static getToken(state: AuthStateModel): string {
        return state.sessionToken;
    }

    @Action(AuthSaveToken)
    storeToken(ctx: StateContext<AuthStateModel>, action: AuthSaveToken) {
        const state = ctx.getState();
        if (action && (action.payload === null || action.payload === 'null')) {
            action.payload = {
                sessionToken: null,
                expiresInSeconds: 0
            };
        }
        ctx.setState({
            ...state,
            sessionToken: action.payload.sessionToken,
            expire: action.payload.expiresInSeconds ? moment().add(action.payload.expiresInSeconds, 'seconds').toDate() : null
        });
    }
    @Action(AuthSaveIdentity)
    storeIdentity(ctx: StateContext<AuthStateModel>, action: AuthSaveIdentity) {
        const state = ctx.getState();
        ctx.setState({
            ...state,
            identity: action.payload
        });
    }
}
