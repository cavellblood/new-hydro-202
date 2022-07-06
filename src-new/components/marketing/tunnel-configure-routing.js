import {history} from 'instantsearch.js/es/lib/routers';

const router = history({
  windowTitle({query}) {
    const queryTitle = query
      ? `Results for "${query}"`
      : 'Configure your Caterpillar Tunnel';

    return queryTitle;
  },

  createURL({qsModule, routeState, location}) {
    const urlParts = location.href.match(/^(.*?)\/search/);
    const baseUrl = `${urlParts ? urlParts[1] : ''}/`;

    const queryParameters = {};

    if (routeState.width) {
      queryParameters.width = routeState.width;
    }
    if (routeState.style) {
      queryParameters.style = routeState.style;
    }
    if (routeState.length) {
      queryParameters.length = routeState.length;
    }
    if (routeState.bowSpacing) {
      queryParameters.bowSpacing = routeState.bowSpacing;
    }

    const queryString = qsModule.stringify(queryParameters, {
      addQueryPrefix: true,
      arrayFormat: 'comma',
      charset: 'utf-8',
      encodeValuesOnly: true,
    });

    return `${baseUrl}caterpillar-tunnel/configure/${queryString}`;
  },

  parseURL({qsModule, location}) {
    const {width, style, length, bowSpacing} = qsModule.parse(
      location.search.slice(1),
      {
        comma: true,
        charset: 'utf-8',
      },
    );
    // `qs` does not return an array when there's a single value.
    // const allVendors = Array.isArray(vendors) ? vendors : [vendors].filter(Boolean);

    return {
      width,
      style,
      length,
      bowSpacing,
    };
  },
});

const indexName = 'shopify_products';

const stateMapping = {
  stateToRoute(uiState) {
    const indexUiState = uiState[indexName];
    return {
      width: indexUiState.menu && indexUiState.menu['named_tags.width'],
      style: indexUiState.menu && indexUiState.menu['named_tags.style'],
      length: indexUiState.menu && indexUiState.menu['named_tags.length'],
      bowSpacing:
        indexUiState.menu && indexUiState.menu['named_tags.bow-spacing'],
    };
  },

  routeToState(routeState) {
    return {
      [indexName]: {
        menu: {
          'named_tags.width': routeState.width,
          'named_tags.style': routeState.style,
          'named_tags.length': routeState.length,
          'named_tags.bow-spacing': routeState.bowSpacing,
        },
      },
    };
  },
};

const searchRouting = {
  router,
  stateMapping,
};

export default searchRouting;
