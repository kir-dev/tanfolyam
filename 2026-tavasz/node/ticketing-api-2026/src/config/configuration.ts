export interface Config {
  port: number;
  frontendUrl: string;
  database: {
    url: string;
  };
}

export default (): Config => ({
  port: parseInt(process.env.PORT || '3000', 10) || 3000,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000',
  database: {
    url: process.env.DATABASE_URL || 'file:./dev.db',
  },
});
