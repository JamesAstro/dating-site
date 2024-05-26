import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface PersonalInfo {
  name: string;
  birthdate: Date;
}

interface LoginInfo {
  email: string;
}

interface SignupState {
  personalInfo: PersonalInfo;
  loginInfo: LoginInfo;
  password?: string;
}

const initialState: SignupState = {
  personalInfo: {
    name: "",
    birthdate: new Date(),
  },

  loginInfo: {
    email: "",
  },
  password: undefined,
};

const signUpStepSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {
    // resetSignupState(state) {

    //   return { ...initialState };
    // }
    resetSignupState(state) {
      Object.assign(state, initialState);
      // state = initialState
    },

    setPersonalInfo(
      state,
      action: PayloadAction<{ personalInfo: PersonalInfo }>
    ) {
      const { personalInfo } = action.payload;
      state.personalInfo = {
        ...personalInfo,
        birthdate: personalInfo.birthdate,
      };
    },

    setLoginInfo(
      state,
      action: PayloadAction<{ loginInfo: LoginInfo; password: string }>
    ) {
      const { loginInfo } = action.payload;
      const { password } = action.payload;
      state.loginInfo = loginInfo;
      state.password = password;
    },
  },
});

export const {
  setPersonalInfo,

  setLoginInfo,
  resetSignupState,
} = signUpStepSlice.actions;

export default signUpStepSlice.reducer;
