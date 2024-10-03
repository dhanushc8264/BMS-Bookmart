document.addEventListener("DOMContentLoaded", function () {
  const stripe = Stripe('sk_test_51OotXXSDfwZwStTfrI8aY0Fh7ZA4JlAefXqR6DJORFaHKFoOyeEAmdm1eStmvYEOxvXP0N46Knl8AwNQp0Uk0Unm00W5O6wXJ1');
  const elements = stripe.elements();
  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  const form = document.getElementById('payment-form');
  const errorElement = document.getElementById('card-errors');
  const submitButton = document.getElementById('submit');

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    submitButton.disabled = true;

    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      errorElement.textContent = error.message;
      submitButton.disabled = false;
    } else {
      errorElement.textContent = '';
      // Send paymentMethod.id to your server for payment processing
      console.log(paymentMethod);
      // Redirect to success page
      window.location.href = '/success';
    }
  });
});
