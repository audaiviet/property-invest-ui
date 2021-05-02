import React from 'react';
import { Story, Meta } from '@storybook/react';

import { IProject } from 'interfaces/IProject';
import { ProjectContainer } from './ProjectContainer';

export default {
  title: 'PropertyInvest/ProjectContainer',
  component: ProjectContainer,
} as Meta;

const Template: Story<{projects: IProject[]}> = (args: {projects: IProject[]}) => 
    <ProjectContainer projects={args.projects}></ProjectContainer>;

const project: IProject = {
  id: "60856fcc2765570ee4ad7a16",
  name: "Kuphal and Sons",
  startDate: "2020-09-07T02:35:44Z",
  endDate: "2026-06-19T07:42:04Z",
  estimatedDurationInDays: 12,
  estimatedCost: 979224,
  annualInterestRateOffered: 6.26,
  projectManager: "Mirna Francis",
  description: 'Project to build high quality seven bed property finished to a high standard in the popular location of Hall Green, three bathrooms, three receptions, striking kitchen and off road parking.'
}
 const projects = [1,2,3,4,5,6,7,8].map(() => project);

export const Standard = Template.bind({});
Standard.args = {projects};


