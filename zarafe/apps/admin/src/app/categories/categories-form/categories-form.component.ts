import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder){}

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
    console.log(this.categoryForm.name.value);

    console.log(this.categoryForm.icon.value);
  }
  get categoryForm(){
    return this.form.controls;
  }


}
