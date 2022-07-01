import { AnyAction } from 'redux'
// AC generic stands for action creator
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type']
  match(action: AnyAction): action is ReturnType<AC>
}
// overloading function
export function withMatcher<AC extends () => AnyAction & { type: string }>(
  actionCreator: AC
): Matchable<AC>

export function withMatcher<
  AC extends (...args: any[]) => AnyAction & { type: string }
>(actionCreator: AC): Matchable<AC>

// implementation function
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type
  return Object.assign(actionCreator, {
    type,
    match(action: AnyAction) {
      return action.type === type
    },
  })
}
export type ActionWithPayload<T, P> = {
  type: T
  payload: P
}
export type Action<T> = {
  type: T
}
// overloading function
export function createAction<T extends string, P>(
  type: T,
  payload: P
): ActionWithPayload<T, P>
export function createAction<T extends string>(
  type: T,
  payload: void
): Action<T>
// implementation function
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload }
}
