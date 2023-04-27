export type Endpoint = ['get' | 'post' | 'put' | 'patch' | 'delete', string]

export const COMMENT_GET: Endpoint = ['get', 'comments']
export const AUTH_GET: Endpoint = ['get', 'auth']
export const LOGIN_POST: Endpoint = ['post', 'login']
export const LOGIN_PIN_POST: Endpoint = ['post', 'login/pin']
export const CHANGE_PIN_PUT: Endpoint = ['put', 'change-pin']
export const RESET_PIN_POST: Endpoint = ['post', 'reset-pin']
export const REGISTER_POST: Endpoint = ['post', 'register']
export const TERMS_GET: Endpoint = ['get', 'terms']
export const PLAYER_PUT: Endpoint = ['put', 'player/:id']
export const PRIZE_GET: Endpoint = ['get', 'prize']
export const STEP_POST: Endpoint = ['post', 'step']
export const STEP_GET: Endpoint = ['get', 'step']
export const DATA_GET: Endpoint = ['get', 'data']
export const NEXT_LEVEL_POST: Endpoint = ['post', 'next-level']
export const TOP_SCORE_GET: Endpoint = ['get', 'top-score']
export const WINNER_GET: Endpoint = ['get', 'winner']
export const CONTINUE_PLAY_POST: Endpoint = ['post', 'continue-play']
export const PAY_OVO_POST: Endpoint = ['post', 'pay/ovo']
export const PAY_OVO_CHECK_GET: Endpoint = ['get', 'pay/ovo/:id']
export const PAY_GOPAY_POST: Endpoint = ['post', 'pay/gopay']
export const PAY_GOPAY_CHECK_GET: Endpoint = ['get', 'pay/gopay/:id']
