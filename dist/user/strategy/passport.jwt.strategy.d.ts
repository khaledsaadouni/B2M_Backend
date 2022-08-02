import { Strategy } from 'passport-jwt';
import { PayloadInterface } from '../interfaces/payload.interface';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private userRepository;
    constructor(userRepository: Repository<UserEntity>);
    validate(payload: PayloadInterface): Promise<UserEntity>;
}
export {};
