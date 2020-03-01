import { Action, Selector, State, StateContext } from '@ngxs/store';
import { patch } from '@ngxs/store/operators';

export interface StepperStateModel {
    steps: string[];
    currentStep: string;
    isButtonDisabled: boolean;
  }

// *****************************
// Actions
// *****************************
export class SetCurrentStep {
static readonly type = '[Stepper] Set Current Step';
constructor(public payload: string) { }
}

// *****************************
// Store implementation
// *****************************
@State<StepperStateModel>({
    name: 'stepper',
    defaults: {
        steps: ['organisation', 'etape2', 'etape3', 'etape4', 'etape5', 'etape6'], // REMPLACER PAR UN ENUM
        currentStep: null,
        isButtonDisabled: false
    }
  })
  export class StepperStore {
    constructor() { }
    @Selector()
    static getCurrentStep(state: StepperStateModel) {
      return state.currentStep;
    }

  
    @Action(SetCurrentStep)
    SetCurrentStep(
      ctx: StateContext<StepperStateModel>,
      action: SetCurrentStep
    ) {
      ctx.setState(
      patch({
        currentStep: action.payload
      })
    );

    }

  }
