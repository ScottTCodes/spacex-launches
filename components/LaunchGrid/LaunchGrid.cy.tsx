import LaunchGrid from './index';
import launches from '../../cypress/fixtures/launches.json';

describe('LaunchCard', () => {
  it('should mount with 2 launch cards', () => {
    cy.mount(<LaunchGrid launches={launches} />);

    launches.map(launch => {
      cy.get(`[data-cy-id="${launch.flight_number}"] h2`).should('have.text', launch.mission_name);
    });
  });
});
