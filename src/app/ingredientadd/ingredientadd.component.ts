import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';


@Component({
  selector: 'app-ingredientadd',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './ingredientadd.component.html',
  styleUrl: './ingredientadd.component.css'
})
export class IngredientaddComponent {

  url: string = 'http://127.0.0.1:8000/api/allergens';
  allergenArray: any[] = [];
  allergenNames: any[] = [];

  fetchMyData() {
    fetch(this.url)
      .then(response => response.json())
      .then(json => {
        this.allergenArray = json;
        this.allergenNames = this.allergenArray.map(x => x.name);
        const checkboxesDiv = document.getElementById('checkboxes');
        for (let i = 0; i < this.allergenNames.length; i++) {
          let container = document.createElement('span'); // Create a container span

          // Create checkbox input
          let newCheckbox = document.createElement('input');
          newCheckbox.type = 'checkbox';
          newCheckbox.id = this.allergenNames[i];
          newCheckbox.value = this.allergenNames[i];

          // Create label for the checkbox
          let label = document.createElement('label');
          //add class for label
          label.classList.add('form-check-label');
          label.classList.add('checkboxlabel');
          label.classList.add('mx-1')
          label.htmlFor = this.allergenNames[i];
          label.appendChild(document.createTextNode(this.allergenNames[i]));

          // Append the checkbox and label to the span
          container.appendChild(newCheckbox);
          container.appendChild(label);

          // Append the span to the div
          checkboxesDiv?.appendChild(container);
        }
      })
  }

  ngOnInit() {
    this.fetchMyData();
  }


  // Post the new ingredient to the API with the checked allergens
  postNewIngredient() {

    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json', 'User-Agent': 'insomnia/2023.5.8'},
      body: JSON.stringify({
       
      })
    };
    
    fetch('http://127.0.0.1:8000/api/ingredients', options)
      .then(response => response.json())
      .then(response => console.log(response))
      .catch(err => console.error(err));
  }
}

  



  //   // Get the checked allergens
  //   const checkboxes = document.querySelectorAll('input[type="checkbox"]:checked');
  //   const allergens = Array.from(checkboxes).map(checkbox => {
  //     if (checkbox instanceof HTMLInputElement) {
  //       return checkbox.value;
  //     }
  //     throw new Error('Element is not an HTMLInputElement');
  //   });
    

  //   // Create the new ingredient object
  //   const newIngredient = {
  //     name: 'New Ingredient',
  //     allergens: allergens
  //   };

  //   // Post the new ingredient to the API
  //   fetch('http://127.0.0.1:8000/api/ingredients', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(newIngredient)
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('New ingredient posted:', data);
  //     })
  //     .catch(error => {
  //       console.error('Error posting new ingredient:', error);
  //     });
  // }










  // // make the button add the new ingredient and checked allergens to the api

  // constructor() { }

  // addIngredient() {
  //   // Get the ingredient name from the input field
  //   const ingredientName = (document.getElementById('ingredientName') as HTMLInputElement).value;

  //   // Get the checked allergens
  //   const checkedAllergens = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
  //     .map((checkbox) => (checkbox as HTMLInputElement).value);

  //   // Create the new ingredient object
  //   const newIngredient = {
  //     name: ingredientName,
  //     allergens: checkedAllergens
  //   };







  // Send the new ingredient to the API
  //   this.http.post('http://127.0.0.1:8000/api/ingredients', newIngredient)
  // .subscribe({
  //   next: (data) => {
  //     // Success callback
  //     // Reset the input field
  //     (document.getElementById('ingredientName') as HTMLInputElement).value = '';

  //     // Reset the checked allergens
  //     Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
  //       .forEach((element) => {
  //         // Use type assertion to narrow down from Element to HTMLInputElement
  //         const checkbox = element as HTMLInputElement;
  //         checkbox.checked = false;
  //       });
  //   },
  //   error: (error) => {
  //     // Error handling callback
  //   }
  // });
  