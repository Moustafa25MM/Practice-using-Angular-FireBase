import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface ResponseData {
  [key: string]: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: { title: string; content: string }) {
    this.http.post('https://angular-guide-6a6a7-default-rtdb.firebaseio.com/posts.json',postData).subscribe((responseData)=>{
      console.log(responseData);
    })
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
  private fetchPosts(){
    this.http.get<ResponseData>('https://angular-guide-6a6a7-default-rtdb.firebaseio.com/posts.json')
    .pipe(map((responseData)=>{
        const arrayPosts =[];
        for (const key in responseData){
            arrayPosts.push({id:key , ...responseData[key]});
        }
        return arrayPosts;
    }))
    .subscribe((posts)=>{
      console.log(posts)
    })
  }
}
