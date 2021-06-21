import { Component, OnInit } from '@angular/core';
import {AppRequestService} from "../services/app-request.service";

export interface SumData{
  secId:string,
  regNumber:string,
  name:string,
  emitentTitle:string,
  tradeDate:Date,
  numTrades:number,
  open:number,
  close:number
}

@Component({
  selector: 'app-sumdata',
  templateUrl: './sumdata.component.html',
  styleUrls: ['./sumdata.component.css']
})
export class SumdataComponent implements OnInit {

  show: boolean = false

  constructor(private service: AppRequestService) { }

  ngOnInit(): void {
  }

  data:SumData[] = []

  getSumDataBySecId(secId:string){
    this.service.getSumData(secId).subscribe(resp => {
      this.data = resp
      this.show = true
    })
  }



}
