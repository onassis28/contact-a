// Contact Class : handles contacts
class Contact {
    constructor(name, number, location){
        this.name = name;
        this.number= number;
        this.location=location;
    }
}
//UI class
class UI {
    static displayContacts() {
        
        

        const contacts = Store.getContacts();

        contacts.forEach(contact =>  UI.addContactToList(contact));


    }
    static addContactToList(contact){
        const list =document.getElementById('book-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td> ${contact.name}</td>
        <td> ${contact.number}</td>
        <td> ${contact.location}</td>
        <td><a href='#' class='btn btn-danger btn-small delete'>X</a></td>
        `;

       list.append(row);
    }
    static deletecontact(el){
        if(el.classList.contains('delete')){
          el.parentElement.parentElement.remove();  
        }
    }
 static showAlert(message, className){
 const div = document.createElement('div')
 div.className = `alert alert-${className} `;
 div.appendChild(document.createTextNode(message));
 const container = document.querySelector('.container')
 const form = document.getElementById('book-form')
 container.insertBefore(div,form)
 // dissapear 
 setTimeout(() => document.querySelector('.alert').remove(), 2000)

 }

    static clearFields(){
        document.getElementById('name').value= ''
        document.getElementById('number').value=''
        document.getElementById('location').value=''
    }
}

// Storage Class: handles storage
class Store {
    static getContacts(){
        let contacts;
        if(localStorage.getItem('contacts')===null){
            contacts =[]

        } else{
            contacts =JSON.parse(localStorage.getItem('contacts'));
        }
        return contacts;
    }

    static addContacts(contact){
        const contacts = Store.getContacts();

        contacts.push(contact)

     localStorage.setItem('contacts', JSON.stringify(contacts) );
    }

    static removeContacts(location){
        const contacts = Store.getContacts();

    contacts.forEach((contact, index)=> {
        if(contact.location == location){
           contacts.splice(index, 1);
        }
        localStorage.setItem('contacts', JSON.stringify(contacts))
    })

    }
}

// Event: display contacts
document.addEventListener('DOMContentLoaded', UI.displayContacts);

// event: add a contact
document.querySelector('#book-form').addEventListener('submit', (e)=> {

  //  prevent actual submit
  e.preventDefault();


// Get form values
const name = document.getElementById('name').value
const number = document.getElementById('number').value
const location = document.getElementById('location').value

//validate
if (name===''||number===''||location===''){
   UI.showAlert('please fill in all the fields', 'danger')
}
else{

// instantiate a new contact
const contact = new Contact(name, number, location);


// add contact to UI
UI.addContactToList(contact)

// add book to store
Store.addContacts(contact)

// show contact added
UI.showAlert('Contact Added', 'success')

//clear fields
UI.clearFields()
}
});
//event: remove a contact 
document.getElementById('book-list').addEventListener('click', (e) =>{

UI.deletecontact(e.target)

//remove book from store
Store.removeContacts(e.target.parentElement.previousElementSibling.textContent)
// show contact deleted
UI.showAlert('Contact deleted', 'danger')
})


