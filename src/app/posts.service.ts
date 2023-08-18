import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./Post.module";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";


interface ResponseData {
  [key: string]: Post;
}

@Injectable({providedIn:'root'})
export class PostsService {
    constructor(private http: HttpClient){

    }
    createAndStrorePosts(title:string , content:string){
      const postData : Post = {title : title , content : content}
      this.http.post('https://angular-guide-6a6a7-default-rtdb.firebaseio.com/posts.json',postData).subscribe((responseData)=>{
      console.log(responseData);
    })
    }

    fetchPosts(){
    return this.http.get<ResponseData>('https://angular-guide-6a6a7-default-rtdb.firebaseio.com/posts.json')
        .pipe(map((responseData) => {
          const arrayPosts = [];
          for (const key in responseData) {
            arrayPosts.push({ id: key, ...responseData[key] });
          }
          return arrayPosts;
        }));
    }
    deletePosts(){
      return this.http.delete('https://angular-guide-6a6a7-default-rtdb.firebaseio.com/posts.json')
    }
}
