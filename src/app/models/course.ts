import { Programme } from './Programme';

export interface Course {
    Id: number;
    Name: string;
    ProgrammeId: number;
    Programme: Programme;
}
