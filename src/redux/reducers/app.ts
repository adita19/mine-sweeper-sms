import createReducer from 'utils/createReducer'

export const APP_BOARD_FETCH = 'app/BOARD_FETCH'
export const APP_BOARD_FETCH_SUCCESS = 'app/BOARD_FETCH_SUCCESS'
export const APP_BOARD_FETCH_FAILURE = 'app/BOARD_FETCH_FAILURE'
export const APP_BOARD_LOG_SAVE = 'app/BOARD_LOG_SAVE'
export const APP_BOARD_LOG_SAVE_SUCCESS = 'app/BOARD_LOG_SAVE_SUCCESS'
export const APP_BOARD_LOG_SAVE_FAILURE = 'app/BOARD_LOG_SAVE_FAILURE'
export const APP_THEME_SET = 'app/THEME_SET'
export const APP_TOGGLE_FLAG_SET = 'app/TOGGLE_FLAG_SET'
export const APP_GAME_OVER_SET = 'app/GAME_OVER_SET'
export const APP_GAME_WIN_SET = 'app/GAME_WIN_SET'
export const APP_DATA_FETCH = 'app/DATA_FETCH'
export const APP_DATA_FETCH_FAILURE = 'app/DATA_FETCH_FAILURE'
export const APP_DATA_FETCH_SUCCESS = 'app/DATA_FETCH_SUCCESS'
export const APP_DATA_POINT_SET = 'app/DATA_POINT_SET'
export const APP_DATA_COIN_SET = 'app/DATA_COIN_SET'
export const APP_PRIZE_FETCH = 'app/PRIZE_FETCH'
export const APP_PRIZE_FETCH_FAILURE = 'app/PRIZE_FETCH_FAILURE'
export const APP_PRIZE_FETCH_SUCCESS = 'app/PRIZE_FETCH_SUCCESS'

export interface AppInitialState {
  theme: 'dark' | 'light'
  board: {
    columns: number
    rows: number
    mines: number
    state: string
  }
  data: {
    level: number
    points: number
    coins: number
  }
  prizes: {
    id: number
    label: string
    name: string
    imageSrc: string
  }[]
  error: {
    message: string
  }
  isLoading: boolean
  isLoadingLog: boolean
  isGameOver: boolean
  isGameWin: boolean
  isToggleFlag: boolean
}

const INITIAL_STATE: AppInitialState = {
  theme: 'light',
  board: {
    columns: 0,
    rows: 0,
    mines: 0,
    state: ''
  },
  data: {
    level: 0,
    points: 0,
    coins: 0
  },
  prizes: [],
  error: {
    message: ''
  },
  isLoading: false,
  isLoadingLog: false,
  isGameOver: false,
  isGameWin: false,
  isToggleFlag: false
}

export default createReducer(INITIAL_STATE, {
  [APP_THEME_SET]: (state, action) => {
    state.theme = action.payload
  },
  [APP_BOARD_FETCH]: (state) => {
    state.isLoading = true
  },
  [APP_BOARD_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.board = action.payload
  },
  [APP_BOARD_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },
  [APP_BOARD_LOG_SAVE]: (state) => {
    state.isLoadingLog = true
  },
  [APP_BOARD_LOG_SAVE_SUCCESS]: (state, action) => {
    state.isLoadingLog = false
    state.error = { ...INITIAL_STATE.error }
    state.board = {
      ...state.board,
      state: action.payload
    }
  },
  [APP_BOARD_LOG_SAVE_FAILURE]: (state, action) => {
    state.isLoadingLog = true
    state.error = action.payload
  },
  [APP_TOGGLE_FLAG_SET]: (state, action) => {
    state.isToggleFlag = action.payload
  },
  [APP_GAME_OVER_SET]: (state, action) => {
    state.isGameOver = action.payload
  },
  [APP_GAME_WIN_SET]: (state, action) => {
    state.isGameWin = action.payload
  },
  [APP_DATA_FETCH]: (state) => {
    state.isLoading = true
  },
  [APP_DATA_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.data = action.payload
  },
  [APP_DATA_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  },
  [APP_DATA_POINT_SET]: (state, action) => {
    state.data.points = action.payload
  },
  [APP_DATA_COIN_SET]: (state, action) => {
    state.data.coins = action.payload
  },
  [APP_PRIZE_FETCH]: (state) => {
    state.isLoading = true
  },
  [APP_PRIZE_FETCH_SUCCESS]: (state, action) => {
    state.isLoading = false
    state.error = { ...INITIAL_STATE.error }
    state.prizes = action.payload
  },
  [APP_PRIZE_FETCH_FAILURE]: (state, action) => {
    state.isLoading = true
    state.error = action.payload
  }
})

export const appThemeSet = (theme: AppInitialState['theme']) => ({
  type: APP_THEME_SET,
  payload: theme
})

export const appBoardFetch = () => ({
  type: APP_BOARD_FETCH
})

export const appBoardFetchSuccess = (payload: AppInitialState['board']) => ({
  type: APP_BOARD_FETCH_SUCCESS,
  payload
})

export const appBoardFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_BOARD_FETCH_FAILURE,
  payload
})

export const appBoardLogSave = (cellsStringify: string, points: number, time: number) => ({
  type: APP_BOARD_LOG_SAVE,
  payload: {
    decodedStateName: cellsStringify,
    decodedPointName: points,
    decodedTimeName: time
  }
})

export const appBoardLogSaveSuccess = (payload: AppInitialState['board']['state']) => ({
  type: APP_BOARD_LOG_SAVE_SUCCESS,
  payload
})

export const appBoardLogSaveFailure = (payload: AppInitialState['error']) => ({
  type: APP_BOARD_LOG_SAVE_FAILURE,
  payload
})

export const appToggleFlagSet = (value: AppInitialState['isToggleFlag']) => ({
  type: APP_TOGGLE_FLAG_SET,
  payload: value
})

export const appGameOverSet = (value: AppInitialState['isGameOver']) => ({
  type: APP_GAME_OVER_SET,
  payload: value
})

export const appGameWinSet = (value: AppInitialState['isGameWin']) => ({
  type: APP_GAME_WIN_SET,
  payload: value
})

export const appDataFetch = () => ({
  type: APP_DATA_FETCH
})

export const appDataFetchSuccess = (payload: AppInitialState['data']) => ({
  type: APP_DATA_FETCH_SUCCESS,
  payload
})

export const appDataFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_DATA_FETCH_FAILURE,
  payload
})

export const appDataPointSet = (value: AppInitialState['data']['points']) => ({
  type: APP_DATA_POINT_SET,
  payload: value
})

export const appDataCoinSet = (value: AppInitialState['data']['coins']) => ({
  type: APP_DATA_COIN_SET,
  payload: value
})

export const appPrizeFetch = () => ({
  type: APP_PRIZE_FETCH
})

export const appPrizeFetchSuccess = (payload: AppInitialState['prizes']) => ({
  type: APP_PRIZE_FETCH_SUCCESS,
  payload
})

export const appPrizeFetchFailure = (payload: AppInitialState['error']) => ({
  type: APP_PRIZE_FETCH_FAILURE,
  payload
})
