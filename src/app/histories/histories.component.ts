import { Component, OnInit } from '@angular/core';
import {ErrorMessage, Security} from "../security/security.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppRequestService} from "../services/app-request.service";

export interface History{
  id:number,
  secId:string,
  tradeDate:Date,
  numTrades:number,
  open:number,
  close:number
}

@Component({
  selector: 'app-histories',
  templateUrl: './histories.component.html',
  styleUrls: ['./histories.component.css']
})
export class HistoriesComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  historyById:History = {
    id:0,
    secId:'',
    tradeDate: Date.prototype,
    numTrades:0,
    open:0,
    close:0
  }

  errorNameMessage: ErrorMessage = new ErrorMessage()
  hasFoundById: boolean = false
  openGetSrc = false
  panelText = 'Show histories panel'


  constructor(private service: AppRequestService) { }

  ngOnInit(): void {
  }


  changeShowPanel(){
    if(this.openGetSrc){
      this.panelText = 'Show histories panel'
      this.openGetSrc = false
    } else{
      this.panelText = 'Hide histories panel'
      this.openGetSrc = true
    }
  }

  setErrorMessage(error: any, messages: ErrorMessage){
    switch (error){
      case 400:
        messages.message = 'Error: Incorrect request parameters.'
        break
      case 404:
        messages.message = 'Error: The resource was not found.'
        break
    }
    setTimeout(() => {
      messages.message = ''
    }, 5000)
  }

  getHistoryById(id: any){
    this.service.getHistoryById(id).subscribe(response => {
      this.historyById = response
      this.hasFoundById = true
    }, error => {
      this.setErrorMessage(error.status, this.errorNameMessage)
    })
  }

  delHistoryById(id: any){
    this.service.delHistoryById(id).subscribe()
  }

  updateHistory(id: any, secId: string, tradeDate: any, numTrades: any, open: any, close: any){
    this.service.updateHistory({
      id: id,
      secId: secId,
      tradeDate: tradeDate,
      numTrades: numTrades,
      open: open,
      close: close
    });
  }

  saveHistory(){
    let formData: FormData = new FormData();
    // @ts-ignore
    formData.append('file', this.myForm.get('fileSource').value);
    this.service.saveHistory(formData)
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

}
