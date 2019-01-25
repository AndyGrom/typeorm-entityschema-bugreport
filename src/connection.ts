import { Connection, EntitySchema } from 'typeorm';

export async function createConnection(entities: ((Function | string | EntitySchema<any>))[]): Promise<Connection> {
    const connection = new Connection({
        type: "sqljs",
        synchronize: true,
        logging: "all",
        entities
    });

    await connection.connect();

    return connection;
}