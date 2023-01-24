import { Btn } from './Button.styled';
import PropTypes from 'prop-types';

export const LoadMoreBtn = ({ onClick }) => (
  <Btn type="button" onClick={onClick}>
    Load more
  </Btn>
);

LoadMoreBtn.propTypes = {
  onClick: PropTypes.func.isRequired,
};
