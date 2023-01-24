import { Formik } from 'formik';
import PropTypes from 'prop-types';
import toast, { Toaster } from 'react-hot-toast';
import { BsSearch } from 'react-icons/bs';
import { Header, FormWrap, Input, FormBtn } from './Searchbar.styled';

const initialValues = {
  query: '',
};

export const Searchbar = ({ onSubmit, isSubmiting }) => {
  const handleSubmit = (values, { resetForm }) => {
    const query = values.query.trim();
    if (!query) {
      return toast.error('Empty search');
    }
    onSubmit(query);
    resetForm();
  };

  return (
    <Header>
      <Toaster position="top-right" reverseOrder={false} />
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <FormWrap>
          <FormBtn type="submit" disabled={isSubmiting}>
            <BsSearch size="1.5em" />
          </FormBtn>
          <Input
            type="text"
            name="query"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </FormWrap>
      </Formik>
    </Header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isSubmiting: PropTypes.bool.isRequired,
};
