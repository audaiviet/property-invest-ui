import React from 'react';
import { Story, Meta } from '@storybook/react';

import {ProjectCard} from './ProjectCard';
import { IProject } from 'interfaces/IProject';

export default {
  title: 'PropertyInvest/ProjectCard',
  component: ProjectCard,
} as Meta;

const Template: Story<IProject> = (project: IProject) => <ProjectCard project={project} />;

const project: IProject = {
  id: "60856fcc2765570ee4ad7a16",
  name: "Kuphal and Sons",
  startDate: "2020-09-07T02:35:44Z",
  endDate: "2026-06-19T07:42:04Z",
  estimatedDurationInDays: 12,
  estimatedCost: 979224,
  annualInterestRateOffered: 6.26,
  projectManager: "Mirna Francis",
  description: 'Project to build high quality seven bed property finished to a high standard in the popular location of Hall Green, three bathrooms, three receptions, striking kitchen and off road parking.',
  images: [],
  amountRequired: 1000000,
  amountReceived: 500000,
  investmentUnit: 1,
  isActive: false,
  isDeleted: false,
  isCompleted: false
}

export const Standard = Template.bind({});
Standard.args = project;
