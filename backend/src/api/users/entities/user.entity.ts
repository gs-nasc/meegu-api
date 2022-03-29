import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../interfaces/user.interface';

@Entity("user")
export class UserEntity implements User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100,
        nullable: false
    })
    name: string;

    @Column({
        type: "date",
        nullable: false
    })
    birthdate: Date;

    @Column({
        type: "boolean",
        nullable: false
    })
    acceptedTerms: boolean;
    
    @Column({
        length: 100,
        nullable: true
    })
    document: string;

    @Column({
        type: "int",
        nullable: false
    })
    zipcode: number;

    @Column({
        length: 100,
        nullable: true
    })
    street: string;

    @Column({
        length: 100,
        nullable: true
    })
    neighborhood: string;

    @Column({
        length: 100,
        nullable: true
    })
    city: string;

    @Column({
        length: 100,
        nullable: true
    })
    state: string;

    @CreateDateColumn({
        type: "timestamp",
        nullable: false,
    })
    createdAt: Date;

    @UpdateDateColumn({
        type: "timestamp",
        nullable: true,
        default: null
    })
    updatedAt: Date;

}
