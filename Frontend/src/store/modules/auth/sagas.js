import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from '../../../services/axios';
import { get } from 'lodash';

import * as actions from './actions';
import * as types from '../types';

function* loginRequest({ payload }) {
    try {
        const response = yield call(axios.post, '/tokens', payload);
        yield put(actions.loginSuccess({ ...response.data }));

        toast.success('Você fez login com successo!');

        axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;
    }   
    catch {
        toast.error('E-mail ou senha do login inválidos!');
        yield put(actions.loginFailure());
    }
}

function* registerRequest({ payload }) {  
    const { 
        name,
        surname,
        nickname,
        birthDate,
        email,
        password,
        favoriteDriver,
        favoriteTeam
    } = payload;

    try {
        yield call(axios.post, '/users', {
          name,
          surname,
          nickname,
          email,
          password,
          birth_date: birthDate,
          favorite_driver: favoriteDriver,
          favorite_team: favoriteTeam,
          status: 'ACTIVE',
          type: 'NORMAL',
          race_level: 0,
          race_points: 500,
        });
        toast.success('Usuário criado com sucesso!');
        yield put(actions.registerSuccess());
    }
    catch (err) {
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map(e => toast.error(e));
      } else {
        toast.error('FATAL ERROR!');
      }
  
      yield put(actions.registerFailure());
    }
  }

  function persistRehydrate({ payload }) {
    const token = get(payload, 'auth.token', '');
    if (!token) return;
    axios.defaults.headers.Authorization = `Bearer ${token}`;
  }

export default all([
    takeLatest(types.LOGIN_REQUEST, loginRequest),
    takeLatest(types.REGISTER_REQUEST, registerRequest),
    takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  ]);