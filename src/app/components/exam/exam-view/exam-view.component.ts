import { QuestionService } from './../../question/question.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import { faEdit, faChevronLeft, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faChevronLeft = faChevronLeft;

  questions: Question[];

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getAllQuestions(id);
    }

  }

  getAllQuestions(examId: number) {
    this.questionService.getAllQuestions(examId).subscribe(response => {
      if (response.Success) {
        this.questions = response.Data;
      } else {
        Swal.fire({
          title: 'Failed',
          text: response.Message,
          type: 'error',
          showConfirmButton: true
        });
      }
    });
  }

  updateQuestion(id: number) {
    this.router.navigateByUrl('questionform/' + id);
  }

  delete(id: number) {
    Swal.fire({
      title: 'Confirm',
      text: 'Are you sure?',
      type: 'warning',
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonColor: '#40844e',
      cancelButtonColor: '#d33',
      confirmButtonText: 'delete it'
    }).then(result => {
      if (result.value) {
        this.questionService.delete(id).subscribe(response => {
          if (response.Success) {
            // this.router.navigateByUrl('exams');
            window.location.reload();

            Swal.fire({
              title: 'Successful',
              text: 'Qustion deleted',
              type: 'success',
              showConfirmButton: false,
              timer: 1000
            });
          } else {
            Swal.fire({
              title: 'Failed',
              text: response.Message,
              type: 'error',
              showConfirmButton: true
            });
          }
        });
      }
    });

  }

  back() {
    this.router.navigateByUrl('exams');
  }

}
