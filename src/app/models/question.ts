import { Exam } from './exam';

export interface Question {
    Id: number;
    QuestionText: string;
    ExamId: number;
    Exam: Exam;
    Answer1: string;
    Answer2: string;
    Answer3: string;
    Answer4: string;
    Answer5: string;
    Answer6: string;
    CorrectAnswer: string;
}
