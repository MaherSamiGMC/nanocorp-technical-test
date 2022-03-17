import { configureStore } from '@reduxjs/toolkit'
import { fetchingDataReducer } from './reducer'

const store=configureStore({
    reducer: {fetchingDataReducer}
  })

export default store