import { Biometrics } from '../../biometrics/entities/biometrics.entity';
export declare function registerAthleteInputDataBuilder(registerAthleteInput?: {}): {
    biometrics: Biometrics;
    name: string;
    email: string;
    password: string;
};
