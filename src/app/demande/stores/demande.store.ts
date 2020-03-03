import { Action, Selector, State, StateContext } from '@ngxs/store';

export interface DemandeStateModel {
    demande: {};
  }

// *****************************
// Actions
// *****************************
export class SetDemande {
static readonly type = '[Demande] Set Demande';
constructor(public payload: {}) { }
}

// *****************************
// Store implementation
// *****************************
@State<DemandeStateModel>({
    name: 'demande',
    defaults: {
        demande: null,
    }
  })
  export class DemandeStore {
    constructor() { }
    @Selector()
    static getCurrentDemande(state: DemandeStateModel) {
      return state.demande;
    }

    @Action(SetDemande)
    SetCurrentStep(
      ctx: StateContext<DemandeStateModel>,
      action: SetDemande
    ) {
      const state = ctx.getState();
      ctx.setState({
        demande: {...state.demande, ...action.payload}
      });
      // APPEL HTTP PUIS REMISE A JOUR DU STORE
    }

  }
