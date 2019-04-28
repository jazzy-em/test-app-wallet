import {all} from 'redux-saga/effects';
import auth from './auth';
import wallet from './wallet';

export default function* root() {
    yield all([...auth, ...wallet]);
}