import { BadRequestException, UnauthorizedException } from "@nestjs/common";

const Util = {
    /**
     * Check if the user is valid
     * @param user User to check
     */
    check: (user): void => {
        if(user.name == undefined || user.name == null) throw new BadRequestException('Name is required');
        if(user.name.trim().length < 2 || user.name.trim().length > 100) throw new BadRequestException('Name must be between 2 and 100 characters');
        if(user.birthdate == undefined || user.name == null) throw new BadRequestException('Birthdate is required');
        if(Util.age(user.birthdate) < 18) throw new UnauthorizedException('You must be older than 18 years');
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