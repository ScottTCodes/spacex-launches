/* eslint-disable prettier/prettier */
import LaunchCard from './index';
import launch from '../../cypress/fixtures/launch.json';

describe('LaunchCard', () => {
  it('should mount', () => {
    cy.mount(<LaunchCard launch={launch} />);
  });

  it('should display failure details on failure', () => {
    cy.mount(
      <LaunchCard
        launch={{
          ...launch,
          launch_failure_details: {
            time: 33,
            altitude: null,
            reason: 'merlin engine failure'
          }
        }}
      />
    );

    cy.get('[data-cy-id="launch-status"]').should('have.text', 'Failure');
    cy.get('[data-cy-id="failure-details"]').should('have.text', launch.launch_failure_details.reason);
  });
});
