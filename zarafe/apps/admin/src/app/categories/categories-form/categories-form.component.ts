/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  editmode= false;
  currentCategoryId: string;

  constructor(
    private messageService: MessageService, private formBuilder: FormBuilder, private categoriesService : CategoriesService, private location:Location,private route: ActivatedRoute){}

  ngOnInit():void{
    this.form=this.formBuilder.group({
      name:['',Validators.required],
      icon:['',Validators.required],
    });

    this._checkEditMode();
  }
  onSubmit(){
    this.isSubmitted=true;
    if (this.form.invalid)
    {
      return;
    }
    const category : Category ={
      id : this.currentCategoryId,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value
    };
    if(this.editmode){
      this._updateCategory(category);

    }else{
      this._addCategory(category);

    }

  }
  private _addCategory(category : Category){
    this.categoriesService.createCategory(category).subscribe((response) => {
      this.messageService.add({severity:'success', summary:'success', detail:'Category Created'});
      timer(2000).toPromise().then((done) =>{
        this.location.back();

      });
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category Not Created'});
    }
    );

  }
  private _updateCategory(category :Category){

    this.categoriesService.updateCategory(category).subscribe((response) => {
      this.messageService.add({severity:'success', summary:'success', detail:'Category Updated'});
      timer(2000).toPromise().then((done) =>{
        this.location.back();

      });
    },
    (error) => {
      this.messageService.add({severity:'error', summary:'Error', detail:'Category Not Updated'});
    });
  }



  private _checkEditMode(){
    this.route.params.subscribe((params) => {
      if(params.id){
        this.editmode=true;
        this.currentCategoryId=params.id;
        this.categoriesService.getCategory(params.id).subscribe(category=>{
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
        })
      }
    });

  }
  get categoryForm(){
    return this.form.controls;
  }
}
