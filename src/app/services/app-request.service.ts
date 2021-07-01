import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Quote} from "../quote/quote.component";

@Injectable()
export class AppRequestService {
  private hostUrl: string = 'http://localhost:8090/'
  private quoteUrl: string = this.hostUrl + 'api/v1/quotes'
  constructor(private http: HttpClient) {

  }


  getTopByScore(){
    return  this.http.get<Quote[]>(this.quoteUrl + '/topByScore')
  }

  getDistinctByScore(){
    return this.http.get<Quote[]>(this.quoteUrl + '/distinctByScore')
  }

  getTopByPostedDate(){
    return this.http.get<Quote>(this.quoteUrl + '/topByPostedDate')
  }

  getRandomElement(){
    return this.http.get<Quote>(this.quoteUrl + '/randomElement')
  }

  getById(id: number){
    return this.http.get<Quote>(this.quoteUrl + '/' + id)
  }

  delQuoteById(id: number){
    return this.http.delete(this.quoteUrl + '/' + id)
  }

  saveQuote(quote: Quote){
    this.http.post(this.quoteUrl, quote).subscribe()
  }

  updateQuote(quote: Quote){
    this.http.put(this.quoteUrl, quote).subscribe()
  }

  likeQuote(id: number){
    this.http.put(this.quoteUrl + '/like', {}, { params: { id: id} }).subscribe()
  }

  disLikeQuote(id: number){
    this.http.put(this.quoteUrl + '/dislike', {}, { params: { id: id} }).subscribe()
  }


}
