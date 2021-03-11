import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { isURL } from 'validator';

import colors from '../lib/constants/colors';

import Container from './Container';
import Map from './Map';
import StyledLink from './StyledLink';
import { P } from './Text';

const LocationSection = styled.section`
  text-align: center;
`;

class Location extends React.Component {
  static propTypes = {
    location: PropTypes.object,
    showTitle: PropTypes.bool,
  };

  static defaultProps = {
    showTitle: true,
  };

  render() {
    const { name, address, lat, long, country } = this.props.location;

    if (name === 'Online') {
      if (address && isURL(address)) {
        return (
          <P textAlign="center">
            <StyledLink openInNewTabNoFollow href={address}>
              {address}
            </StyledLink>
          </P>
        );
      } else {
        return null;
      }
    } else if (!name && !address && !lat && !long && !country) {
      return null;
    }

    return (
      <LocationSection id="location">
        <Container margin="30px 10px">
          {this.props.showTitle && <h1>Location</h1>}
          <Container font-size="1.7rem" margin="5px 0px">
            {name}
          </Container>
          <div className="address" style={{ color: colors.darkgray }}>
            <StyledLink
              href={`https://www.openstreetmap.org/?mlat=${lat}&amp;mlon=${long}#map=16/${lat}/${long}`}
              openInNewTab
            >
              {address}
              {country ? `, ${country}` : ''}
            </StyledLink>
          </div>
        </Container>
        {lat && long && (
          <div className="map">
            <Map lat={lat} long={long} />
          </div>
        )}
      </LocationSection>
    );
  }
}

export default Location;
