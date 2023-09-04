import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { getImages } from 'utils/api-axios';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    query: '',
    page: 1,
    error: false,
    cards: [],
    totalHits: -1,
    loaderVisible: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    if (
      this.state.page !== prevState.page ||
      this.state.query !== prevState.query
    ) {
      const query = this.state.query.split('/')[1];

      try {
        this.setState({ loaderVisible: true });
        const resp = await getImages(query, this.state.page);
        this.setState(prevState => ({
          cards: [...prevState.cards, ...resp.hits],
          totalHits: resp.totalHits,
        }));
      } catch {
        this.setState({ error: true });
      } finally {
        this.setState({ loaderVisible: false });
      }
    }
  }

  onSubmitQuery = async e => {
    e.preventDefault();
    if (!e.target[0].value) return;

    const id = new Date();
    const query = `${id}/${e.target[0].value}`;

    this.setState({
      query,
      cards: [],
      error: false,
      totalHits: -1,
      page: 1,
    });
  };

  onLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <>
        <Searchbar onSubmitQuery={this.onSubmitQuery} />
        <Loader visible={this.state.loaderVisible} />
        {this.state.error || this.state.totalHits === 0 ? (
          <p>Error try again</p>
        ) : (
          <ImageGallery
            cards={this.state.cards}
            totalHits={this.state.totalHits}
            onLoadMore={this.onLoadMore}
          />
        )}
      </>
    );
  }
}
