import React from 'react';

import {Browser} from './styles';

export default function RepoBrowser({route, navigation}) {
  const {html_url, full_name} = route.params.repository;
  navigation.setOptions({title: full_name});

  return <Browser source={{uri: html_url}} />;
}
