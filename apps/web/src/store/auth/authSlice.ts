import { createSlice } from "@reduxjs/toolkit";
import { authLogin, authRegister, checkSession, logout } from "./authThunk";
import type { User, Session } from "@supabase/supabase-js";

interface AuthState {
  isLoading: boolean;
  checkSessionLoading: boolean;
  user: User | null;
  session: Session | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoading: false,
  checkSessionLoading: true,
  user: null,
  session: null,
  isLoggedIn: !!null,
} as AuthState;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      state.isLoggedIn = !!action.payload.user;
      state.user = action.payload.user;
      state.session = action.payload.session;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(checkSession.pending, (state, action) => {
      state.checkSessionLoading = true;
    });
    builder.addCase(authLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload?.session) return;
      state.user = action.payload!.user;
      state.session = action.payload!.session;
      state.isLoggedIn = true;
    });
    builder.addCase(authRegister.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authRegister.fulfilled, (state, action) => {
      state.isLoading = false;
      if (!action.payload?.user) return;
      state.user = action.payload!.user;
      state.session = action.payload!.session;
      state.isLoggedIn = true;
    });
    builder.addCase(checkSession.fulfilled, (state, action) => {
      state.checkSessionLoading = false;
      if (!action?.payload?.session) return;
      state.user = action.payload!.user;
      state.session = action.payload!.session;
      state.isLoggedIn = true;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.user = null;
      state.session = null;
      state.isLoggedIn = false;
    });
  },
});

export default authSlice.reducer;
export const { setAuth } = authSlice.actions;
