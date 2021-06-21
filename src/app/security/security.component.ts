import { Component, OnInit } from '@angular/core';
import {AppRequestService} from "../services/app-request.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

export interface Security{
  id:number,
  secId:string,
  regNumber:string,
  name:string,
  emitentTitle:string
}

export class ErrorMessage{
  message: string = ''
}

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  securityById:Security = {
    id:0,
    secId:'',
    regNumber:'',
    name:'',
    emitentTitle:''
  }

  errorNameMessage: ErrorMessage = new ErrorMessage()
  hasFoundById: boolean = false
  openGetSrc = false
  panelText = 'Show securities panel'

  constructor(private service: AppRequestService) { }

  ngOnInit(): void {
  }

  changeShowPanel(){
    if(this.openGetSrc){
      this.panelText = 'Show securities panel'
      this.openGetSrc = false
    } else{
      this.panelText = 'Hide securities panel'
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

  getSecurityById(id: any){
    this.service.getSecurityById(id).subscribe(response => {
      this.securityById = response
      this.hasFoundById = true
    }, error => {
      this.setErrorMessage(error.status, this.errorNameMessage)
    })
  }

  delSecurityById(id: any){
    this.service.delSecurityById(id).subscribe()
  }

  updateSecurity(id: any, secId: string, regNumber: any, name: string, emitentTitle: string){
    this.service.updateSecurity({
      id: id,
      secId: secId,
      regNumber: regNumber,
      name: name,
      emitentTitle: emitentTitle
    });
  }

  saveSecurity(){
    let formData: FormData = new FormData();
    // @ts-ignore
    formData.append('file', this.myForm.get('fileSource').value);
    this.service.saveSecurity(formData)
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
