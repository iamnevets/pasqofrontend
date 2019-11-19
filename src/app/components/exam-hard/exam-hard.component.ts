import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam';
import { Router } from '@angular/router';
import { ExamService } from '../exam/exam.service';

@Component({
  selector: 'app-exam-hard',
  templateUrl: './exam-hard.component.html',
  styleUrls: ['./exam-hard.component.css']
})
export class ExamHardComponent implements OnInit {
  exams: Exam[];

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
    this.router.navigate(['/examview/' + id, {previous: 'examhard'}]);
  }


}
