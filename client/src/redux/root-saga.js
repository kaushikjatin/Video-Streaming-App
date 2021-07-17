import { call,all } from "redux-saga/effects";
import { rootUserSaga} from "./user/user.sagas";
import { rootFileSaga } from "./fileUploader/file.sagas";
import { rootVideosSaga } from "./videoDashboard/videoDashboard.sagas";

export  default function* rootSaga(){
    yield all([call(rootUserSaga),call(rootFileSaga),call(rootVideosSaga)]);
}