import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExamPracticeService {
  progressCounter = 0;
  examId: number;

  constructor() { }

}
