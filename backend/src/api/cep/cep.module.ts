import { Module } from '@nestjs/common';
import { CepService } from './cep.service';

@Module({
    imports: [],
    controllers: [],
    providers: [
        CepService
    ],
    exports: [
        CepService
    ],
})
export class CepModule { }
