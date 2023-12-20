const getNextState = (
  currentState,
  val: number,
  margin: number,
  OPEN_STATE: number,
  CLOSED_STATE: number
) => {
  console.log("getNextState", OPEN_STATE, CLOSED_STATE);
  switch (currentState) {
    case OPEN_STATE:
      return val >= currentState + margin ? currentState : CLOSED_STATE;

    case CLOSED_STATE:
      return val >= currentState + margin ? OPEN_STATE : currentState;
    default:
      return currentState;
  }
};

export default getNextState;
