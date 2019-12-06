import { School } from './school';
export interface ContactUs {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    SchoolId: number;
    School: School;
    Message: string;
    Date: Date;
}
