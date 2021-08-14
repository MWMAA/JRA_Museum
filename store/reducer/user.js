const initialState = {
  token: null,
  userData: null,
  didTryAutoLogin: false,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "AUTHENTICATE":
      return {
        token: action.token,
        userData: action.userId,
        didTryAutoLogin: true,
      };
    case "LOGOUT":
      return { ...initialState, didTryAutoLoginkey: false };
    case "SET_DID_TRY_AL":
      return { ...state, didTryAutoLoginkey: true };
    default:
      return state;
  }
};
