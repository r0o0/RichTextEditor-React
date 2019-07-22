import { combineEpics } from "redux-observable";

import randomEpic from "./randomEpic";

const epics = combineEpics(
  ...Object.values(randomEpic)
);

export default epics;
