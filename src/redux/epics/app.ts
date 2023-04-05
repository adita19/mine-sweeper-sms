import { of } from 'rxjs'
import { catchError, mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

import type { Epic } from 'redux-observable'
import type { EpicDependencies } from 'redux/store'
import type { CellPorps } from 'types/board'

import {
  APP_BOARD_FETCH,
  appBoardFetchFailure,
  appBoardFetchSuccess,
  APP_BOARD_LOG_SAVE,
  appBoardLogSaveFailure,
  appBoardLogSaveSuccess,
  APP_DATA_FETCH,
  appDataFetchFailure,
  appDataFetchSuccess,
  APP_PRIZE_FETCH,
  appPrizeFetchFailure,
  appPrizeFetchSuccess
} from 'redux/reducers/app'

import { COMMENT_GET } from 'constants/endpoint'

export const appBoardFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_BOARD_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = {
            columns: 14,
            rows: 14,
            mines: 10,
            state: ''
          }
          return of(appBoardFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(appBoardFetchFailure(error))
        })
      )
    )
  )

export const appBoardLogSaveEpic: Epic = (action$, state$, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_BOARD_LOG_SAVE),
    mergeMap((action) => {
      return api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com'
      }).pipe(
        mergeMap(({ response }: any) => {
          const decodedState = btoa(action.payload.decodedStateName)
          const decodedPoints = btoa(action.payload.decodedPointName)
          const encodedData = btoa(
            JSON.stringify({
              decodedStateName: decodedState,
              decodedPointsName: decodedPoints
            })
          )
          // console.log(encodedData)
          const data = action.payload.decodedStateName
          return of(appBoardLogSaveSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(appBoardLogSaveFailure(error))
        })
      )
    })
  )

export const appDataFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_DATA_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = {
            level: 1,
            points: 0,
            coins: 5
          }
          return of(appDataFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(appDataFetchFailure(error))
        })
      )
    )
  )

export const appPrizeFetchEpic: Epic = (action$, _, { api }: EpicDependencies) =>
  action$.pipe(
    ofType(APP_PRIZE_FETCH),
    mergeMap((action) =>
      api({
        endpoint: COMMENT_GET,
        host: 'https://jsonplaceholder.typicode.com',
        query: {
          postId: action.payload
        }
      }).pipe(
        mergeMap(({ response }: any) => {
          const data = [
            {
              id: 1,
              name: '1 Unit Sepeda Motor',
              label: 'Peringkat Pertama',
              imageSrc: '/images/motor.png'
            },
            {
              id: 2,
              name: '1 Unit Handphone',
              label: 'Peringkat Kedua',
              imageSrc: '/images/handphone.png'
            },
            {
              id: 3,
              name: '1 Unit Smart Watch',
              label: 'Peringkat Ketiga',
              imageSrc: '/images/smartwatch.png'
            }
          ]
          return of(appPrizeFetchSuccess(data))
        }),
        catchError((err) => {
          const error = {
            message: 'Gagal mendapatkan data'
          }
          return of(appPrizeFetchFailure(error))
        })
      )
    )
  )
