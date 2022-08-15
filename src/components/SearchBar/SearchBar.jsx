import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
import css from './SearchBar.module.css';
import { FcSearch } from 'react-icons/fc';

export const SearchBar = ({ onSubmit }) => {
  const handleFormSubmit = values => {
    onSubmit(values);
  };

  return (
    <header className={css.searchbar}>
      <Formik initialValues={{ searchQuery: '' }} onSubmit={handleFormSubmit}>
        <Form className={css.form}>
          <button type="submit" className={css.form__button}>
            <FcSearch size="20" />
          </button>

          <Field
            className={css.form__input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </Form>
      </Formik>
    </header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
