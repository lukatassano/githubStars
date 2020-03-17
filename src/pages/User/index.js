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
    loading: false,
  };

  async componentDidMount() {
    this.setState({loading: true});
    const {navigation, route} = this.props;
    const user = route.params.user;
    console.tron.log(user);

    navigation.setOptions({title: user.name});

    const response = await api.get(`/users/${user.login}/starred`);

    this.setState({stars: response.data, loading: false});
  }

  render(props) {
    const {route} = this.props;
    const {loading, stars} = this.state;
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
            renderItem={({item}) => (
              <Starred>
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
