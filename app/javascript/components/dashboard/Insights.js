import React from 'react';
import { ApolloProvider, ApolloLink, ApolloClient, HttpLink, InMemoryCache, useReactiveVar } from '@apollo/client';
import IsWorking from '../inisghts/IsWorking'
import CompaniesWorked from '../inisghts/CompaniesWorked'
import StudentsList from '../inisghts/StudentsList'
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
          <StudentsList />
        </div>

        <div className="col-12 col-lg-4">
          <div className="card black" style={{height: "207px"}}>
            <div className="card-body">
              <div className="card-title">
                <h4 className="h4-responsive text-center lighter-font">More Information</h4>
              </div>
              <div className="text-center ligther-font mt-4">
                Get more insights abou your students or your competitors, contact us, and recommend more students to join <a href="https://torre.co">torre.co</a>
              </div>
            </div>
          </div>
        </div>
      </div>

    </ApolloProvider>
  )
}