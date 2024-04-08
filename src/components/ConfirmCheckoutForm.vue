<script setup>
  import {ref, reactive } from "vue";
  import * as repl from "repl";

  const email = ref('');
  const street = ref('');
  const zipCode = ref('');
  let responseDescription = reactive({ desc: 'no desc' });

  const submitForm = () => {
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "customerId": 3,
        "customerEmailAddress": email.value,
        "shippingAddress": {
          "id": 5,
          "country": "CL",
          "street": street.value,
          "zipCode": zipCode.value,
          "number": 5
        },
        "creditCardInfo": {
          "cardNumber": "43 857284723 54323",
          "expirationDate": "2024-04-01",
          "cvv": "123",
          "cardholderName": "Pablo"
        },
        "productQuantities": [[1, 3], [2, 7], [3, 1]]
      })
    };

    fetch('http://localhost:8080/confirmCheckout', requestOptions)
        .then(response => response.json())
      .then(data => {
        responseDescription.desc = data.description;
      });
  }
</script>

<template>
  <div style="display: flex; flex-direction: column; gap:16px">
    <div>
      <h1>Confirm Checkout</h1>
    </div>
    <form v-on:submit.prevent="submitForm" class="checkoutForm">
      <input v-model="email" placeholder="Introduce your email" />
      <input v-model="street" placeholder="Enter street" />
      <input v-model="zipCode" placeholder="Enter Zip Code" />
      <button type="submit">Submit</button>
    </form>
    <div>
      <p>{{ responseDescription.desc }}</p>
    </div>
  </div>
</template>

<style scoped>
  .checkoutForm {
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding-right: 2rem;
  }
</style>
