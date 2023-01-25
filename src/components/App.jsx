import { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'services/api';
import { Container, Loader } from './App.styled';
import toast, { Toaster } from 'react-hot-toast';
import { LoadMoreBtn } from './Button/Button';
import { ThreeDots } from 'react-loader-spinner';

export const App = () => {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imagesFound, setImagesFound] = useState(null);

  useEffect(() => {
    if (query === '') {
      return;
    }

    const searchImages = async () => {
      try {
        setIsLoading(true);
        const images = await getImages(query, page);

        if (!images.totalHits) {
          return toast.error('Enter correct query');
        }
        setItems(prevState => [...prevState, ...images.hits]);
        setImagesFound(images.hits.length);
      } catch (error) {
        toast.error('Oops, something went wrong');
      } finally {
        setIsLoading(false);
      }
    };

    searchImages();
  }, [page, query]);

  const handleSearch = searchQuery => {
    if (searchQuery !== query) {
      setPage(1);
      setQuery(searchQuery);
      setItems([]);
      setImagesFound(null);
    }
  };

  const loadMore = () => setPage(page + 1);

  return (
    <Container>
      <Toaster position="top-right" reverseOrder={false} />
      <Searchbar onSubmit={handleSearch} isSubmiting={isLoading} />
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
      {imagesFound === 12 && <LoadMoreBtn onClick={loadMore} />}
    </Container>
  );
};
