import type { Dataset } from './types';
import meta from './meta.json';
import people from './people.json';
import teams from './teams.json';
import projects from './projects.json';
import activity from './activity.json';
import stressMeta from './stress/meta.json';
import stressPeople from './stress/people.json';
import stressTeams from './stress/teams.json';
import stressProjects from './stress/projects.json';
import stressActivity from './stress/activity.json';

const normal = { meta, people, teams, projects, activity } as Dataset;
const stress = { meta: stressMeta, people: stressPeople, teams: stressTeams, projects: stressProjects, activity: stressActivity } as Dataset;

/** `?stress` swaps in messy data for layout testing. */
export const isStress = new URLSearchParams(window.location.search).has('stress');
export const dataset: Dataset = isStress ? stress : normal;
