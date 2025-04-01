import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import {
  TLoginData,
  TRegisterData,
  loginUserApi,
  registerUserApi,
  updateUserApi,
  getUserApi,
  logoutApi
} from '@api';
import { setCookie, deleteCookie } from 'src/utils/cookie';

export type TUserInitialState = {
  isLoading: boolean;
  isInit: boolean;
  isAuth: boolean;
  userInfo: TUser;
  error: string;
};

const initialState: TUserInitialState = {
  isLoading: false,
  isAuth: false,
  isInit: false,
  userInfo: { name: '', email: '' },
  error: ''
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    initUser(state) {
      state.isInit = true;
    },
    setErrorText(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    removeErrorText(state) {
      state.error = '';
    }
  },
  selectors: {
    selectUserInfo: (state) => state.userInfo,
    selectIsAuthenticated: (state) => state.isAuth,
    selectIsInit: (state) => state.isInit,
    selectLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.userInfo = { name: '', email: '' };
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo.name = action.payload.user.name;
        state.userInfo.email = action.payload.user.email;
        state.isAuth = true;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchLoginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchRegisterUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRegisterUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message!;
      })
      .addCase(fetchRegisterUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo.name = action.payload.user.name;
        state.userInfo.email = action.payload.user.email;
      })
      .addCase(fetchLogout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLogout.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchLogout.fulfilled, (state, action) => {
        state.isLoading = false;

        state.userInfo = { name: '', email: '' };
        state.isAuth = false;
      });
  }
});

export const fetchLoginUser = createAsyncThunk(
  'user/login',
  async (data: TLoginData) => {
    loginUserApi(data).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    });
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    registerUserApi(data).then((res) => {
      setCookie('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
    });
  }
);

export const getUser = createAsyncThunk('user/get', async () => getUserApi());

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const fetchLogout = createAsyncThunk('user/logout', async () => {
  logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
});

export const {
  selectUserInfo,
  selectIsAuthenticated,
  selectIsInit,
  selectLoading
} = userSlice.selectors;

export const { initUser, setErrorText, removeErrorText } = userSlice.actions;

export default userSlice.reducer;
