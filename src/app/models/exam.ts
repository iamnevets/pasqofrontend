import { Course } from 'src/app/models/course';
import { Programme } from 'src/app/models/Programme';
import { School } from 'src/app/models/school';

export interface Exam {
    Id: number;
    Title: string;
    SchoolId: number;
    School: School;
    ProgrammeId: number;
    Programme: Programme;
    CourseId: number;
    Course: Course;
    Year: Date;

    numOfQuestions: number;
}
