import cors from 'cors';

const corsOptions = {
  origin: 'http://ni-chat.com',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};

const corsConfig = cors(corsOptions);

export default corsConfig;
