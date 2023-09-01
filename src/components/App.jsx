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

  onSubmitQuery = async e => {
    e.preventDefault();
    if (e.target[0].value === this.state.query) return;

    this.setState({
      query: e.target[0].value,
      cards: [],
      error: false,
      totalHits: -1,
      page: 1,
    });

    try {
      this.setState({ loaderVisible: true });
      const resp = await getImages(e.target[0].value, 1);
      this.setState(prevState => ({
        cards: [...prevState.cards, ...resp.hits],
        totalHits: resp.totalHits,
        page: prevState.page + 1,
      }));
    } catch {
      this.setState({ error: true });
    } finally {
      this.setState({ loaderVisible: false });
    }
  };

  onLoadMore = async () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));

    try {
      const resp = await getImages(this.state.query, this.state.page);
      this.setState(prevState => ({
        cards: [...prevState.cards, ...resp.hits],
        totalHits: resp.totalHits,
      }));
    } catch {
      this.setState({ error: true });
    }
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
