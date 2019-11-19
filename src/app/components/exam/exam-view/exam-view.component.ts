import { QuestionService } from './../../question/question.service';
import { Router, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Question } from 'src/app/models/question';
import {
  faEdit,
  faChevronLeft,
  faTrashAlt,
  faPlusSquare,
  faShareSquare
} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { User } from 'src/app/models/user';
import { ExamPracticeService } from '../../exam-practice/exam-practice.service';
import { ExamRecordsService } from '../../exam-records/exam-records.service';
import { ExamRecord } from 'src/app/models/exam-record';
import { SelectedAnswer } from 'src/app/models/selected-answer';

@Component({
  selector: 'app-exam-view',
  templateUrl: './exam-view.component.html',
  styleUrls: ['./exam-view.component.css']
})
export class ExamViewComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faChevronLeft = faChevronLeft;
  faPlusSquare = faPlusSquare;
  faShareSquare = faShareSquare;

  selectedAnswers: SelectedAnswer[] = [];
  questions: Question[] = [];
  questionsLength: number;
  examRecord: ExamRecord;
  currentExamRecord: ExamRecord;
  examRecords: ExamRecord[] = [];
  examId: number;
  currentUserId: string;
  previousPage: string;
  isStudent = false;
  isRetake = false;
  totalNumberOfQuestions = 0;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private examPracticeService: ExamPracticeService,
    private examRecordsService: ExamRecordsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.examId = id;
      this.getAllQuestions(id);
    }

    const previousPage = this.activatedRoute.snapshot.paramMap.get('previous');
    if (previousPage) {
      this.previousPage = previousPage;
    }

    const currentUser: User = JSON.parse(localStorage.getItem('user'));
    this.currentUserId = currentUser.Id;
    if (currentUser.UserRole.Name === 'Student') {
      this.isStudent = true;
    }

    const examRecords: ExamRecord[] = JSON.parse(
      localStorage.getItem('examrecords')
    );
    this.examRecords = examRecords.filter(x => x.ExamId === this.examId);
    this.currentExamRecord = this.examRecords.pop();
    console.log(this.currentExamRecord);

  }

  resumedAnswer(questionId: number, answer: string) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.currentExamRecord.SelectedAnswers.length; i++) {
      if (
        questionId === this.currentExamRecord.SelectedAnswers[i].QuestionId &&
        answer === this.currentExamRecord.SelectedAnswers[i].SelectedAnswer
      ) {
        this.selectedAnswer(questionId, answer);
        return true;
      }
    }
  }

  selectedAnswer(id: number, selectedAnswer: string) {
    for (let i = 0; i < this.questionsLength; i++) {
      if (id === this.selectedAnswers[i].QuestionId) {
        this.selectedAnswers[i].SelectedAnswer = selectedAnswer;
        // console.log(this.selectedAnswers[i].SelectedAnswer);
      }
    }
  }

  getAllQuestions(examId: number) {
    this.questionService.getAllQuestions(examId).subscribe(response => {
      if (response.Success) {
        this.questions = response.Data;
        this.questionsLength = this.questions.length;

        // Set the questionId's which will be used to save a selected answer uniquely
        for (let i = 0; i < this.questionsLength; i++) {
          const newSelectedAnswer: SelectedAnswer = {
            QuestionId: this.questions[i].Id,
            SelectedAnswer: ''
          };
          this.selectedAnswers.push(newSelectedAnswer);
        }

        // Check to see if user is retaking exam(complete) or resuming exam(incomplete)
        if (this.currentExamRecord.NumberOfQuestionsAnswered < this.questions.length) {
          this.isRetake = false;
        } else {
          this.isRetake = true;
        }
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

  addQuestion() {
    this.router.navigate(['/questionform', { examid: this.examId }]);
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
            this.ngOnInit();

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

  numberOfQuestionsAnswered() {
    let count = 0;
    for (let i = 0; i < this.questionsLength; i++) {
      if (this.selectedAnswers[i].SelectedAnswer !== '') {
        count++;
      }
    }
    // this.progressCounter = count;

    this.examPracticeService.examId = this.examId;
    this.examPracticeService.progressCounter = count;
    return count;
  }

  submit() {
    Swal.fire({
      title: 'Confirm Submission',
      text: 'Are you sure?',
      type: 'question',
      showConfirmButton: true,
      confirmButtonText: 'Yes',
      confirmButtonColor: '#40844e'
    }).then(result => {
      if (result.value) {
        this.examRecord = {
          Id: null,
          UserId: this.currentUserId,
          User: null,
          ExamId: this.examId,
          Exam: null,
          Score: 10,
          TimeTaken: '00:39:59',
          SelectedAnswers: this.selectedAnswers.filter(
            x => x.SelectedAnswer !== ''
          ),
          NumberOfQuestionsAnswered: this.numberOfQuestionsAnswered()
        };

        this.examRecordsService
          .createExamRecord(this.examRecord)
          .subscribe(response => {
            if (response.Success) {
              this.router.navigateByUrl('examrecordview/' + response.Data.Id);
            }
          });
      }
    });
  }

  back() {
    if (this.isStudent === false) {
      this.router.navigateByUrl('exams');
    } else if (this.previousPage === 'examhard') {
      this.router.navigateByUrl(this.previousPage);
    } else {

      // Compare selected answers with currentExamRecord.SelectedAnswers before displaying modal
      let counter = 0;
      for (let i = 0; i < this.currentExamRecord.SelectedAnswers.length; i++) {
        if (
          this.currentExamRecord.SelectedAnswers[i].SelectedAnswer ===
          this.selectedAnswers[i].SelectedAnswer
        ) {
          counter++;
        }
      }

      if (this.numberOfQuestionsAnswered() > 0 && counter !== this.numberOfQuestionsAnswered()) {
        Swal.fire({
          title: 'Confirm',
          text: 'Do you want to save your answers for later?',
          type: 'warning',
          showConfirmButton: true,
          showCancelButton: true,
          confirmButtonColor: '#40844e',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Save',
          // tslint:disable-next-line: quotemark
          cancelButtonText: "Don't save"
        }).then(result => {
          if (result.value) {
            this.examRecord = {
              Id: null,
              UserId: this.currentUserId,
              User: null,
              ExamId: this.examId,
              Exam: null,
              Score: 10,
              TimeTaken: '00:39:59',
              SelectedAnswers: this.selectedAnswers.filter(
                x => x.SelectedAnswer !== ''
              ),
              NumberOfQuestionsAnswered: this.numberOfQuestionsAnswered()
            };

            this.examRecordsService
              .createExamRecord(this.examRecord)
              .subscribe(response => {
                if (response.Success) {
                  this.router.navigateByUrl(this.previousPage);
                  Swal.fire({
                    title: 'Successful',
                    text: 'Answers saved',
                    type: 'success',
                    showConfirmButton: false,
                    timer: 1000
                  });
                }
              });
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            this.router.navigateByUrl(this.previousPage);
          }
        });
      } else {
        this.router.navigateByUrl(this.previousPage);
      }
    }
  }
}
