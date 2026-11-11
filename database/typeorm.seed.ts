import { runSeeders } from 'typeorm-extension';
import dataSource from './typeorm.config.js';

(async () => {
    await dataSource.initialize();
    await runSeeders(dataSource);
})();
