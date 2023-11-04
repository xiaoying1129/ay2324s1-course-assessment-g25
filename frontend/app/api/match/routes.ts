import io from 'socket.io-client';
const socket = io('http://localhost:8081');

const BASE_URL = 'http://localhost:8081/match'

export interface PAIR {
  roomId: string,
  username1: string,
  username2: string,
  complexity: string,
  isDone: boolean
  /*   question: string */
}

async function fetchData(api: string, requestOptions = {}): Promise<any> {
  const response = await fetch(api, requestOptions)
  const results = await response.json()
  if (!response.ok) {
    throw new Error(results.error)
  }
  return results.res
}

export async function fetchPairByRoom(roomId: string): Promise<PAIR> {
  const fetchPairApi = `${BASE_URL}/getPair/${roomId}`
  return fetchData(fetchPairApi)
}

export async function deletePair(username: string): Promise<void> {
  const fetchPairApi = `${BASE_URL}/getPair/${username}`
  return fetchData(fetchPairApi)
}

export async function fetchPair(username: string): Promise<PAIR> {
  const fetchPairApi = `${BASE_URL}/getPair/${username}`
  return fetchData(fetchPairApi)
}

export async function fetchAllPairs(): Promise<PAIR[]> {
  return fetchData(`${BASE_URL}/pair}`)
}

export const findMatch = (username: string, complexity: string) => {
  const data = {username, complexity};
  socket.emit('find-match', data);
};

export const cancelMatch = (username:string) => {
  socket.emit('cancel-match', {username});
};

export const joinRoom = (roomId: string) => {
  socket.emit('join-room', { roomId });
};

export const fetchQuestion = (roomId: string, complexity: string) => {
  socket.emit('fetch-question', { roomId, complexity });
};