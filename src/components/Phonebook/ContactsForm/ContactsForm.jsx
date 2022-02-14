import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './contactsForm.module.css';

class ContactsForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
    this.resetForm();
  };

  resetForm() {
    this.setState({
      name: '',
      number: '',
    });
  }

  render() {
    const { name, number } = this.state;
    const { handleChange, handleSubmit } = this;

    return (
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className="form-group">
          <label className={styles.label}>Name</label>
          <input
            className={styles.input}
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Введите ваше имя"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </div>
        <div className="form-group">
          <label className={styles.label}>Number</label>
          <input
            className={styles.input}
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="Введите ваш номер телефона"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </div>
        <div className="form-group">
          <label className={styles.label}></label>
          <button type="submit" className={styles.btn}>
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

export default ContactsForm;

ContactsForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
