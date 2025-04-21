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
} from '../../../utils/burger-api';
import { setCookie, deleteCookie } from '../../../utils/cookie';

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
    selectUserLoading: (state) => state.isLoading,
    selectErrorText: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuth = false;
        state.userInfo = { name: '', email: '' };
        deleteCookie('accessToken');
        localStorage.removeItem('refreshToken');
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
      })
      .addCase(fetchLoginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchLoginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
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
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
      })
      .addCase(fetchUpdateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUpdateUser.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUpdateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo.name = action.payload.name;
        state.userInfo.email = action.payload.email;
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
    const res = await loginUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchRegisterUser = createAsyncThunk(
  'user/register',
  async (data: TRegisterData) => {
    const res = await registerUserApi(data);
    setCookie('accessToken', res.accessToken);
    localStorage.setItem('refreshToken', res.refreshToken);
    return res.user;
  }
);

export const fetchUser = createAsyncThunk('user/get', async () => {
  const res = await getUserApi();
  return res.user;
});

export const fetchUpdateUser = createAsyncThunk(
  'user/update',
  async (user: Partial<TRegisterData>) => {
    const res = await updateUserApi(user);
    return res.user;
  }
);

export const fetchLogout = createAsyncThunk('user/logout', async () => {
  const res = await logoutApi();
  deleteCookie('accessToken');
  localStorage.removeItem('refreshToken');
  return res.success;
});

export const {
  selectUserInfo,
  selectIsAuthenticated,
  selectIsInit,
  selectUserLoading,
  selectErrorText
} = userSlice.selectors;

export const { initUser, setErrorText, removeErrorText } = userSlice.actions;

export default userSlice.reducer;
