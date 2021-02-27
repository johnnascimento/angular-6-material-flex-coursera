import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap } from 'rxjs/operators';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { DishDetailFeedback } from '../shared/dishDetailFeedBack';

@Component({
    selector: 'app-dishdetail',
    templateUrl: './dishdetail.component.html',
    styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {

    @ViewChild('fform') feedbackFormDirective;

    dish: Dish;
    dishIds: string[];
    prev: string;
    next: string;

    dishDetailFeedbackForm: FormGroup;
    dishDetailFeedback: DishDetailFeedback;

    formErrors = {
        'username': '',
        'message': ''
    };

    validationMessages = {
        'username': {
            'required':      'Name is required.',
            'minlength':     'Name must be at least 2 characters long.',
            'maxlength':     'Name cannot be more than 25 characters long.'
        },
        'message': {
            'required':      'Message is required.',
            'minlength':     'Message must contain at least 1 character long.',
        }
    };

    constructor(
        private dishService: DishService,
        private route: ActivatedRoute,
        private location: Location,
        private fb: FormBuilder) {
        this.createForm();
    }

    createForm() {
        this.dishDetailFeedbackForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
            rating: 0,
            message: ['', [Validators.required, Validators.minLength(1)] ],
        });

        this.dishDetailFeedbackForm.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now
    }

    onValueChanged(data?: any) {
        if (!this.dishDetailFeedbackForm) { return; }

        const form = this.dishDetailFeedbackForm;

        for (const field in this.formErrors) {
            console.log('this.formErrors[field]', this.formErrors[field]);
            console.log('field', field);
            console.log('this.formErrors.hasOwnProperty(field)', this.formErrors.hasOwnProperty(field));

            if (this.formErrors.hasOwnProperty(field)) {
                // clear previous error message (if any)
                this.formErrors[field] = '';
                const control = form.get(field);

                if (control && control.dirty && !control.valid) {
                    const messages = this.validationMessages[field];

                    for (const key in control.errors) {
                        if (control.errors.hasOwnProperty(key)) {
                            this.formErrors[field] += messages[key] + ' ';
                        }
                    }
                }
            }
        }
    }

    onSubmit() {
        this.dishDetailFeedback = this.dishDetailFeedbackForm.value;
        console.log(this.dishDetailFeedback);

        this.dishDetailFeedbackForm.reset({
            username: '',
            rating: '',
            message: ''
        });

        this.feedbackFormDirective.resetForm();
    }

    ngOnInit() {
        const id = this.route.snapshot.params['id'];
        this.dishService.getDish(id)
        .subscribe((dish) => this.dish = dish);
    }

    goBack(): void {
        this.location.back();
    }
}