import { configureStore, createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    user: null,
    users: []
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.user = action.payload; // Store the logged-in user's data
    },
    logout(state) {
      state.isLoggedIn = false;
      state.user = null;
      state.users = [];
    },
    setUsers(state, action) {
      state.users = action.payload; // Store all users
    }
  }
});

export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  }
});
