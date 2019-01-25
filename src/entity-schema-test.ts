import { EntitySchema } from 'typeorm';
import { createConnection } from './connection';

class User {
    id?: number;
    name: string;
}

class Application {
    id?: number;
    code: string;
    user: User;
}


export async function entitySchemaTest() {

    const UserSchema = new EntitySchema<User>({
        name: "user",
        columns: {
            id: {
                type: "int",
                primary: true,
                generated: true
            },
            name: {
                type: "varchar",
                length: 100,
            }
        }
    });

    const ApplicationSchema = new EntitySchema<Application>({
        name: "application",
        columns: {
            id: {
                type: "int",
                primary: true,
                generated: true
            },
            code: {
                type: "varchar",
                length: 100,
            }
        },
        relations: {
            user: {
                type: "many-to-one",
                target: "user"
            }
        }
    });

    const connection = await createConnection([UserSchema, ApplicationSchema]);

    const userRepository = connection.getRepository(UserSchema);
    const user = userRepository.create({
        name: 'user1'
    });

    const applicationRepository = connection.getRepository(ApplicationSchema);
    const application = applicationRepository.create({
        code: 'code1',
        user: user
    });

    await connection.manager.save([user, application]);

    await connection.close();
}