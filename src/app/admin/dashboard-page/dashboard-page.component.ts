import { Component, OnInit, OnDestroy } from "@angular/core";
import { PostService } from "src/app/shared/post.service";
import { Post } from "src/app/shared/interfaces";
import { Subscription } from "rxjs";
import { AlertService } from "../shared/services/alert.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.scss"]
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;

  searchStr: string = "";

  constructor(
    private postsService: PostService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.pSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.dSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
      this.alertService.warning("Post was deleted");
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
