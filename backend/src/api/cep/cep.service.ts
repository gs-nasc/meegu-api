import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { CEP } from './interface/cep.interface';

@Injectable()
export class CepService {

    constructor() {}
    
    async getCep(c: string): Promise<CEP> {
        const cep: CEP = (await axios.get(`https://viacep.com.br/ws/${c}/json/`)).data;
        
        return cep;
    }

}
