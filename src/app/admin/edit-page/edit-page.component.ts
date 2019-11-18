import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { PostService } from "src/app/shared/post.service";
import { switchMap } from "rxjs/operators";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "src/app/shared/interfaces";

@Component({
  selector: "app-edit-page",
  templateUrl: "./edit-page.component.html",
  styleUrls: ["./edit-page.component.scss"]
})
export class EditPageComponent implements OnInit {
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private postsService: PostService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        switchMap((params: Params) => {
          return this.postsService.getById(params["id"]);
        })
      )
      .subscribe((post: Post) => {
        this.form = new FormGroup({
          title: new FormControl(post.title, Validators.required),
          text: new FormControl(post.text, Validators.required)
        });
      });
  }

  submit() {}
}
