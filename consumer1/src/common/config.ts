import * as process from 'process';

export default () => ({
  grpcConfig: {
    url: process.env.GRPC_SERVER_URL,
  } ,
});
