import { School } from './school';

export interface Programme {
    Id: number;
    Name: string;
    SchoolId: number;
    School: School;
    NumberOfCourses: number;
}
