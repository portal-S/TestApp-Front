import { Component, OnInit } from '@angular/core';
import {AppRequestService} from "../services/app-request.service";

export interface Quote{
  id?:number,
  text:string,
  score?:number,
  postedDate?:Date,
  postedName:string,
}

@Component({
  selector: 'app-quote',
  templateUrl: './quote.component.html',
  styleUrls: ['./quote.component.css']
})
export class QuoteComponent implements OnInit {

  hasFoundById: boolean = false
  openGetSrc = false
  panelText = 'Show admin panel'
  topScore: boolean = true
  sortButtonText = 'Top 10'

  quoteById: Quote = {
    id: 0,
    text:'',
    score:0,
    postedDate:Date.prototype,
    postedName:''
  }

  topByPostedDate: Quote = {
    id: 0,
    text:'',
    score:0,
    postedDate:Date.prototype,
    postedName:''
  }

  random: Quote = {
    id: 0,
    text:'',
    score:0,
    postedDate:Date.prototype,
    postedName:''
  }

  sortedByScore: Quote[] = []

  distinctByScore: Quote[] = []

  constructor(private service: AppRequestService) { }

  ngOnInit(): void {
    this.getRandom()
    this.getTopByScore()
    this.getTopByPostedDate()
  }

  changeShowPanel(){
    if(this.openGetSrc){
      this.panelText = 'Show admin panel'
      this.openGetSrc = false
    } else{
      this.panelText = 'Hide admin panel'
      this.openGetSrc = true
    }
  }

  changeSortScore(){
    if(this.topScore){
      this.topScore = false
      this.sortButtonText = 'Flop 10'
      this.getDistinctByScore()
    } else {
      this.topScore = true
      this.sortButtonText = 'Top 10'
      this.getTopByScore()
    }
  }

  updateData(id: number, name: string){
    switch (name){
      case 'random':
        this.service.getById(id).subscribe(response => {this.random = response})
        break
      case 'lastDate':
        this.service.getById(id).subscribe(response => {this.topByPostedDate = response})
        break
      case 'sortByScore':
        if(this.topScore) this.getTopByScore()
        else this.getDistinctByScore()
        break
    }


  }

  like(id: any, info: string){
    this.service.likeQuote(id)
    this.updateData(id, info)
  }

  disLike(id: any, info: string){
    this.service.disLikeQuote(id)
    this.updateData(id, info)
  }

  getTopByScore(){
    this.service.getTopByScore().subscribe(
      response => this.sortedByScore = response
    );
  }

  getById(id: any){
    this.service.getById(id).subscribe(
      response => {
        this.quoteById = response
        this.hasFoundById = true
      }
    );
  }

  delById(id: any){
    this.service.delQuoteById(id).subscribe();
  }

  create(text: string){
    this.service.saveQuote({
      text: text,
      postedName: 'admin'
    });
  }

  update(id: any, text: string, score: any){
    this.service.updateQuote({
      id: id,
      text: text,
      postedName: 'admin',
      score: score
    });
  }

  getDistinctByScore(){
    this.service.getDistinctByScore().subscribe(
      response => this.sortedByScore = response
    );
  }

  getRandom(){
    this.service.getRandomElement().subscribe(
      response => this.random = response
    );
  }

  getTopByPostedDate(){
    this.service.getTopByPostedDate().subscribe(
      response => this.topByPostedDate = response
    );
  }



}
