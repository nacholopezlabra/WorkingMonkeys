import { Component, ViewChild, OnInit, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-add-rankings',
  templateUrl: './add-rankings.component.html',
  styleUrls: ['./add-rankings.component.css']
})
export class AddRankingsComponent {

  validateLog: FormGroup = new FormGroup({
    rankingname: new FormControl('', [Validators.required]),
  });


  @ViewChild("addranking", {static: false}) addranking: TemplateRef<any> | undefined;

  constructor(private modalService: NgbModal){

  }

  addRanking(){
    this.modalService.open(this.addranking);

  }
}
