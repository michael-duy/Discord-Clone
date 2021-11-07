import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { postLogin } from '../repositories/AuthRepository'

const login = createAsyncThunk(
    'auth/login', 
    async (payload, thunkAPI) => {
        let res = null
        await postLogin(payload).then(response => {
            res = response.data
        }).catch(error => {
            throw new Error(error.response.data.error_message)
        }) 

        return res
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        config: {},
        token: '',
        isLoggedIn: false
    },

    reducers: {
    },
    extraReducers: builder => {
        builder
        .addCase(login.pending, (state, action) => {
        })
        .addCase(login.rejected, (state, action) => {
        })
        .addCase(login.fulfilled, (state, action) => {
            if(action.payload.data) {
                state.user = action.payload.data.user
                state.token = action.payload.data.token
                state.isLoggedIn = true
            } 
        })
    }
})

export { login }

export default authSlice.reducer