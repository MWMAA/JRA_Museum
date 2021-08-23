const initialState = {
  artifacts: [],
};

export const artifactReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ARTIFACTS":
      const artifactsSet = new Set(state.artifacts.concat(action.artifacts));
      return {
        ...state,
        artifacts: [...artifactsSet],
      };
    default:
      return state;
  }
};
