import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FeedbackService } from '../services/feedback.service';
import { Feedback, ContactType } from '../shared/feedback';
import { flyInOut, slideUpwards, visibility } from "../animations/app.animation";


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    // tslint:disable-next-line:use-host-property-decorator
    host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
        flyInOut(),
        slideUpwards(),
        visibility()
    ]
})
export class ContactComponent implements OnInit {
    
    @ViewChild('fform') feedbackFormDirective;
    
    feedback: Feedback;
    feedbackCopy: Feedback;
    contactType = ContactType;
    errMsg: string;
    feedbackForm: FormGroup;
    showSpinner: boolean;
    showForm: boolean;
    slideUpwards = 'offCanvas';
    visibility = 'shown';
    
    formErrors = {
        'firstname': '',
        'lastname': '',
        'telnum': '',
        'email': ''
    };
    
    validationMessages = {
        'firstname': {
            'required':      'First Name is required.',
            'minlength':     'First Name must be at least 2 characters long.',
            'maxlength':     'FirstName cannot be more than 25 characters long.'
        },
        'lastname': {
            'required':      'Last Name is required.',
            'minlength':     'Last Name must be at least 2 characters long.',
            'maxlength':     'Last Name cannot be more than 25 characters long.'
        },
        'telnum': {
            'required':      'Tel. number is required.',
            'pattern':       'Tel. number must contain only numbers.'
        },
        'email': {
            'required':      'Email is required.',
            'email':         'Email not in valid format.'
        },
    };
    
    constructor(
        private feedbackService: FeedbackService,
        private fb: FormBuilder,
        @Inject('BaseURL') private BaseURL: string
        ) {
            this.showSpinner = false;
            this.showForm = true;
        }
    
    createForm() {
        this.feedbackForm = this.fb.group({
            firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
            lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
            telnum: ['', [Validators.required, Validators.pattern] ],
            email: ['', [Validators.required, Validators.email] ],
            agree: false,
            contacttype: 'None',
            message: ''
        });
        
        this.feedbackForm.valueChanges
            .subscribe(data => this.onValueChanged(data));
        
        this.onValueChanged(); // (re)set validation messages now
    }
    
    onValueChanged(data?: any) {
        if (!this.feedbackForm) { return; }

        const form = this.feedbackForm;

        for (const field in this.formErrors) {
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
    resetFormInputs(formValue) {
        this.feedbackForm.reset({
            firstname: '',
            lastname: '',
            telnum: '',
            email: '',
            agree: false,
            contacttype: 'None',
            message: ''
        });
        
        formValue.resetForm();

        return this;
    }

    copyFeedback(feedbackValue) {
        this.feedbackCopy = feedbackValue;

        return this;
    }

    showFeedbackSaved(data) {
        this.feedback = data;
        this.feedbackCopy = data;
        this.showSpinner = false;
        this.slideUpwards = 'onCanvas';
    }

    displayForm() {
        console.log('display form was invoked');

        setTimeout(function() {
            console.log('hideFeedbackComment was called');

            this.slideUpwards = 'offCanvas';
            this.showForm = true;
            this.visibility = 'shown';
        }.bind(this), 5000);
    }
    
    onSubmit() {
        this.feedback = this.feedbackForm.value;
        
        if(!this.feedbackForm.invalid) {
            this.showSpinner = true;
            this.showForm = false;
            this.visibility = 'hidden';

            this.copyFeedback(this.feedback);
            this.feedbackService.submitFeedback(this.feedbackCopy)
                .subscribe(feedback => {
                    console.log('Ajax returned', feedback);

                    this.showFeedbackSaved(feedback);
                    this.displayForm();
                    
                }),
                errmsg => {
                    this.feedback = null;
                    this.feedbackCopy = null;
                    this.errMsg = <any>errmsg;
                }

            this.resetFormInputs(this.feedbackFormDirective);
        }
    }

    ngOnInit() {
        this.createForm();
    }
}
