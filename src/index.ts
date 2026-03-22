import app from '#/app.ts';
import logger from '#/utils/logger.ts';
import Env from '#/env.ts';

const PORT = Env.PORT;

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
