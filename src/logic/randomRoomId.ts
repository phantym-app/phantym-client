import Hashids from 'hashids';

const hashids = new Hashids('unsl', 5, 'abcdefghijklmnopqrstuvwxyz');
const randomRoomId = () => hashids.encode(Math.round(Math.random() * 999));
export default randomRoomId;
