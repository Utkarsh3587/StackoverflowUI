import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  sort = ['activity', 'votes', 'creation', 'relevance'];
  order = ['ascending', 'descending'];
  includedTagList = [];
  excludedTagList = [];
  obtainedData = null;
  FormData = {
      tagged: [],
      nottagged: [],
      intitle: '',
      fromdate: null,
      todate: null,
      sort: '',
      order: '',
      number_of_results: null,
      max: null,
      min: null,
  };

  constructor(private apiService: ApiService, public datepipe: DatePipe,
              public router: Router) { }

  ngOnInit(): void {
    this.FormData.number_of_results = 10;
    this.FormData.sort = 'votes';
    this.FormData.order = 'ascending';
  }

  removeTag(tag: string, list: any): void {
    const index = list.indexOf(tag);
    list.splice(index, 1);
  }

  onAddTags(tag: string): void {
    this.includedTagList.push(tag);
  }

  onAddExTags(tag: string): void {
    this.excludedTagList.push(tag);
  }

  refreshPage(): void {
    window.location.reload();
  }

  submitFormData(): void {
    this.FormData.fromdate = this.datepipe.transform(this.FormData.fromdate, 'dd/MM/yyyy');
    this.FormData.todate = this.datepipe.transform(this.FormData.todate, 'dd/MM/yyyy');
    this.apiService.getQuestions(this.FormData).subscribe(message => {
      console.log(message);
      if (message.status !== 400) {
        alert(message.message);
        this.obtainedData = message.data;
        console.log(this.obtainedData);
      } else {
        alert('Sorry something went wrong');
      }
    }, error => {
       if (error.status === 429) {
        alert(error.error.message + ' Try after sometime' );
      }
    });
  }

}
