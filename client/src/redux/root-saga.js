import { call,all } from "redux-saga/effects";
import { rootUserSaga} from "./user/user.sagas";

export  default function* rootSaga(){
    yield all([call(rootUserSaga)]);
}