import * as React from 'react';
import * as objectKeyFilter from 'object-key-filter';

const reactApollo = require('react-apollo');

export const originalGraphql = reactApollo.graphql;

export const graphqlWithoutTypename = (...args: any[]) => (Component: any) => {
  const SubstituteComponent = ({ data, ...props }: { data: any }) => {
    const dataWithoutTypename = objectKeyFilter(data, ['__typename'], true);

    return <Component {...props} data={dataWithoutTypename} />;
  };

  return originalGraphql(...args)(SubstituteComponent);
};

reactApollo.graphql = graphqlWithoutTypename;
