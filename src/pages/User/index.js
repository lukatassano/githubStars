import React, {Component} from 'react';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Title,
  Author,
  Info,
} from './styles';
import {ActivityIndicator} from 'react-native';

export default class User extends Component {
  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  };

  async componentDidMount() {
    this.load();
  }

  load = async (page = 1) => {
    const {navigation, route} = this.props;
    const user = route.params.user;
    const {stars} = this.state;

    navigation.setOptions({title: user.name});

    const response = await api.get(`/users/${user.login}/starred`, {
      params: {page},
    });

    this.setState({
      stars: page >= 2 ? [...stars, ...response.data] : response.data,
      page,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = async () => {
    const {page} = this.state;

    const nextPage = page + 1;

    this.load(nextPage);
  };

  refreshList = () => {
    this.setState({refreshing: true, stars: []}, this.load);
  };

  handleWebView = repository => {
    const {navigation} = this.props;

    navigation.navigate('RepoBrowser', {repository});
  };

  render() {
    const {route} = this.props;
    const {loading, stars, refreshing} = this.state;
    const user = route.params.user;

    return (
      <Container>
        <Header>
          <Avatar source={{uri: user.avatar}} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>

        {loading ? (
          <ActivityIndicator size="large" color="#7159c1" />
        ) : (
          <Stars
            data={stars}
            keyExtractor={star => String(star.id)}
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            renderItem={({item}) => (
              <Starred onPress={() => this.handleWebView(item)}>
                <OwnerAvatar source={{uri: item.owner.avatar_url}} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
