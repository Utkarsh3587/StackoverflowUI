import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {

  sort = ['activity', 'votes', 'creation', 'relevance'];
  order = ['ascending', 'descending'];
  accepted = [null, 'True', 'False'];
  closed = [null, 'True', 'False'];
  migrated = [null, 'True', 'False'];
  notice = [null, 'True', 'False'];
  wiki = [null, 'True', 'False'];
  includedTagList = [];
  excludedTagList = [];
  obtainedData = null;
  FormData = {
      tagged: [],
      nottagged: [],
      title: '',
      fromdate: null,
      todate: null,
      sort: '',
      order: '',
      max: null,
      min: null,
      page: 1,
      pagesize: 10,
      q: null,
      body: null,
      answers: null,
      accepted: null,
      closed: null,
      migrated: null,
      notice: null,
      user: null,
      url: null,
      views: null,
      wiki: null

  };

  constructor(private apiService: ApiService, public datepipe: DatePipe,
              public router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.FormData.pagesize = 10;
    this.FormData.sort = 'activity';
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
    this.FormData.tagged = this.includedTagList;
    this.FormData.nottagged = this.excludedTagList;
    console.log(this.includedTagList, this.excludedTagList);
    this.FormData.fromdate = this.datepipe.transform(this.FormData.fromdate, 'dd/MM/yyyy');
    this.FormData.todate = this.datepipe.transform(this.FormData.todate, 'dd/MM/yyyy');
    this.apiService.getQuestions(this.FormData).subscribe(message => {
      if (message.status !== 400) {
        this.toastr.success(message.message, 'Data');
        this.obtainedData = message.data;
        console.log(this.obtainedData);
      } else {
        this.toastr.error('Sorry something went wrong', 'Error!');
      }
    }, error => {
       if (error.status === 429) {
        this.toastr.error(error.error.message + ' Try after sometime', 'Too Many Requests!');
      }
    });
  }

}
