
     document.getElementById("bookingForm").addEventListener("submit", function (e) {
      e.preventDefault();

      const room = document.getElementById("roomNumber").value;
      const name = document.getElementById("name").value;
      const recipe = document.getElementById("recipe").value;
      // const amount = document.getElementById("amount").value;
      const payment = document.getElementById("paymentMethod").value;
      const messageBox = document.getElementById("confirmationMessage");

      if (!room || !name || !recipe || !payment) {
        messageBox.textContent = "Please fill all fields correctly.";
        messageBox.style.color = "red";
        return;
      }

      // Simulate sending to server or payment gateway
      messageBox.textContent = `Thank you, ${name}. Your order for ${recipe} has been received. Room: ${room}, Payment: ${payment}. Please make your payment with the account details below 
      Account Details for Bank Transfer:
      Account Name: New Planet Hotel & Suites,
      Bank: Opay,
      Account Number: 8110276091,
      Whatsapp Number: +234 811-027-6091,
      Note: Please kindly send your payment receipt on this Whatsapp number,
      Thank You`;
      messageBox.style.color = "green";
     

      // Optionally clear the form
      document.getElementById("bookingForm").reset();
    });

    