import { Component } from 'react';
import { nanoid } from 'nanoid';
import ContactsForm from './ContactsForm';
import ContactsList from './ContactsList';
import Filter from './Filter';

import styles from './phonebook.module.css';

class Phonebook extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  handleChange = event => {
    const { value, name } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addContact = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.find(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
      return;
    } else if (name.length === 0) {
      alert('Fields must be filled!');
    }

    this.setState(prevState => {
      const { contacts } = prevState;
      const newContact = {
        name,
        number,
        id: nanoid(),
      };
      return {
        contacts: [...contacts, newContact],
      };
    });
  };

  onDeleteContact = contactId => {
    this.setState(({ contacts }) => ({
      contacts: contacts.filter(contact => contact.id !== contactId),
    }));
  };

  getFilteredContacts() {
    const { filter, contacts } = this.state;
    if (!filter) {
      return contacts;
    }
    const filterStr = filter.toLowerCase();
    const result = contacts.filter(contact => {
      const name = contact.name.toLowerCase();
      return name.includes(filterStr);
    });
    return result;
  }

  render() {
    const { filter, contacts } = this.state;
    const { handleChange, onDeleteContact } = this;
    const filteredContacts = this.getFilteredContacts();

    return (
      <div className={styles.section}>
        <h2 className={styles.title}>Phonebook</h2>
        <ContactsForm onSubmit={this.addContact} />
        <h2 className={styles.title}>Contacts</h2>
        {contacts.length > 1 && (
          <Filter value={filter} handleChange={handleChange} />
        )}
        {contacts.length > 0 ? (
          <ContactsList
            contacts={filteredContacts}
            onDeleteContact={onDeleteContact}
          />
        ) : (
          <p>Your phonebook is empty. Please add contact.</p>
        )}
      </div>
    );
  }
}

export default Phonebook;
