/*import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state ={
      component: null
    }

    componentDidMount () {
      importComponent()
        .then (cmp => {
          this.setState({ component : cmp.default });
        });
    }

    render () {
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }

     LazyLoading concept 
      uses of Lazy Loading:

      const AsyncNewComponent = asynchComponent(() => {
        return import('../pathofcomponent');
      })

      *go to routing and  and change the component with AsynchComponent.

      <Route  path="/" component={AsynchNewComponent} />

      ** With the new version we use like below***
      **Note: Work only with Client side rendering..

      // import.

      import React, {Component, Suspense} from 'react';

      const Posts = React.lazy(() => import('..path of js file));

      // Use in route.

      <Route path="/posts" render={() => <Suspense fallback={<div>Loading...</div>}><Posts /></Suspense>} />

      // use outSide of Route.

      render () {
        <React.Fragment>
          <Suspense fallback={<div>Loading...</div>}>
            <Posts />
          </Suspense>} />
        </React.Fragment>
      }
    
  }  
}

export default asyncComponent;*/