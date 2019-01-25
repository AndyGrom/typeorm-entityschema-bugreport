import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Connection } from 'typeorm';
import { createConnection } from './connection';

@Entity('user')
class User {
    @PrimaryGeneratedColumn() id: number;
    @Column({length: 100}) name: string;
}

@Entity('application')
class Application {
    @PrimaryGeneratedColumn() id: number;
    @Column({length: 100}) code: string;
    @ManyToOne(type => User) user: User;
}

export async function entityTest() {

    const connection = await createConnection([User, Application]);

    const user = new User();
    user.name = "user1";

    const application = new Application();
    application.code = "code1";
    application.user = user;

    await connection.manager.save([user, application]);

    await connection.close();
}