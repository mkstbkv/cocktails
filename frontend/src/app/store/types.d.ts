import { Artist } from '../models/artist.model';
import { Album } from '../models/album.model';
import { LoginError, RegisterError, User } from '../models/user.model';
import { Track } from '../models/track.model';
import { TracksHistory } from '../models/tracksHistory.model';

export type ArtistsState = {
  artists: Artist[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  publishError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type AlbumsState = {
  albums: Album[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  publishError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}

export type TracksState = {
  tracks: Track[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
  publishLoading: boolean,
  publishError: null | string,
  deleteLoading: boolean,
  deleteError: null | string,
};

export type TracksHistoryState = {
  tracksHistory: TracksHistory[],
  fetchLoading: boolean,
  fetchError: null | string,
  createLoading: boolean,
  createError: null | string,
};

export type AppState = {
  artists: ArtistsState,
  albums: AlbumsState,
  users: UsersState,
  tracks: TracksState,
  tracksHistory: TracksHistoryState
}


