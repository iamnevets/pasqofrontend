import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from '../exam/exam.service';
import { Exam } from 'src/app/models/exam';

@Component({
  selector: 'app-exam-practice',
  templateUrl: './exam-practice.component.html',
  styleUrls: ['./exam-practice.component.css']
})
export class ExamPracticeComponent implements OnInit {
  exams: Exam[];
  isPractice = false;

  constructor(private router: Router, private examService: ExamService) { }

  ngOnInit() {
    this.getAllExams();
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(response => {
      if (response.Success) {
        this.exams = response.Data;
      }
    });
  }

  practice(id: number) {
    this.isPractice = true;
    this.router.navigateByUrl('examview/' + id);
  }

}
