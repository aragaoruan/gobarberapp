import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';
import api from '~/services/api';
// import history from '~/services/history';
import { singInSuccess, singFailure } from './actions';

export function* singIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'O usuario nao pode ser prestador de servico'
      );
      return;
    }

    yield put(singInSuccess(token, user));

    api.defaults.headers.Authorization = `Beare ${token}`;

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert('Falha na autenticação', 'Verifique seus dados');
    yield put(singFailure());
  }
}

export function* singUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      provider: true,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert('Falha no cadastro', 'Verifique seus dados');

    yield put(singFailure());
  }
}

/**
 * Setando TOKEN para todas as requisições
 */
export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Beare ${token}`;
  }
}

export function singOut() {
  console.tron.error('OI');
  history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SING_IN_REQUEST', singIn),
  takeLatest('@auth/SING_UP_REQUEST', singUp),
  takeLatest('@auth/SING_OUT', singOut),
]);
