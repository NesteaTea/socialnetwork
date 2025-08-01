import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Регистрация
export const registerUser = createAsyncThunk(
    'auth/register',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:4000/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await res.json();

            if (!res.ok) return rejectWithValue({ message: data.message, field: data.field });
            return data;
        } catch (err) {
            return rejectWithValue({ message: err.message });
        }
    }
);



// Авторизация
export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await fetch('http://localhost:4000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (!res.ok) {
                return rejectWithValue(data.message || 'Ошибка входа');
            }
            return data.user;
        } catch (err) {
            return rejectWithValue('Сервер не отвечает');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: null,
        success: null,
        authChecked: false,
    },
    reducers: {
        clearAuthState: (state) => {
            state.error = null;
            state.success = null;
        },
        setUser: (state, action) => {
            state.user = action.payload;
            state.authChecked = true;
        },
        logout: (state) => {
            state.user = null;
            state.authChecked = true;
        },
        setAuthChecked: (state) => {
            state.authChecked = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.success = action.payload.message;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || { message: 'Ошибка регистрации' };
            })
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload;
                state.success = 'Вход выполнен!';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearAuthState, setUser, logout, setAuthChecked } = authSlice.actions;
export default authSlice.reducer;