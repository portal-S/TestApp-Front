import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Security} from "../security/security.component";
import {History} from "../histories/histories.component";
import {SumData} from "../sumdata/sumdata.component";

@Injectable()
export class AppRequestService {
  private hostUrl: string = 'http://localhost:8090/'
  private historyUrl: string = this.hostUrl + 'api/v1/histories'
  private securityUrl: string = this.hostUrl + 'api/v1/securities'
  private sumDataUrl: string = this.hostUrl + 'api/v1/sumdata'

  constructor(private http: HttpClient) {

  }


  getSecurityById(id: number){
    return this.http.get<Security>(this.securityUrl + '/' + id)
  }

  delSecurityById(id: number){
    return this.http.delete(this.securityUrl + '/' + id)
  }

  saveSecurity(formData: FormData){
    this.http.post(this.securityUrl, formData).subscribe()
  }

  updateSecurity(security: Security){
    this.http.put(this.securityUrl, security).subscribe()
  }

  getHistoryById(id: number){
    return this.http.get<History>(this.historyUrl + '/' + id)
  }

  delHistoryById(id: number){
    return this.http.delete(this.historyUrl + '/' + id)
  }

  saveHistory(formData: FormData){
    this.http.post(this.historyUrl, formData).subscribe()
  }

  updateHistory(history: History){
    this.http.put(this.historyUrl, history).subscribe()
  }

  getSumData(secId: string){
    return this.http.get<SumData[]>(this.sumDataUrl + '/' + secId)
  }

}
