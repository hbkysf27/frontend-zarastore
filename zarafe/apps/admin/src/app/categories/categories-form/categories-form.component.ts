/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Category } from '@zarafe/products';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent {

  form:FormGroup;
  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  isSubmitted: boolean = false;

  constructor(
    private messageService: MessageService, private formBuilder: FormBuilder, private categoriesService : CategoriesService, private location:Location){}

  ngOnInit():void{
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      icon:['',Validators.required],
    });
  }
  onSubmit(){
    this.isSubmitted=true;
    if (this.form.invalid)
    {
      return;
    }
    const category : Category ={
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    }
    this.categoriesService.createCategory(category).subscribe(response => {
      this.messageService.add({severity:'success', summary:'success', detail:'Category Created'});
      timer(2000).toPromise().then(done =>{
        this.location.back();

      })
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category Not Created'});
    }
    );
  }
  get categoryForm(){
    return this.form.controls;
  }
}
