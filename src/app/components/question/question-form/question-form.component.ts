import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../question.service';
import { ExamService } from '../../exam/exam.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exam } from 'src/app/models/exam';
import { Question } from 'src/app/models/question';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.css']
})
export class QuestionFormComponent implements OnInit {
  exams: Exam[];
  examId = 0;
  examTitle: string;
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private examService: ExamService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.editQuestion(id);
    }

    this.questionForm();
    this.getAllExams();
  }

  questionForm() {
    this.formGroup = this.formBuilder.group({
      Id: this.formBuilder.control(null),
      Number: this.formBuilder.control('', Validators.required),
      QuestionText: this.formBuilder.control('', Validators.required),
      ExamId: this.formBuilder.control(this.examId, Validators.required),
      Answer1: this.formBuilder.control('', Validators.required),
      Answer2: this.formBuilder.control('', Validators.required),
      Answer3: this.formBuilder.control('', Validators.required),
      Answer4: this.formBuilder.control('', Validators.required),
      Answer5: this.formBuilder.control('', Validators.required),
      Answer6: this.formBuilder.control('', Validators.required),
      CorrectAnswer: this.formBuilder.control('', Validators.required)
    });
  }

  createOrUpdate() {
    const data: Question = this.formGroup.value;

    this.questionService.createOrUpdate(data).subscribe(response => {
      if (response.Success) {
        this.router.navigateByUrl('questionform');
        window.location.reload();

        Swal.fire({
          title: 'Successful',
          text: 'Question Created',
          type: 'success',
          showConfirmButton: false,
          timer: 1000
        });
      } else {
        Swal.fire({
          title: 'Failed',
          text: response.Message,
          type: 'error',
          showConfirmButton: true,
          confirmButtonColor: '#40844e'
        });
      }
    });
  }

  editQuestion(id: number) {
    this.questionService.getOneQuestion(id).subscribe(response => {
      if (response.Data.Id === id) {
        this.formGroup.patchValue(response.Data);
      }
    });
  }

  cancel() {
    this.router.navigateByUrl('exams');
  }

  getAllExams() {
    this.examService.getAllExams().subscribe(response => {
      if (response.Success) {
        this.exams = response.Data;
        this.examId = this.exams[this.exams.length - 1].Id;
        this.examTitle = this.exams.pop().Title;
      }
    });
  }

}
