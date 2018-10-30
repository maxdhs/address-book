// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = [],
  this.currentId = 0
}



AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts.push(contact);
}

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

AddressBook.prototype.findContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        return this.contacts[i];
      }
    }
  };
  return false;
}

AddressBook.prototype.deleteContact = function(id) {
  for (var i=0; i< this.contacts.length; i++) {
    if (this.contacts[i]) {
      if (this.contacts[i].id == id) {
        delete this.contacts[i];
        return true;
      }
    }
  };
  return false;
}


// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, email, Address) {
  this.firstName = firstName,
  this.lastName = lastName,
  this.phoneNumber = phoneNumber,
  this.email = email,
  this.Address = Address
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}

// User Interface Logic ---------
var addressBook = new AddressBook();

function displayContactDetails(addressBookToDisplay) {
  var contactsList = $("ul#contacts");
  var htmlForContactInfo = "";
  addressBookToDisplay.contacts.forEach(function(contact) {
    htmlForContactInfo += "<li id=" + contact.id + ">" + contact.firstName + " " + contact.lastName + "</li>";
  });
  contactsList.html(htmlForContactInfo);
};

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
};

function showContact(contactId) {
  var contact = addressBook.findContact(contactId);
  if (contact.firstName == "") {
    $("#firstName").hide();
  } else {
    $("#firstName").show();
  }
  if (contact.lastName == "") {
    $("#lastName").hide();
  } else {
    $("#lastName").show();
  }
  if (contact.phoneNumber == "") {
    $("#phoneNumber").hide();
  } else {
    $("#phoneNumber").show();
  }
  if (contact.email == "") {
    $("#email").hide();
  } else {
    $("#email").show();
  }
  if (contact.Address.address1 == "") {
    $("#address1").hide();
  } else {
    $("#address1").show();
  }
  if (contact.Address.address2 == "") {
    $("#address2").hide();
  } else {
    $("#address2").show();
  }
  $(".first-name").html(contact.firstName);
  $(".last-name").html(contact.lastName);
  $(".phone-number").html(contact.phoneNumber);
  $(".email").html(contact.email);
  $(".address1").html(contact.Address.address1);
  $(".address2").html(contact.Address.address2);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" +  + contact.id + ">Delete</button>");
}

function attachContactListeners() {
  $("ul#contacts").on("click", "li", function() {
    showContact(this.id);
  });
  // Code below here is new!
  $("#buttons").on("click", ".deleteButton", function() {
    addressBook.deleteContact(this.id);
    $("#show-contact").hide();
    displayContactDetails(addressBook);
  });
};


$(document).ready(function() {
  attachContactListeners();    // <--- This line is new!
  $("form#new-contact").submit(function(event) {
    event.preventDefault();
    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();
    var inputtedPhoneNumber = $("input#new-phone-number").val();
    var inputtedEmail = $("input#new-email").val();
    var inputtedAddress1 = $("input#new-address1").val();
    var inputtedAddress2 = $("input#new-address2").val();
    var Address = {address1: inputtedAddress1, address2: inputtedAddress2};
    var newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, Address);
    addressBook.addContact(newContact);
    displayContactDetails(addressBook);
  })
})
