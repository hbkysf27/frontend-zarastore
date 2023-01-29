import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriesService, Product, ProductsService } from '@zarafe/products';
import { MessageService } from 'primeng/api';
import { timer } from 'rxjs';


@Component({
  selector: 'admin-products-form',
  templateUrl: './products-form.component.html',
  styles: [
  ]
})
export class ProductsFormComponent {

  editmode=false;
  form: FormGroup;
  isSubmitted=false;
  categories=[];
  imageDisplay:string | ArrayBuffer;

  constructor(private formBuilder: FormBuilder, private categoriesService: CategoriesService, private productsService:ProductsService, private messageService:MessageService, private location : Location){}

  ngOnInit(): void{
    this._initForm();
    this._getCategories();
  }

  private _initForm(){
    this.form=this.formBuilder.group({
      name: ['', Validators.required],
      brand: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      countInStock: ['', Validators.required],
      description: ['', Validators.required],
      richDescription: [''],
      image: ['', Validators.required],
      isFeatured: [false],

    });
  }

  private _getCategories() {
    this.categoriesService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  private _addProduct(productData: FormData) {
    this.productsService.createProduct(productData).subscribe(
      (product: Product) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: `Product ${product.name} is created!`
        });
        timer(2000)
          .toPromise()
          .then(() => {
            this.location.reload();
          });
      },
      () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Product is not created!'
        });
      }
    );
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.form.invalid) return;

    const productFormData = new FormData();
    Object.keys(this.productForm).map((key) => {
      productFormData.append(key, this.productForm[key].value);
    });
    // if (this.editmode) {
    //   this._updateProduct(productFormData);
    // } else {
    //   this._addProduct(productFormData);
    // }
  }
  onCancle(){}

  onImageUpload(event){
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  get productForm() {
    return this.form.controls;
  }



}
