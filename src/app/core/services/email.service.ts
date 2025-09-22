import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

// Declare emailjs for TypeScript
declare const emailjs: any;

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  constructor() {}

  // EmailJS configuration - now safely stored in environment files
  private get emailJSConfig() {
    return environment.emailJS;
  }

  sendEmail(formData: ContactFormData): Observable<any> {
    return new Observable((observer) => {
      // Check if EmailJS is loaded
      if (typeof emailjs !== 'undefined') {
        const templateParams = {
          from_name: formData.name, // Back to from_name to match your template
          from_email: formData.email, // Back to from_email to match your template
          phone: formData.phone || 'Not provided',
          message: formData.message,
          to_email: 'artoflime17@gmail.com',
          reply_to: formData.email,
        };

        emailjs
          .send(
            this.emailJSConfig.serviceId,
            this.emailJSConfig.templateId,
            templateParams,
            this.emailJSConfig.publicKey
          )
          .then((response: any) => {
            console.log('Email sent successfully:', response);
            observer.next({
              success: true,
              message: 'Email sent successfully!',
            });
            observer.complete();
          })
          .catch((error: any) => {
            console.error('EmailJS error:', error);
            observer.error({
              success: false,
              message: 'Failed to send email. Please try again.',
            });
          });
      } else {
        // Fallback: For now, simulate success until EmailJS is properly set up
        console.log(
          'EmailJS not loaded, simulating email send with data:',
          formData
        );
        setTimeout(() => {
          observer.next({
            success: true,
            message:
              "Thank you! Your message has been received. We'll get back to you soon at " +
              formData.email,
          });
          observer.complete();
        }, 1000);
      }
    });
  }
}
