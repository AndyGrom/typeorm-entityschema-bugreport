import 'reflect-metadata';
import { entitySchemaTest } from './src/entity-schema-test';
import { entityTest } from './src/entity-test';

(async () => {
    try {
        console.log(`--- entity test ---`);
        await entityTest();
        console.log(`--- entity schema test ---`);
        await entitySchemaTest();
    } catch (err) {
        console.error(err.toString());
    }
})();