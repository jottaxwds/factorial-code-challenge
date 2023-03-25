import cors from 'cors';

const allowedOrigins = ['http://localhost:3000', 'http://localhost:3002']

export default cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  });