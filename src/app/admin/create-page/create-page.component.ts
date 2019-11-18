import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Post } from "src/app/shared/interfaces";
import { PostService } from "src/app/shared/post.service";

@Component({
  selector: "app-create-page",
  templateUrl: "./create-page.component.html",
  styleUrls: ["./create-page.component.scss"]
})
export class CreatePageComponent implements OnInit {
  form: FormGroup;
  constructor(private postsService: PostService) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, Validators.required),
      text: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const post: Post = {
      title: this.form.value.title,
      author: this.form.value.author,
      text: this.form.value.text,
      date: new Date()
    };
    this.postsService.create(post).subscribe(() => {
      this.form.reset();
    });
  }
}
