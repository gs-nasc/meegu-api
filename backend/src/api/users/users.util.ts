import { BadRequestException, NotAcceptableException, UnauthorizedException } from "@nestjs/common";
import { User } from "./interfaces/user.interface";

const Util = {
    /**
     * Check if the user is valid
     * @param user User to check
     */
    check: (user: User): void => {
        if (user.name == undefined || user.name == null) throw new BadRequestException('Name is required');
        if (user.name.trim().length < 2 || user.name.trim().length > 100) throw new BadRequestException('Name must be between 2 and 100 characters');
        if (user.birthdate == undefined || user.name == null) throw new BadRequestException('Birthdate is required');
        if (!user.birthdate.toString().match(/^\d{4}-\d{2}-\d{2}$/)) throw new BadRequestException('Birthdate must be in the format YYYY-MM-DD');
        if (Util.age(user.birthdate) < 18) throw new UnauthorizedException('You must be older than 18 years');
        if (user.acceptedTerms == undefined || user.acceptedTerms == null) throw new BadRequestException('Accepted terms is required');
        if (!user.acceptedTerms) throw new NotAcceptableException('You must accept the terms');
        if (!(typeof user.acceptedTerms === 'boolean')) throw new BadRequestException('Accepted terms must be a boolean');
    },
    /**
     * Calculate the age of a user
     * @param date Date to be checked
     * @returns {number}
     */
    age: (date: Date): number => {
        const today = new Date();
        const birthDate = new Date(date);
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }
}

export default Util;