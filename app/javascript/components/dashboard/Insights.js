import React from 'react';
import { ApolloProvider, ApolloLink, ApolloClient, HttpLink, InMemoryCache, useReactiveVar } from '@apollo/client';
import IsWorking from '../inisghts/IsWorking'
import CompaniesWorked from '../inisghts/CompaniesWorked'
import Panels4lg from './Panels4lg';

const httpLink = new HttpLink({ uri: '/graphql' });

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({
    headers: {
      'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content'),
    },
  });
  return forward(operation);
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache
})

export default function Insights(){
  return (
    <ApolloProvider client={client}>
      <div className="my-4 row">
        <div className="col-12 col-md-6">
          <Panels4lg 
          title={"Working"}
          size={6}
          stat={<IsWorking />}
          />
        </div>
        <div className="col-12 col-md-6">
          <Panels4lg
            title={"Companies"}
            size={6}
            stat={<CompaniesWorked />}
          />
        </div>
      </div>

      <div className="row">
        
        <div className="col-12 col-lg-8">
          recommend your student
          Student List
        </div>

        <div className="col-12 col-lg-4">
          Related companies?
          Talk to torre to fix this issue
        </div>
      </div>

    </ApolloProvider>
  )
}