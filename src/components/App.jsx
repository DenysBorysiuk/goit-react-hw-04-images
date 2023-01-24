import React, { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Container, Loader } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { LoadMoreBtn } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';

export class App extends Component {
  state = {
    page: 1,
    query: '',
    items: [],
    isLoading: false,
    imagesFound: null,
  };

  async componentDidUpdate(_, prevState) {
    const { page, query } = this.state;
    if (prevState.page !== page || prevState.query !== query) {
      try {
        this.setState({ isLoading: true });
        const images = await getImages(query, page);

        if (!images.totalHits) {
          this.setState({ isLoading: false });
          return toast.error('Enter correct query');
        }
        this.setState(({ items }) => ({
          items: [...items, ...images.hits],
          isLoading: false,
          imagesFound: images.hits.length,
        }));
      } catch (error) {
        toast.error('Oops, something went wrong');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  handleSearch = query => {
    if (query !== this.state.query) {
      this.setState(state => ({
        page: 1,
        query,
        items: [],
        imagesFound: null,
      }));
    }
  };

  loadMore = () => {
    this.setState(({ page }) => ({
      page: page + 1,
    }));
  };

  render() {
    const { items, isLoading, imagesFound } = this.state;
    return (
      <Container>
        <Toaster position="top-right" reverseOrder={false} />
        <Searchbar onSubmit={this.handleSearch} isSubmiting={isLoading} />
        {items.length > 0 && <ImageGallery items={items} />}
        <Loader>
          {isLoading && (
            <ThreeDots
              height="80"
              width="80"
              radius="9"
              color="#3f51b5"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              justifyContent="center"
            />
          )}
        </Loader>
        {imagesFound === 12 && <LoadMoreBtn onClick={this.loadMore} />}
      </Container>
    );
  }
}
