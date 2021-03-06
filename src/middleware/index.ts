import userUtil from '../util/userUtil';
import '../env';

const exceptUrls = [
  '/users/signin',
  '/users/signup',
  '/users/user/exist',
  '/users/signout',
  '/users/password',
];

export default {
  socketMidleware: (socket, next) => {
    const token = socket.handshake.session.userToken;
    if (!token) {
      console.log('this is error');
      return next(new Error('authentication error'));
    }
    userUtil.jwt.verify(token, (err) => {
      if (err) return next(new Error('authentication error'));
    });
    return next();
  },
  verifyToken: (req, res, next) => {
    // exceptUrls에 포함되는 요청
    if (exceptUrls.includes(req.url)) {
      next();
      return;
    }
    // 개발 환경일 경우 예외 처리
    if (process.env.USER_ID) {
      next();
      return;
    }

    const token = req.session.userToken;
    if (!token) {
      res.status(403).end('Not logged in');
    } else {
      userUtil.jwt.verify(token, (err) => {
        if (err) return false;
        next();
      });
    }
  },
};
