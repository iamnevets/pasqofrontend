import { User } from './user';
import { Exam } from './exam';
import { SelectedAnswer } from './selected-answer';

export interface ExamRecord {
    Id: number;
    UserId: string;
    User: User;
    ExamId: number;
    Exam: Exam;
    Score: number;
    TimeTaken: string;
    SelectedAnswers: SelectedAnswer[];
    NumberOfQuestionsAnswered: number;
}
