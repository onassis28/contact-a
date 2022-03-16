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
        const storedContacts = [
            {
                name: 'Onassis Sowah',
                number: '02448473',
                location: 'accra'
            },
            {
                name: 'Legacy Anyetei',
                number:'0349498',
                location: 'accra'  
            }

        ]

        const contacts = storedContacts;

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


    static clearFields(){
        document.getElementById('name').value= ''
        document.getElementById('number').value=''
        document.getElementById('location').value=''
    }
}

// Storage Class: handles storage

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

// instantiate a new contact
const contact = new Contact(name, number, location);
console.log(contact)

// add contact to UI
UI.addContactToList(contact)

//clear fields
UI.clearFields()
})
//event: remove a book 
document.getElementById('book-list').addEventListener('click', (e) =>{

UI.deletecontact(e.target);

})
   