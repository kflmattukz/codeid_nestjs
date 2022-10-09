export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.POSTGRE_HOST,
    port: parseInt(process.env.POSTGRE_PORT, 10) || 5432,
    user: process.env.POSTGRE_USER,
    pass: process.env.POSRGRE_PASS,
    db: process.env.PROSGRE_DB,
  },
});
