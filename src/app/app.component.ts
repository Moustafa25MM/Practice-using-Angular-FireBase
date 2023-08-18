import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './Post.module';
import { PostsService } from './posts.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts : Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postsService : PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts:Post[])=>{
      this.loadedPosts = posts;
      this.isFetching = false;
    });
  }

  onCreatePost(postData: { title: string; content: string }) {
      this.postsService.createAndStrorePosts(postData.title,postData.content);
  }

  onFetchPosts() {
    // Send Http request
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((posts:Post[])=>{
      this.loadedPosts = posts;
      this.isFetching = false;
    });
  }

  onClearPosts() {
    this.postsService.deletePosts().subscribe();
  }
  private fetchPosts(){

  }
}
